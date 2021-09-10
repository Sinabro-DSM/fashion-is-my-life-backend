import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  picture_id: number;

  @Column({ length: 256 })
  picture_path: string;

  @ManyToOne((type) => Post, (post) => post.post_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
