import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentGroupDto } from './create-payment-group.dto';

export class UpdatePaymentGroupDto extends PartialType(CreatePaymentGroupDto) {}
