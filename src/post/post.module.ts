import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PictureRepository } from 'src/shared/entity/picture/picture.repository';
import { HashtagRepository } from 'src/shared/entity/hashtag/hashtag.repository';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
import { JwtStrategy } from 'src/shared/jwt/passport/jwt.strategy';
import { UserRepository } from 'src/shared/entity/user/user.repository';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([
      PostRepository,
      PictureRepository,
      HashtagRepository,
      HangerRepository,
      UserRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [PostService, JwtStrategy],
})
export class PostModule {}
