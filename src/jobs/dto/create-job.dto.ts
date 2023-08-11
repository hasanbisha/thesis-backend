import { IsInt, IsString } from "class-validator";

export class CreateJobDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsInt()
  rate: number;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
