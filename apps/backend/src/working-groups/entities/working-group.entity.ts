import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkingGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => User, user => user.workingGroup)
  users: User[];

  @OneToMany(() => Timesheet, timesheet => timesheet.workingGroup)
  timesheets: Timesheet[];
}
