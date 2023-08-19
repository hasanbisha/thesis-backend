import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentGroupDto } from './dto/create-payment-group.dto';
import { UpdatePaymentGroupDto } from './dto/update-payment-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentGroup } from './entities/payment-group.entity';
import { Repository } from 'typeorm';
import { CrudDto } from '../utils/crud/query';

@Injectable()
export class PaymentGroupsService {
  constructor(
    @InjectRepository(PaymentGroup)
    private repository: Repository<PaymentGroup>
  ) {}
  async create(data: CreatePaymentGroupDto) {
    const paymentGroup = new PaymentGroup();
    Object.assign(paymentGroup, data);
    return this.repository.save(paymentGroup);
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

  async update(id: number, data: UpdatePaymentGroupDto) {
    const paymentGroup = await this.repository.findOneBy({ id });
    if (!paymentGroup) {
      throw new NotFoundException();
    }
    return this.repository.update({ id }, data);
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}
