import { Clock } from "../../clock/entities/clock.entity";
import { Job } from "../../jobs/entities/job.entity";
import { Location } from "../../locations/entities/location.entity";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../user/entities/user.entity";
import { WorkType } from "../../work-types/entities/work-type.entity";
import { WorkingGroup } from "../../working-groups/entities/working-group.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as moment from "moment";
import { PaymentGroup } from "../../payment-groups/entities/payment-group.entity";

const OVERTIME_MULTIPLIER = 2;

export type TimesheetType = "regular" | "break" | "overtime";

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  start: number;

  @Column()
  end: number;

  @Column()
  duration: number;

  @Column()
  total: number;

  @Column()
  type: TimesheetType;

  @ManyToOne(() => User, user => user.timesheets)
  user: User;

  @ManyToOne(() => Job, job => job.timesheets)
  job: Job;

  @ManyToOne(() => Location, location => location.timesheets)
  location: Location;

  @ManyToOne(() => Project, project => project.timesheets)
  project: Project;

  @ManyToOne(() => PaymentGroup, paymentGroup => paymentGroup.timesheets)
  paymentGroup: PaymentGroup;

  @ManyToMany(() => Clock, clock => clock.timesheets)
  clocks: Clock[];

  @ManyToOne(() => WorkType, workType => workType.timesheets)
  workType: WorkType;

  @ManyToOne(() => WorkingGroup, workingGroup => workingGroup.timesheets)
  workingGroup: WorkingGroup;

  calculateDuration() {
    if (!this.end || !this.start) {
      throw new Error("Start and end are required to calculate duration");
    }
    this.duration = moment(moment.unix(this.end))
      .diff(moment.unix(this.start), "second");
  }

  calculateTotal() {
    if (!this.duration || !this.job || !this.type) {
      throw new Error("Duration, job and type are required to calculate duration");
    }
    if (this.type === "break") {
      this.total = 0;
      return;
    }
    const multiplier = this.type === "overtime"
      ? OVERTIME_MULTIPLIER
      : 1;
    this.total = moment.duration(this.duration, "second").asHours() * this.job.rate * multiplier;
  }
}
