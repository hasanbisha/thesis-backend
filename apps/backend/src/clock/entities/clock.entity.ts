import { Location } from "../../locations/entities/location.entity";
import { Job } from "../../jobs/entities/job.entity";
import { Project } from "../../projects/entities/project.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Clock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: number;

  @ManyToOne(() => Job,  job => job.clocks)
  job: Job;

  @ManyToOne(() => Location,  location => location.clocks)
  location: Location;

  @ManyToOne(() => Project,  project => project.clocks)
  project: Project;

  @ManyToOne(() => User,  user => user.clocks)
  user: User;

  @ManyToOne(() => Timesheet,  timesheet => timesheet.clocks)
  timesheet: Timesheet;
}
