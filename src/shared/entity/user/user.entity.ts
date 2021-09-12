import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Post } from '../post/post.entity';
import { Profile } from '../Profile/profile.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 8, unique: true })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 100, nullable: true })
  profile: string;

  @OneToMany((type) => Post, (post) => post.user)
  post: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  commnet: Comment[];

  @OneToOne((type) => Profile, (profile) => profile.profile_id)
  Profile: Profile[];
}
