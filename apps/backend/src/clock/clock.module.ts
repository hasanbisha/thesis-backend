import { Module } from '@nestjs/common';
import { ClockService } from './clock.service';
import { ClockController } from './clock.controller';
import { Clock } from './entities/clock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../locations/entities/location.entity';
import { Job } from '../jobs/entities/job.entity';
import { Project } from '../projects/entities/project.entity';
import { TimesheetsModule } from '../timesheets/timesheets.module';
import { PaymentGroup } from '../payment-groups/entities/payment-group.entity';

@Module({
  imports: [TimesheetsModule, TypeOrmModule.forFeature([Clock, Job, Location, Project, PaymentGroup])],
  controllers: [ClockController],
  providers: [ClockService]
})
export class ClockModule {}
