import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CrudDto } from '../utils/crud/query';
import * as bcrypt from "bcrypt";
import { Job } from '../jobs/entities/job.entity';
import { Location } from '../locations/entities/location.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,

    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(currentUser: User, data: CreateUserDto) {
    if (currentUser.role <= data.role) {
      throw new BadRequestException("some stuff");
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

    return this.repository.save(user);
  }

  findAll(currentUser: User, { page, pageSize, filters, sortBy, orderBy }: CrudDto) {
    const query = this.repository
      .createQueryBuilder()
    if (page && pageSize) {
      query.take(pageSize).skip(page * pageSize);
    }
    if (sortBy) {
      query.orderBy(sortBy, orderBy || "DESC");
    }
    if (filters) {
      for (const key of Object.keys(filters)) {
        query.where(`lower(${key}) LIKE lower('%${filters[key]}%')`);
      }
    }
    query.where("user.id != :id", { id: currentUser.id });
    return query.getManyAndCount();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  findOneBy(options: FindOptionsWhere<User>) {
    return this.repository.findOneBy(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
