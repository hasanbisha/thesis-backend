import { Injectable } from '@nestjs/common';
import { CreatePaymentGroupDto } from './dto/create-payment-group.dto';
import { UpdatePaymentGroupDto } from './dto/update-payment-group.dto';

@Injectable()
export class PaymentGroupsService {
  create(createPaymentGroupDto: CreatePaymentGroupDto) {
    return 'This action adds a new paymentGroup';
  }

  findAll() {
    return `This action returns all paymentGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentGroup`;
  }

  update(id: number, updatePaymentGroupDto: UpdatePaymentGroupDto) {
    return `This action updates a #${id} paymentGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentGroup`;
  }
}
