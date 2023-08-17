import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './entities/timesheet.entity';
import { Repository } from 'typeorm';
import { Clock } from '../clock/entities/clock.entity';
import * as moment from "moment";

const MAX_UNTILL_OVERTIME = moment.duration(8, "hour").asSeconds();

@Injectable()
export class TimesheetsService {
  constructor(
    @InjectRepository(Timesheet)
    private repository: Repository<Timesheet>,

    @InjectRepository(Clock)
    private clockRepository: Repository<Clock>,
  ) {}

  async createFromClocks(startClock: Clock, endClock: Clock) {
    const { date, user, job, location, project } = startClock;

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
    Object.assign(timesheet, { date, user, job, location, project });
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

    // ONLY OVERTIME
    if (dailyDuration >= MAX_UNTILL_OVERTIME) {
      timesheet.type = "overtime";
    }

    // SPLIT REGULAR AND OVERTIME
    const totalDuration = dailyDuration + timesheet.duration;
    const overtimeDuration = totalDuration - MAX_UNTILL_OVERTIME;
    if (overtimeDuration > 0) {
      timesheet.end = timesheet.start + (MAX_UNTILL_OVERTIME - dailyDuration);
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

  findAll() {
    return this.repository;
  }
}
