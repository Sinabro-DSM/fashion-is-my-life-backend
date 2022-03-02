import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('hashtag')
export class Hashtag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column({ length: 10 })
  name: string;

  @Column({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => Post, (post) => post.hashTags, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
