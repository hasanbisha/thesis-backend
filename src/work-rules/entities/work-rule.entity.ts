import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  value: string;
}
