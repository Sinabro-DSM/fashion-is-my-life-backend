import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('hanger')
export class Hanger {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @OneToMany((type) => Post, (post) => post.hanger)
  post: Post[];
}
