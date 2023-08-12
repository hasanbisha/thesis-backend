import { Module } from '@nestjs/common';
import { PaymentGroupsService } from './payment-groups.service';
import { PaymentGroupsController } from './payment-groups.controller';

@Module({
  controllers: [PaymentGroupsController],
  providers: [PaymentGroupsService]
})
export class PaymentGroupsModule {}
