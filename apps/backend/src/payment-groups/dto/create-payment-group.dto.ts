import { IsNumber, IsString } from "class-validator";

export class CreatePaymentGroupDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsNumber()
  overtimeMultiplier: number;

  @IsNumber()
  overtimeThreshold: number;
}
