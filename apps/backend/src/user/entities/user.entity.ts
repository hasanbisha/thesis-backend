import { Clock } from "../../clock/entities/clock.entity";
import { Job } from "../../jobs/entities/job.entity";
import { Location } from "../../locations/entities/location.entity";
import { PaymentGroup } from "../../payment-groups/entities/payment-group.entity";
import { Project } from "../../projects/entities/project.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { WorkingGroup } from "../../working-groups/entities/working-group.entity";
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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 0 | 1 | 2;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Clock, clock => clock.user)
  clocks: Clock[];

  @OneToMany(() => Timesheet, timesheet => timesheet.user)
  timesheets: Timesheet[];

  @ManyToMany(() => Job, (job) => job.users)
  @JoinTable()
  jobs: Job[];

  @ManyToMany(() => Location, (location) => location.users)
  @JoinTable()
  locations: Location[];

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[];

  @ManyToOne(() => WorkingGroup, workingGroup => workingGroup.users)
  workingGroup: WorkingGroup;

  @ManyToOne(() => PaymentGroup, paymentGroup => paymentGroup.users)
  paymentGroup: PaymentGroup;
}
