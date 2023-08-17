import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClockService } from './clock.service';
import { CreateClockDto } from './dto/create-clock.dto';
import { CurrentUser } from '../auth/auth.guard';
import { User } from '../user/entities/user.entity';

@Controller('clock')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  create(@CurrentUser() user: User, @Body() body: CreateClockDto) {
    return this.clockService.create(body, user);
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.clockService.getCurrentShift(user);
  }
}
