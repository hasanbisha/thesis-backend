import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { CrudDto } from 'src/utils/crud/query';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private repository: Repository<Job>
  ) {}
  async create(data: CreateJobDto) {
    const job = new Job();
    Object.assign(job, data);
    return this.repository.save(job);
  }

  findAll({ page, pageSize, filters, sortBy, orderBy }: CrudDto) {
    const query = this.repository
      .createQueryBuilder()
      .take(pageSize)
      .skip(page * pageSize);
    if (sortBy) {
      query.orderBy(sortBy, orderBy || "DESC");
    }
    if (filters) {
      for (const key of Object.keys(filters)) {
        query.where(`lower(${key}) LIKE lower('%${filters[key]}%')`);
      }
    }
    return query.getManyAndCount();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, data: UpdateJobDto) {
    const job = await this.repository.findOneBy({ id });
    if (!job) {
      throw new NotFoundException();
    }
    return this.repository.update({ id }, data);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
