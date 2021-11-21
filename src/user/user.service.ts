import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { NotFoundUserIdError } from 'src/shared/exception/exception.index';
import { modifyProfileDto } from './dto/modifyProfile.dto';
import { UserInfoReqDto } from './dto/userInfoReqDto.dto';

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

  public async userInfo(user_id:number):Promise<UserInfoReqDto>{
    if (await this.userRepository.findOne({ user_id: user_id })) {
      throw NotFoundUserIdError;
  }
    const userInfo = await this.userRepository.userInfo(user_id);
    return userInfo;
  }
}
