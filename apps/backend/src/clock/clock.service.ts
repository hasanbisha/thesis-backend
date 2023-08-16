import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClockDto } from './dto/create-clock.dto';
import { User } from '../user/entities/user.entity';
import { Clock } from './entities/clock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment, { MomentInput } from 'moment';
import { Job } from '../jobs/entities/job.entity';
import { Project } from '../projects/entities/project.entity';
import { Location } from '../locations/entities/location.entity';

export const getFormattedDate = (input: MomentInput) => {
  return moment(input).format("YYYY-MM-DD");
}

@Injectable()
export class ClockService {
  constructor(
    @InjectRepository(Clock)
    private repository: Repository<Clock>,

    @InjectRepository(Clock)
    private jobRepository: Repository<Job>,

    @InjectRepository(Clock)
    private locationRepository: Repository<Location>,

    @InjectRepository(Clock)
    private projectRepository: Repository<Project>,
  ) {}

  private async getLastClock() {
    return this.repository
      .createQueryBuilder()
      .getOne();
  }

  async create(data: CreateClockDto, user: User) {
    const time = moment().unix();
    const lastClock = await this.getLastClock();

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

    if (data.type === "end-break" && lastClock.type !== "start-break") {
      throw new BadRequestException("There is no break to end!");
    }

    let job: Job;
    let location: Location;
    let project: Project;
    if (data.type !== "start-shift") {
      // TODO: validate if user has resource
      job = await this.jobRepository.findOneBy({ id: data.job });
      if (!job) {
        throw new NotFoundException("Job not found");
      }

      location = await this.locationRepository.findOneBy({ id: data.location });
      if (!job) {
        throw new NotFoundException("Location not found");
      }

      project = await this.projectRepository.findOneBy({ id: data.project });
      if (!job) {
        throw new NotFoundException("Project not found");
      }
    } else {
      job = lastClock.job
      location = lastClock.location
      project = lastClock.project
    }

    const clock = new Clock();
    clock.type = data.type;
    clock.timestamp = time;
    clock.date = getFormattedDate(time);
    clock.user = user;
    clock.job = job;
    clock.location = location;
    clock.project = project;

    return this.repository.save(clock);
  }

  async getCurrentShift() {
    const lastClock = await this.getLastClock();
    return lastClock;
  }
}
