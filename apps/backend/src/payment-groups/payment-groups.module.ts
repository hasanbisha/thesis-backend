import { Module } from '@nestjs/common';
import { PaymentGroupsService } from './payment-groups.service';
import { PaymentGroupsController } from './payment-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentGroup } from './entities/payment-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentGroup])],
  controllers: [PaymentGroupsController],
  providers: [PaymentGroupsService]
})
export class PaymentGroupsModule {}
