import { IsEmail, IsIn, IsNumber, IsOptional, IsString } from "class-validator"
import { Role } from "../roles/role.enum";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsIn([Role.Manager, Role.User])
  role: Role;

  @IsNumber(undefined, {
    each: true,
  })
  jobs: number[];

  @IsNumber(undefined, {
    each: true,
  })
  locations: number[];

  @IsNumber(undefined, {
    each: true,
  })
  projects: number[];

  @IsNumber()
  paymentGroup: number;
}
