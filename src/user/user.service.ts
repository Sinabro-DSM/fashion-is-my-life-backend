import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { modifyProfileDto } from './dto/modifyProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  public async modifyProfile(
    profile_url: string,
    modifyProfileDto: modifyProfileDto,
  ) {
    return await this.userRepository.modifyProfile(
      profile_url,
      modifyProfileDto,
    );
  }

  public async userInfo(user_id: number) {
    return await this.userRepository.findOne(user_id);
  }
}
