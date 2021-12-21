import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
import { JwtStrategy } from 'src/shared/jwt/passport/jwt.strategy';
import { HangerController } from './hanger.controller';
import { HangerService } from './hanger.service';

@Module({
  imports: [TypeOrmModule.forFeature([HangerRepository])],
  controllers: [HangerController],
  providers: [HangerService, JwtStrategy],
})
export class HangerModule {}
