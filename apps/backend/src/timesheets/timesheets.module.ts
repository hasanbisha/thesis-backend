import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsController } from './timesheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clock } from '../clock/entities/clock.entity';
import { Timesheet } from './entities/timesheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timesheet, Clock])],
  controllers: [TimesheetsController],
  providers: [TimesheetsService],
  exports: [TimesheetsService],
})
export class TimesheetsModule {}
