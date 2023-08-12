import { Module } from '@nestjs/common';
import { WorkRulesService } from './work-rules.service';
import { WorkRulesController } from './work-rules.controller';

@Module({
  controllers: [WorkRulesController],
  providers: [WorkRulesService]
})
export class WorkRulesModule {}
