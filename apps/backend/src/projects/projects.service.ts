import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { CrudDto } from '../utils/crud/query';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>
  ) {}
  async create(data: CreateProjectDto) {
    const project = new Project();
    Object.assign(project, data);
    return this.repository.save(project);
  }

  findAll({ page, pageSize, filters, sortBy, orderBy }: CrudDto) {
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
        query.andWhere(`lower(${key}) LIKE lower('%${filters[key]}%')`);
      }
    }
    return query.getManyAndCount();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, data: UpdateProjectDto) {
    const project = await this.repository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException();
    }
    return this.repository.update({ id }, data);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
