import { Location } from "../../locations/entities/location.entity";
import { Job } from "../../jobs/entities/job.entity";
import { Project } from "../../projects/entities/project.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaymentGroup } from "../../payment-groups/entities/payment-group.entity";

export type ClockType = "start-shift"
  | "end-shift"
  | "start-break"
  | "end-break";

@Entity()
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: "start-shift" | "end-shift" | "start-break" | "end-break";

  @Column()
  date: string;

  @Column()
  timestamp: number;

  @ManyToOne(() => Job,  job => job.clocks)
  job: Job;

  @ManyToOne(() => Location,  location => location.clocks)
  location: Location;

  @ManyToOne(() => Project,  project => project.clocks)
  project: Project;

  @ManyToOne(() => PaymentGroup,  paymentGroup => paymentGroup.clocks)
  paymentGroup: PaymentGroup;

  @ManyToOne(() => User,  user => user.clocks)
  user: User;

  @ManyToMany(() => Timesheet, (timesheet) => timesheet.clocks)
  @JoinTable()
  timesheets: Timesheet[];
}
