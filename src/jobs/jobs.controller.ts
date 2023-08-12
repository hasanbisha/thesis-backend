import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CrudDto } from 'src/utils/crud/query';
import { Role } from 'src/user/roles/role.enum';
import { Roles } from 'src/user/roles/roles.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(@Body() body: CreateJobDto) {
    return this.jobsService.create(body);
  }

  @Get()
  findAll(@Query() query: CrudDto) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Manager)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Manager)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.jobsService.remove(id);
  }
}
