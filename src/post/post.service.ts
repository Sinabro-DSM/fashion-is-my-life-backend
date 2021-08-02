import { Body, Injectable, UploadedFiles } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { notFoundPostIdException } from 'src/shared/exception/exception.index';
import { postRequestData } from './dto/post-req.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
  ) {}

  public async createPost(
    @Body() post: postRequestData,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.postRepository.createPost(post);
  }

  public async deletePost(post_id: number) {
    if (!(await this.postRepository.checkExistPost(post_id))) {
      throw notFoundPostIdException;
    }
    return await this.postRepository.deletePost(post_id);
  }
}
