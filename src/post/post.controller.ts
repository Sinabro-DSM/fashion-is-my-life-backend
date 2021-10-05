import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostMulterOptions } from 'src/config/multer';
import { postRequestDto } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, PostMulterOptions))
  public async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() postRequestData: postRequestDto,
  ) {
    await this.postService.createPost(postRequestData, files);
    return { status: 201, message: 'success' };
  }

  @Delete('/:postId')
  public async deletePost(@Param('post_id') post_id: number) {
    await this.postService.deletePost(post_id);
    return { status: 200, message: 'success' };
  }

  @Get('/recommendation')
  public async postRecommendation() {
    await this.postService.postRecommendation();
    return { status: 200, message: 'success' };
  }

  @Get()
  public async search(@Query() searchWord: string) {
    await this.postService.search(searchWord);
    return { status: 200, message: 'success' };
  }

  @Get('/hanger/:postId')
  public async getHanger(@Body() post_id: number) {
    return await this.postService.getHanger(post_id);
  }

  @Get('/:postId')
  public async getPost(@Param('post_id') post_id: number) {
    return await this.postService.getPost(post_id);
  }

  @Get('/closet/:postId')
  public async getClosetInfo(@Param('post_id') post_id: number) {
    return await this.postService.getClosetInfo(post_id);
  }
}
