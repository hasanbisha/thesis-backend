import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClockDto } from './dto/create-clock.dto';
import { User } from '../user/entities/user.entity';
import { Clock } from './entities/clock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Job } from '../jobs/entities/job.entity';
import { Project } from '../projects/entities/project.entity';
import { Location } from '../locations/entities/location.entity';
import { TimesheetsService } from '../timesheets/timesheets.service';
import { getFormattedDate } from '../utils/date';
import { PaymentGroup } from '../payment-groups/entities/payment-group.entity';

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(Clock)
    private repository: Repository<Clock>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(PaymentGroup)
    private paymentGroupRepository: Repository<PaymentGroup>,

    private timesheetsService: TimesheetsService,
  ) {}

  private async getLastClock(user: User) {
    return this.repository
      .createQueryBuilder("clock")
      .leftJoinAndSelect("clock.user", "user")
      .leftJoinAndSelect("clock.job", "job")
      .leftJoinAndSelect("clock.location", "location")
      .leftJoinAndSelect("clock.project", "project")
      .leftJoinAndSelect("clock.paymentGroup", "paymentGroup")
      .where("userId = :user", { user: user.id })
      .orderBy("timestamp", "DESC")
      .getOne();
  }

  async create(data: CreateClockDto, user: User) {
    const lastClock = await this.getLastClock(user);
    let time = moment().unix();
    if (lastClock?.timestamp > time) {
      time = lastClock?.timestamp + 1;
    }

    if (data.type !== "start-shift" && !lastClock) {
      throw new BadRequestException("There is no existing shift. Please start a shift!");
    }

    if (data.type === "start-shift") {
      if (lastClock && lastClock.type !== "end-shift") {
        throw new BadRequestException("A shift has already started!");
      }
    }

    if (
      data.type === "start-break"
      && (
        lastClock.type !== "start-shift"
        && lastClock.type !== "end-break"
      )
    ) {
      throw new BadRequestException("Could not start break!");
    }

    if (data.type === "end-shift" && lastClock.type === "start-break") {
      throw new BadRequestException("Please end the break before ending the shift!");
    }

    if (data.type === "end-shift" && lastClock.type === "end-shift") {
      throw new BadRequestException("No shift could be ended!");
    }

    if (data.type === "end-break" && lastClock.type !== "start-break") {
      throw new BadRequestException("There is no break to end!");
    }

    if (!user.paymentGroup) {
      throw new BadRequestException("The user should have a payment group to use the clock in feature!");
    }

    let job: Job;
    let location: Location;
    let project: Project;
    let paymentGroup: PaymentGroup;
    if (data.type === "start-shift") {
      // TODO: validate if user has resource
      job = await this.jobRepository.findOneBy({ id: data.job });
      if (!job) {
        throw new NotFoundException("Job not found");
      }

      location = await this.locationRepository.findOneBy({ id: data.location });
      if (!location) {
        throw new NotFoundException("Location not found");
      }

      project = await this.projectRepository.findOneBy({ id: data.project });
      if (!project) {
        throw new NotFoundException("Project not found");
      }

      paymentGroup = await this.paymentGroupRepository.findOneBy({ id: user.paymentGroup.id });
      if (!paymentGroup) {
        throw new NotFoundException("Payment group not found");
      }
    } else {
      job = lastClock.job
      location = lastClock.location
      project = lastClock.project
      paymentGroup = lastClock.paymentGroup
    }

    let clock = new Clock();
    clock.type = data.type;
    clock.timestamp = time;
    clock.date = getFormattedDate(moment.unix(time));
    clock.user = user;
    clock.job = job;
    clock.location = location;
    clock.project = project;
    clock.paymentGroup = paymentGroup;

    clock = await this.repository.save(clock);

    if (clock.type !== "start-shift") {
      this.timesheetsService.createFromClocks(lastClock, clock);
    }
  }

  async getCurrentShift(user: User) {
    const date = getFormattedDate(moment());

    return this.repository
      .createQueryBuilder("clock")
      .where("date = :date", { date })
      .where("userId = :user", { user: user.id })
      .orderBy("timestamp", "ASC")
      .getMany();
  }
}
