import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../backend/src/user/entities/user.entity';
import { Command, CommandRunner } from 'nest-commander';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { Role } from 'apps/backend/src/user/roles/role.enum';

@Command({ name: 'generate-admin', description: 'Generate admin' })
export class GenerateAdminCommand extends CommandRunner {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const user = new User();
    user.firstName = "admin";
    user.middleName = "";
    user.lastName = "";
    user.email = "admin@admin.com";
    user.password = await bcrypt.hash("password", 1);
    user.role = Role.Admin;
    await this.repository.save(user);
  }
}
