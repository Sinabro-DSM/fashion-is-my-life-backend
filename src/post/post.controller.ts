import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { postRequestData } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  public async createPost(@Body() post: postRequestData) {
    await this.postService.createPost(post);
    return { status: 200, message: 'success' };
  }

  @Delete(':postId')
  public async deletePost(@Param('post_id') post_id: number) {
    await this.postService.deletePost(post_id);
    return { status: 200, message: 'success' };
  }
}
