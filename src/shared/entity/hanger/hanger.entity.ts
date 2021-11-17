import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('hanger')
export class Hanger {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @ManyToOne((type) => Post, (post) => post.hanger)
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
