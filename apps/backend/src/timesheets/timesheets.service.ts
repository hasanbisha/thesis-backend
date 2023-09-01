import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { Repository } from 'typeorm';
import { Clock } from '../clock/entities/clock.entity';
import * as moment from "moment";
import { User } from '../user/entities/user.entity';

@Injectable()
export class TimesheetsService {
  constructor(
    @InjectRepository(Timesheet)
    private repository: Repository<Timesheet>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Clock)
    private clockRepository: Repository<Clock>,
  ) {}

  async createFromClocks(startClock: Clock, endClock: Clock) {
    const { date, user, job, location, project, paymentGroup } = startClock;

    const dailyTimesheets = await this.repository
      .createQueryBuilder("timesheet")
      .andWhere("date = :date", { date })
      .andWhere("userId = :user", { user: user.id })
      .getMany();
    const dailyDuration = dailyTimesheets.reduce((total, timesheet) => {
      if (timesheet.type !== "regular") {
        return total;
      }
      return total + timesheet.duration;
    }, 0);

    const timesheet = new Timesheet();
    startClock.timesheets = [timesheet];
    endClock.timesheets = [timesheet];
    Object.assign(timesheet, { date, user, job, location, project, paymentGroup });
    timesheet.clocks = [startClock, endClock];
    timesheet.start = startClock.timestamp;
    timesheet.end = endClock.timestamp;
    timesheet.type = "regular";
    timesheet.calculateDuration();

    // BREAK
    if (
      startClock.type === "start-break"
      && endClock.type === "end-break"
    ) {
      timesheet.type = "break";
    }

    const overtimeThreshold = moment.duration(paymentGroup.overtimeThreshold, "hour").asSeconds();
    // ONLY OVERTIME
    if (dailyDuration >= overtimeThreshold) {
      timesheet.type = "overtime";
    }

    // SPLIT REGULAR AND OVERTIME
    const totalDuration = dailyDuration + timesheet.duration;
    const overtimeDuration = totalDuration - overtimeThreshold;
    if (overtimeDuration > 0) {
      timesheet.end = timesheet.start + (overtimeThreshold - dailyDuration);
    }

    timesheet.calculateDuration();
    timesheet.calculateTotal();
    await this.repository.save(timesheet);

    if (overtimeDuration > 0) {
      const overtimeTimesheet = new Timesheet();
      Object.assign(overtimeTimesheet, timesheet, { id: undefined });
      overtimeTimesheet.start = timesheet.end;
      overtimeTimesheet.end = endClock.timestamp;
      overtimeTimesheet.type = "overtime";
      overtimeTimesheet.calculateDuration();
      overtimeTimesheet.calculateTotal();
      await this.repository.save(overtimeTimesheet);
      startClock.timesheets.push(overtimeTimesheet);
      endClock.timesheets.push(overtimeTimesheet);
    }

    await this.clockRepository.save(startClock);
    await this.clockRepository.save(endClock);
  }

  getOverallConfig() {
    const types = ["regular", "break", "overtime"];
    return types.reduce((total, type) => ({
      ...total,
      [type]: {
        type,
        total: 0,
        duration: 0,
      },
    }), {});
  }

  calculateOverall(data: { type: Timesheet["type"], total: number, duration: number }[]) {
    return data.reduce((total, item) => {
      total[item.type] = item;
      return total;
    }, this.getOverallConfig());
  }

  async getMyOverall(user: User, from: number, to: number) {
    const data = await this.repository
      .createQueryBuilder()
      .select("type, sum(total) as total, sum(duration) as duration")
      .andWhere("userId = :user", { user: user.id })
      .andWhere("start >= :start", { start: from })
      .andWhere("start <= :end", { end: to })
      .groupBy("type")
      .getRawMany();
    return this.calculateOverall(data);
  }

  async getTeamOverall(user: User, from: number, to: number) {
    const usersQuery = this.userRepository
      .createQueryBuilder()
      .select("id")
      .andWhere("id != :id", { id: user.id })
      .andWhere("role <= :role", { role: user.role });

    const data = await this.repository
      .createQueryBuilder()
      .select("type, sum(total) as total, sum(duration) as duration")
      .andWhere(`userId in (${usersQuery.getQuery()})`)
      .setParameters(usersQuery.getParameters())
      .andWhere("start >= :start", { start: from })
      .andWhere("start <= :end", { end: to })
      .groupBy("type")
      .getRawMany();

    return this.calculateOverall(data);
  }

  async findAll(user: User, from: number, to: number) {
    const timesheets = await this.repository
      .createQueryBuilder("timesheet")
      .andWhere("timesheet.userId = :user", { user: user.id })
      .andWhere("timesheet.start >= :start", { start: from })
      .andWhere("timesheet.start <= :end", { end: to })
      .leftJoinAndSelect("timesheet.job", "job")
      .leftJoinAndSelect("timesheet.location", "location")
      .leftJoinAndSelect("timesheet.project", "project")
      .getMany();
    return timesheets.reduce((total, timesheet) => {
      if (!(timesheet.date in total)) {
        total[timesheet.date] = [];
      }
      total[timesheet.date].push(timesheet);
      return total;
    }, {});
  }

  async getTeam(user: User, from: number, to: number) {
    const [users, totalItems] = await this.userRepository
      .createQueryBuilder("user")
      .andWhere("user.id != :user", { user: user.id })
      .andWhere("user.role <= :role", { role: user.role })
      .leftJoinAndSelect("user.jobs", "job")
      .leftJoinAndSelect("user.locations", "location")
      .leftJoinAndSelect("user.projects", "project")
      .leftJoinAndSelect("user.paymentGroup", "paymentGroup")
      .getManyAndCount();

    const stats = await this.repository
      .createQueryBuilder()
      .select("userId as user, type, sum(total) as total, sum(duration) as duration")
      .andWhere("start >= :start", { start: from })
      .andWhere("start <= :end", { end: to })
      .andWhere(`userId in (${users.map(({ id }) => id).join(", ")})`)
      .groupBy("userId")
      .addGroupBy("type")
      .getRawMany();

    const map = stats.reduce((total, stat) => {
      if (!(stat.user in total)) {
        total[stat.user] = {
          regular: {
            total: 0,
            duration: 0,
          },
          break: {
            total: 0,
            duration: 0,
          },
          overtime: {
            total: 0,
            duration: 0,
          },
        }
      }
      total[stat.user][stat.type].total = stat.total;
      total[stat.user][stat.type].duration = stat.duration;
      return total;
    }, {});

    const usersWithStats = users.map((user) => {
      let total = 0;
      let duration = 0;
      for (const item of Object.values(map[user.id])) {
        total += (item as any).total;
        duration += (item as any).duration;
      }
      return {
        ...user,
        overview: {
          ...map[user.id],
          total,
          duration,
        },
      };
    });

    return [usersWithStats, totalItems];
  }
}
