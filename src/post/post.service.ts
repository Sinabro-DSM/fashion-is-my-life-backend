import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { postRequestData } from './dto/post-req.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
  ) {}

  public async createPost(@Body() post: postRequestData) {
    return await this.postRepository.createPost(post);
  }

  public async deletePost(post_id: number) {
    return await this.postRepository.deletePost(post_id);
  }
}
