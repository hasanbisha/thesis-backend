import { Module } from '@nestjs/common';

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';

import { UserModule } from './user/user.module';
import { ClockModule } from './clock/clock.module';
import { JobsModule } from './jobs/jobs.module';
import { LocationsModule } from './locations/locations.module';
import { ProjectsModule } from './projects/projects.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { PaymentGroupsModule } from './payment-groups/payment-groups.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/roles/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';
import { Clock } from './clock/entities/clock.entity';
import { Job } from './jobs/entities/job.entity';
import { Location } from './locations/entities/location.entity';
import { Project } from './projects/entities/project.entity';
import { Timesheet } from './timesheets/entities/timesheet.entity';
import { WorkType } from './work-types/entities/work-type.entity';
import { WorkingGroup } from './working-groups/entities/working-group.entity';
import { PaymentGroup } from './payment-groups/entities/payment-group.entity';

import { WorkingGroupsModule } from './working-groups/working-groups.module';
import { WorkTypesModule } from './work-types/work-types.module';
import { WorkRulesModule } from './work-rules/work-rules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
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
    UserModule,
    ClockModule,
    JobsModule,
    LocationsModule,
    AuthModule,
    ProjectsModule,
    TimesheetsModule,
    PaymentGroupsModule,

    // WorkingGroupsModule,
    // WorkTypesModule,
    // WorkRulesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
