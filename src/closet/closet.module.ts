import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { JwtStrategy } from 'src/shared/jwt/passport/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [ClosetService, JwtStrategy],
  controllers: [ClosetController],
})
export class ClosetModule {}
