import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from 'src/shared/entity/comment/comment.repository';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { JwtStrategy } from 'src/shared/jwt/passport/jwt.strategy';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, UserRepository])],
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy],
})
export class CommentModule {}
