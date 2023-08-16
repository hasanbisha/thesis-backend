import { IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  code: string;

  @IsString()
  description: string;
}
