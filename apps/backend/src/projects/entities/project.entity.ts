import { Clock } from "../../clock/entities/clock.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

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

  @ManyToMany(() => User, (user) => user.jobs)
  users: User[];
}
