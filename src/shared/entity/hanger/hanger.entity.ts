import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity('hanger')
export class Hanger {
  @PrimaryGeneratedColumn()
  hanger_id: number;

  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  post_id: number;

  @ManyToOne(() => Post, (post) => post.hangers)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User, (user) => user.hanger)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
