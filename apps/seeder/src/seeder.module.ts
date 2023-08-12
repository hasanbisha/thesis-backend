import { Module } from '@nestjs/common';
import { GenerateAdminCommand } from './admin/generate.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'apps/backend/src/user/entities/user.entity';
import { Clock } from 'apps/backend/src/clock/entities/clock.entity';
import { Job } from 'apps/backend/src/jobs/entities/job.entity';
import { Project } from 'apps/backend/src/projects/entities/project.entity';
import { Timesheet } from 'apps/backend/src/timesheets/entities/timesheet.entity';
import { WorkType } from 'apps/backend/src/work-types/entities/work-type.entity';
import { WorkingGroup } from 'apps/backend/src/working-groups/entities/working-group.entity';
import { PaymentGroup } from 'apps/backend/src/payment-groups/entities/payment-group.entity';
import { Location } from 'apps/backend/src/locations/entities/location.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      logging: false,
      autoLoadEntities: true,
      entities: [
        User,
        Clock,
        Job,
        Location,
        Project,
        Timesheet,
        WorkType,
        WorkingGroup,
        PaymentGroup,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [GenerateAdminCommand],
})
export class SeederModule {}
