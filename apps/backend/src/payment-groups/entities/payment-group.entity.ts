import { Clock } from "../../clock/entities/clock.entity";
import { Timesheet } from "../../timesheets/entities/timesheet.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  overtimeMultiplier: number;

  @Column()
  overtimeThreshold: number;

  @Column({ default: true })
  status: boolean;

  @OneToMany(() => User, user => user.paymentGroup)
  users: User[];

  @OneToMany(() => Clock, clock => clock.paymentGroup)
  clocks: Clock[];

  @OneToMany(() => Timesheet, timesheet => timesheet.paymentGroup)
  timesheets: Timesheet[];
}
