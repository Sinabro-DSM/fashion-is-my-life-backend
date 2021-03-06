import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { modifyProfileDto } from 'src/user/dto/modifyProfile.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(user: SignUpDto): Promise<User> {
    let newUser: User;
    newUser = this.create(user);
    return await this.save(newUser);
  }

  async modifyProfile(profile_url: string, modifyProfileDto: modifyProfileDto) {
    let user_id = modifyProfileDto.user_id;
    let nickname = modifyProfileDto.nickname;

    return this.createQueryBuilder()
      .update(User)
      .set({ nickname: nickname, profile_path: profile_url })
      .where('user.user_id = :user_id', { user_id })
      .execute();
  }

  async getUserInfo(user_id: number) {
    return await this.createQueryBuilder('user')
      .select('user.email')
      .addSelect('user.nickname')
      .innerJoinAndSelect('user.post', 'post')
      .where('user.user_id = :user_id', { user_id: user_id })
      .getOne();
  }

  async checkExistUser(user_id: number): Promise<boolean> {
    const user = await this.createQueryBuilder('user')
      .select('user.user_id')
      .where('user.user_id = :user_id', { user_id })
      .getOne();
    if (user) {
      return true;
    }
    return false;
  }
}
