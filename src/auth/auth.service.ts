import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { ExistEmailError } from 'src/shared/exception/exception.index';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  public async signUp(user: SignUpDto): Promise<User> {
    if (await this.userRepository.findOne({ email: user.email })) {
      throw ExistEmailError;
    }
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;

    return await this.userRepository.signUp(user);
  }
}
