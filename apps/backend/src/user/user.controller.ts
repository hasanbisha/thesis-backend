import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from './roles/roles.guard';
import { Role } from './roles/role.enum';
import { CurrentUser } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { CrudDto } from '../utils/crud/query';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Admin, Role.Manager)
  create(
    @CurrentUser() user: User,
    @Body() data: CreateUserDto
  ) {
    return this.userService.create(user, data);
  }

  @Get()
  findAll(
    @CurrentUser() user: User,
    @Query() query: CrudDto,
  ) {
    return this.userService.findAll(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, user, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
