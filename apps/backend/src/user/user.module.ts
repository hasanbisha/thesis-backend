import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Job } from '../jobs/entities/job.entity';
import { Location } from '../locations/entities/location.entity';
import { Project } from '../projects/entities/project.entity';
import { PaymentGroup } from '../payment-groups/entities/payment-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Job, Location, Project, PaymentGroup])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
