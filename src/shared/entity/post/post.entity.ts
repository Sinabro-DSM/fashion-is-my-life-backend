import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../comment/comment.entity';
import { Hanger } from '../hanger/hanger.entity';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Picture } from '../picture/picture.entity';
import { User } from '../user/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 256, nullable: true })
  content: string;

  @Column({ length: 30, nullable: true })
  top_info: string;

  @Column({ length: 30, nullable: true })
  bottoms_info: string;

  @Column({ length: 30, nullable: true })
  shoes_info: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ nullable: true })
  r: number;

  @Column({ nullable: true })
  g: number;

  @Column({ nullable: true })
  b: number;

  @OneToMany(() => Hanger, (hanger) => hanger.post)
  hanger!: Hanger;

  @ManyToOne(() => User, (user) => user.post, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Hashtag, (hashtag) => hashtag.post)
  hashtag: Hashtag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  commnet: Comment[];

  @OneToMany(() => Picture, (picture) => picture.post)
  picture: Picture[];
}
