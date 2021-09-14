import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PictureRepository } from 'src/shared/entity/picture/picture.repository';
import { HashtagRepository } from 'src/shared/entity/hashtag/hashtag.repository';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';

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
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
