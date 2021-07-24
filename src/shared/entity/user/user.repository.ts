import { SignUpDto } from 'src/auth/dto/signup.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(user: SignUpDto): Promise<User> {
    let newUser: User;
    newUser = this.create(user);
    return await this.save(newUser);
  }
}
