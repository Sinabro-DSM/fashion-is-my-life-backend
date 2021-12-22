import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { JwtStrategy } from 'src/shared/jwt/passport/jwt.strategy';
import { HangerController } from './hanger.controller';
import { HangerService } from './hanger.service';

@Module({
  imports: [TypeOrmModule.forFeature([HangerRepository, UserRepository])],
  controllers: [HangerController],
  providers: [HangerService, JwtStrategy],
})
export class HangerModule {}
