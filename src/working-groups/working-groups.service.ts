import { Injectable } from '@nestjs/common';
import { CreateWorkingGroupDto } from './dto/create-working-group.dto';
import { UpdateWorkingGroupDto } from './dto/update-working-group.dto';

@Injectable()
export class WorkingGroupsService {
  create(createWorkingGroupDto: CreateWorkingGroupDto) {
    return 'This action adds a new workingGroup';
  }

  findAll() {
    return `This action returns all workingGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workingGroup`;
  }

  update(id: number, updateWorkingGroupDto: UpdateWorkingGroupDto) {
    return `This action updates a #${id} workingGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} workingGroup`;
  }
}
