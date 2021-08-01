import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([PostRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
