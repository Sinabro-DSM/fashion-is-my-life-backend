import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 200, nullable: true })
  profile_path: string;

  @Column({ nullable: true })
  @Exclude()
  currentHashedRefreshToken?: string;

  @OneToMany((type) => Post, (post) => post.user)
  post: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  commnet: Comment[];
}
