import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostMulterOptions } from 'src/config/multer';
import { postRequestData } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, PostMulterOptions))
  public async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() postRequestData: postRequestData,
  ) {
    await this.postService.createPost(postRequestData, files);
    return { status: 201, message: 'success' };
  }

  @Delete(':postId')
  public async deletePost(@Param('post_id') post_id: number) {
    await this.postService.deletePost(post_id);
    return { status: 200, message: 'success' };
  }

  @Get('recommendation')
  public async postRecommendation() {
    await this.postService.postRecommendation();
    return { status: 200, message: 'success' };
  }
}
