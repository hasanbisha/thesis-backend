import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkingGroupDto } from './create-working-group.dto';

export class UpdateWorkingGroupDto extends PartialType(CreateWorkingGroupDto) {}
