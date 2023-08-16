import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CrudDto } from '../utils/crud/query';
import { Role } from '../user/roles/role.enum';
import { Roles } from '../user/roles/roles.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(@Body() body: CreateProjectDto) {
    return this.projectsService.create(body);
  }

  @Get()
  findAll(@Query() query: CrudDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Manager)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Manager)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}
