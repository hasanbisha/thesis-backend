import { Clock } from "../../clock/entities/clock.entity";
import { Job } from "../../jobs/entities/job.entity";
import { Location } from "../../locations/entities/location.entity";
import { Project } from "../../projects/entities/project.entity";
import { User } from "../../user/entities/user.entity";
import { WorkType } from "../../work-types/entities/work-type.entity";
import { WorkingGroup } from "../../working-groups/entities/working-group.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start: number;

  @Column()
  end: number;

  @ManyToOne(() => User, user => user.timesheets)
  user: User;

  @ManyToOne(() => Job, job => job.timesheets)
  job: Job;

  @ManyToOne(() => Location, location => location.timesheets)
  location: Location;

  @OneToMany(() => Clock, clock => clock.timesheet)
  clocks: Clock[];

  @ManyToOne(() => WorkType, workType => workType.timesheets)
  workType: WorkType;

  @ManyToOne(() => WorkingGroup, workingGroup => workingGroup.timesheets)
  workingGroup: WorkingGroup;

  @ManyToOne(() => Project, project => project.timesheets)
  project: Project;
}
