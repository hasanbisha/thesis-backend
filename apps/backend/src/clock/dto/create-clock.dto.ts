import { IsIn, IsNumber } from "class-validator";
import { ClockType } from "../entities/clock.entity";

export class CreateClockDto {
  @IsIn(["start-shift", "end-shift", "start-break", "end-break"])
  type: ClockType;

  @IsNumber()
  job: number;

  @IsNumber()
  location: number;

  @IsNumber()
  project: number;
}
