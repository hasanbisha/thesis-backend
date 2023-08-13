import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { CrudDto } from '../utils/crud/query';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private repository: Repository<Location>
  ) {}
  async create(data: CreateLocationDto) {
    const location = new Location();
    Object.assign(location, data);
    return this.repository.save(location);
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

  async update(id: number, data: UpdateLocationDto) {
    const location = await this.repository.findOneBy({ id });
    if (!location) {
      throw new NotFoundException();
    }
    return this.repository.update({ id }, data);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
