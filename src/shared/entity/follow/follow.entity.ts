import { Entity, PrimaryColumn } from 'typeorm';

@Entity('follow')
export class Follow {
  @PrimaryColumn()
  follower_id: number;

  @PrimaryColumn()
  following_id: number;
}
