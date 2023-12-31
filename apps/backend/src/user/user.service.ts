import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CrudDto } from '../utils/crud/query';
import * as bcrypt from "bcrypt";
import { Job } from '../jobs/entities/job.entity';
import { Location } from '../locations/entities/location.entity';
import { Project } from '../projects/entities/project.entity';
import { PaymentGroup } from '../payment-groups/entities/payment-group.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(PaymentGroup)
    private paymentGroupRepository: Repository<PaymentGroup>,
  ) {}

  async create(currentUser: User, data: CreateUserDto) {
    if (currentUser.role <= data.role) {
      throw new BadRequestException("You do not have permission to update this user");
    }

    const user = new User();
    Object.assign(user, {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      role: data.role,
    });
    user.password = await bcrypt.hash(data.password, 1);

    user.jobs = await this.jobRepository
      .createQueryBuilder()
      .whereInIds(data.jobs)
      .getMany();

    user.locations = await this.locationRepository
      .createQueryBuilder()
      .whereInIds(data.locations)
      .getMany();

    user.projects = await this.projectRepository
      .createQueryBuilder()
      .whereInIds(data.projects)
      .getMany();

    user.paymentGroup = await this.paymentGroupRepository.findOneBy({ id: data.paymentGroup });

    return this.repository.save(user);
  }

  findAll(currentUser: User, { page, pageSize, filters, sortBy, orderBy }: CrudDto) {
    const query = this.repository.createQueryBuilder("user");
    if (page && pageSize) {
      query.take(pageSize).skip(page * pageSize);
    }
    if (sortBy) {
      query.orderBy(sortBy, orderBy || "DESC");
    }
    if (filters?.jobs) {
      query.innerJoinAndSelect("user.jobs", "job", "job.id = :job", {
        job: filters.jobs,
      });
      delete filters.jobs;
    } else {
      query.leftJoinAndSelect("user.jobs", "job");
    }
    if (filters?.locations) {
      query.innerJoinAndSelect("user.locations", "location", "location.id = :location", {
        location: filters.locations,
      });
      delete filters.locations;
    } else {
      query.leftJoinAndSelect("user.locations", "location");
    }
    if (filters?.projects) {
      query.innerJoinAndSelect("user.projects", "project", "project.id = :project", {
        project: filters.projects,
      });
      delete filters.projects;
    } else {
      query.leftJoinAndSelect("user.projects", "project");
    }
    if (filters?.paymentGroup) {
      query.innerJoinAndSelect("user.paymentGroup", "paymentGroup", "paymentGroup.id = :paymentGroup", {
        paymentGroup: filters.paymentGroup,
      });
      delete filters.paymentGroup;
    } else {
      query.leftJoinAndSelect("user.paymentGroup", "paymentGroup");
    }
    if (filters) {
      for (const key of Object.keys(filters)) {
        query.andWhere(`lower(${key}) LIKE lower('%${filters[key]}%')`);
      }
    }
    query.andWhere("user.id != :id", { id: currentUser.id });
    query.andWhere("user.role <= :role", { role: currentUser.role });
    return query.getManyAndCount();
  }

  findOne(id: number) {
    return this.findOneBy({ id });
  }

  findOneBy(options: FindOptionsWhere<User>) {
    return this.repository.findOne({
      where: options,
      relations: {
        jobs: true,
        locations: true,
        projects: true,
        paymentGroup: true,
      },
    });
  }

  async update(id: number, currentUser: User, data: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    if (currentUser.role <= data.role) {
      throw new BadRequestException("You do not have permission to update this user");
    }

    Object.assign(user, {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      role: data.role,
    });

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 1);
    }

    user.jobs = await this.jobRepository
      .createQueryBuilder()
      .whereInIds(data.jobs)
      .getMany();

    user.locations = await this.locationRepository
      .createQueryBuilder()
      .whereInIds(data.locations)
      .getMany();

    user.projects = await this.projectRepository
      .createQueryBuilder()
      .whereInIds(data.projects)
      .getMany();

    user.paymentGroup = await this.paymentGroupRepository.findOneBy({ id: data.paymentGroup });

    return this.repository.save(user);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
