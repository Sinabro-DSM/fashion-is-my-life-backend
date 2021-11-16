import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { badRequestException } from 'src/shared/exception/exception.index';
import { Payload } from '../payload/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userRepository.findOne({
      where: { user_id: payload.sub },
    });

    if (user) {
      return user;
    } else {
      throw badRequestException;
    }
  }
}
