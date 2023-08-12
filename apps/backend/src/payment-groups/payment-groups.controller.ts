import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentGroupsService } from './payment-groups.service';
import { CreatePaymentGroupDto } from './dto/create-payment-group.dto';
import { UpdatePaymentGroupDto } from './dto/update-payment-group.dto';

@Controller('payment-groups')
export class PaymentGroupsController {
  constructor(private readonly paymentGroupsService: PaymentGroupsService) {}

  @Post()
  create(@Body() createPaymentGroupDto: CreatePaymentGroupDto) {
    return this.paymentGroupsService.create(createPaymentGroupDto);
  }

  @Get()
  findAll() {
    return this.paymentGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentGroupDto: UpdatePaymentGroupDto) {
    return this.paymentGroupsService.update(+id, updatePaymentGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentGroupsService.remove(+id);
  }
}
