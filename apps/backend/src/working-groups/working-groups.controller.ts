import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkingGroupsService } from './working-groups.service';
import { CreateWorkingGroupDto } from './dto/create-working-group.dto';
import { UpdateWorkingGroupDto } from './dto/update-working-group.dto';

@Controller('working-groups')
export class WorkingGroupsController {
  constructor(private readonly workingGroupsService: WorkingGroupsService) {}

  @Post()
  create(@Body() createWorkingGroupDto: CreateWorkingGroupDto) {
    return this.workingGroupsService.create(createWorkingGroupDto);
  }

  @Get()
  findAll() {
    return this.workingGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workingGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkingGroupDto: UpdateWorkingGroupDto) {
    return this.workingGroupsService.update(+id, updateWorkingGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workingGroupsService.remove(+id);
  }
}
