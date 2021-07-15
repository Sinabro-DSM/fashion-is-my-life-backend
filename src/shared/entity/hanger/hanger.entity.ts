import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hanger')
export class Hanger {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;
}
