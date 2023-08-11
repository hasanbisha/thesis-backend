import { Clock } from "src/clock/entities/clock.entity";
import { Job } from "src/jobs/entities/job.entity";
import { Location } from "src/locations/entities/location.entity";
import { PaymentGroup } from "src/payment-groups/entities/payment-group.entity";
import { Project } from "src/projects/entities/project.entity";
import { Timesheet } from "src/timesheets/entities/timesheet.entity";
import { WorkingGroup } from "src/working-groups/entities/working-group.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Clock, clock => clock.user)
  clocks: Clock[];

  @OneToMany(() => Timesheet, timesheet => timesheet.user)
  timesheets: Timesheet[];

  @ManyToMany(() => Job)
  @JoinTable()
  job: Job[];

  @ManyToMany(() => Location)
  @JoinTable()
  location: Location[];

  @ManyToOne(() => WorkingGroup, workingGroup => workingGroup.users)
  workingGroup: WorkingGroup;

  @ManyToOne(() => PaymentGroup, paymentGroup => paymentGroup.users)
  paymentGroup: PaymentGroup;

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];
}
