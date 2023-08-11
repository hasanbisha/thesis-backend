import { Injectable } from '@nestjs/common';
import { CreateWorkRuleDto } from './dto/create-work-rule.dto';
import { UpdateWorkRuleDto } from './dto/update-work-rule.dto';

@Injectable()
export class WorkRulesService {
  create(createWorkRuleDto: CreateWorkRuleDto) {
    return 'This action adds a new workRule';
  }

  findAll() {
    return `This action returns all workRules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workRule`;
  }

  update(id: number, updateWorkRuleDto: UpdateWorkRuleDto) {
    return `This action updates a #${id} workRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} workRule`;
  }
}
