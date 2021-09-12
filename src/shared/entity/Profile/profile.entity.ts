import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  profile_id: number;

  @Column({ length: 256 })
  profile_path: string;

  @OneToOne((type) => User, (user) => user.user_id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
