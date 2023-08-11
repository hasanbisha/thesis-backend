import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClockService } from './clock.service';
import { CreateClockDto } from './dto/create-clock.dto';
import { UpdateClockDto } from './dto/update-clock.dto';

@Controller('clock')
export class ClockController {
  constructor(private readonly clockService: ClockService) {}

  @Post()
  create(@Body() createClockDto: CreateClockDto) {
    return this.clockService.create(createClockDto);
  }

  @Get()
  findAll() {
    return this.clockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClockDto: UpdateClockDto) {
    return this.clockService.update(+id, updateClockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clockService.remove(+id);
  }
}
