import { Module } from '@nestjs/common';
import { GenerateAdminCommand } from './admin/generate.command';

@Module({
  providers: [GenerateAdminCommand],
})
export class SeederModule {}
