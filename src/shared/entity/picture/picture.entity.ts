import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('picture')
export class Picture {
  @PrimaryColumn()
  picture_id: number;

  @Column({ length: 256 })
  picture_path: string;

  @Column({ name: 'post_id' })
  post_id: number;

  @ManyToOne(() => Post, (post) => post.pictures, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Post;
}
