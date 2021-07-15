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

  //userId fk
  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne((type) => User, (user) => user.user_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  //postId fk
  @Column({ name: 'post_id' })
  post_id: number;

  @ManyToOne((type) => Post, (post) => post.post_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
