import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../backend/src/user/entities/user.entity';
import { Command, CommandRunner } from 'nest-commander';
import { Repository } from 'typeorm';

@Command({ name: 'generate-admin', description: 'Generate admin' })
export class GenerateAdminCommand extends CommandRunner {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log(1234);
  }
}
