import { Timesheet } from "src/timesheets/entities/timesheet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ default: 1 })
  multiplier: number;

  @Column()
  color: string;

  @OneToMany(() => Timesheet, (timesheet) => timesheet.workType)
  timesheets: Timesheet[];
}
