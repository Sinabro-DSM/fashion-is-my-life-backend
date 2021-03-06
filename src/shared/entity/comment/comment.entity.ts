import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';
import { User } from '../user/user.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column({ length: 200, nullable: true })
  comment: string;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => User, (user) => user.commnet, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Post, (post) => post.commnets, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
