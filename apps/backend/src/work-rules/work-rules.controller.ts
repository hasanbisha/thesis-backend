import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkRulesService } from './work-rules.service';
import { CreateWorkRuleDto } from './dto/create-work-rule.dto';
import { UpdateWorkRuleDto } from './dto/update-work-rule.dto';

@Controller('work-rules')
export class WorkRulesController {
  constructor(private readonly workRulesService: WorkRulesService) {}

  @Post()
  create(@Body() createWorkRuleDto: CreateWorkRuleDto) {
    return this.workRulesService.create(createWorkRuleDto);
  }

  @Get()
  findAll() {
    return this.workRulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workRulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkRuleDto: UpdateWorkRuleDto) {
    return this.workRulesService.update(+id, updateWorkRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workRulesService.remove(+id);
  }
}
