import { Module } from '@nestjs/common';
import { WorkingGroupsService } from './working-groups.service';
import { WorkingGroupsController } from './working-groups.controller';

@Module({
  controllers: [WorkingGroupsController],
  providers: [WorkingGroupsService]
})
export class WorkingGroupsModule {}
