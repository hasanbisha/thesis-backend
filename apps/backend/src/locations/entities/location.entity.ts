import { Clock } from "../../clock/entities/clock.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => Clock, clock => clock.location)
  clocks: Clock[];

  @OneToMany(() => Timesheet, timesheet => timesheet.location)
  timesheets: Timesheet[];

  @ManyToMany(() => User, (user) => user.jobs)
  users: User[];
}
