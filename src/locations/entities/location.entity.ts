import { Clock } from "src/clock/entities/clock.entity";
import { Timesheet } from "src/timesheets/entities/timesheet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  // TODO: users
}
