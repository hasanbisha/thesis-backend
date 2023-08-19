import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { PaymentGroupsService } from './payment-groups.service';
import { CreatePaymentGroupDto } from './dto/create-payment-group.dto';
import { UpdatePaymentGroupDto } from './dto/update-payment-group.dto';
import { CrudDto } from '../utils/crud/query';

@Controller('payment-groups')
export class PaymentGroupsController {
  constructor(private readonly paymentGroupsService: PaymentGroupsService) {}

  @Post()
  create(@Body() body: CreatePaymentGroupDto) {
    return this.paymentGroupsService.create(body);
  }

  @Get()
  findAll(@Query() query: CrudDto) {
    return this.paymentGroupsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGroupsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePaymentGroupDto,
  ) {
    return this.paymentGroupsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentGroupsService.remove(id);
  }
}
