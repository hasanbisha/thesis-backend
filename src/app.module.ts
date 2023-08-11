import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'config/configuration';

import { UserModule } from './user/user.module';
import { ClockModule } from './clock/clock.module';
import { JobsModule } from './jobs/jobs.module';
import { LocationsModule } from './locations/locations.module';
import { ProjectsModule } from './projects/projects.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { WorkingGroupsModule } from './working-groups/working-groups.module';
import { WorkTypesModule } from './work-types/work-types.module';
import { PaymentGroupsModule } from './payment-groups/payment-groups.module';
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
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    UserModule,
    ClockModule,
    JobsModule,
    LocationsModule,
    // ProjectsModule,
    // TimesheetsModule,
    // WorkingGroupsModule,
    // WorkTypesModule,
    // PaymentGroupsModule,
    // WorkRulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
