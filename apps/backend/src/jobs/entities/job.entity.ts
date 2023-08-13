import { Clock } from "../../clock/entities/clock.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  rate: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Clock, clock => clock.job)
  clocks: Clock[];

  @OneToMany(() => Timesheet, timesheet => timesheet.job)
  timesheets: Timesheet[];

  @ManyToMany(() => User, (user) => user.jobs)
  users: User[];
}
