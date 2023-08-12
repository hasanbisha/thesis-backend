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
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './user/roles/roles.guard';
import { AuthGuard } from './auth/auth.guard';

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
    AuthModule,
    // ProjectsModule,
    // TimesheetsModule,
    // WorkingGroupsModule,
    // WorkTypesModule,
    // PaymentGroupsModule,
    // WorkRulesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
