import { Clock } from "src/clock/entities/clock.entity";
import { Timesheet } from "src/timesheets/entities/timesheet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @OneToMany(() => Clock, clock => clock.project)
  clocks: Clock[]

  @OneToMany(() => Timesheet, timesheet => timesheet.project)
  timesheets: Timesheet[]
}
