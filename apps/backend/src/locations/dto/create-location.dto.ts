import { IsString } from "class-validator";

export class CreateLocationDto {
  @IsString()
  code: string;

  @IsString()
  description: string;

  @IsString()
  country: string;

  @IsString()
  city: string;
}
