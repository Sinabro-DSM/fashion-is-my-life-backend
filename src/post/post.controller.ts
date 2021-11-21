import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PostMulterOptions } from 'src/config/multer';
import { deleteHangerRequestDto } from './dto/delete-hanger.dto';
import { postHangerRequestDto } from './dto/post-hanger.dto';
import { postRequestDto } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, PostMulterOptions))
  public async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() postRequestData: postRequestDto,
  ) {
    await this.postService.createPost(postRequestData, files);
    return { status: 201, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:postId')
  public async deletePost(@Param('post_id') post_id: number) {
    await this.postService.deletePost(post_id);
    return { status: 200, message: 'success' };
  }

  @Get()
  public async search(@Query() searchWord: string) {
    return await this.postService.search(searchWord);
  }

  @Get('/hanger/:postId')
  public async getHanger(@Body() post_id: number) {
    return await this.postService.getHanger(post_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/hanger')
  public async postHanger(@Body() postHangerRequestDto: postHangerRequestDto) {
    return await this.postService.postHanger(postHangerRequestDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/hanger')
  public async deleteHanger(
    @Body() deleteHangerRequestDto: deleteHangerRequestDto,
  ) {
    return await this.postService.deleteHanger(deleteHangerRequestDto);
  }

  @Get('/closet/:postId')
  public async getClosetInfo(@Param('post_id') post_id: number) {
    return await this.postService.getClosetInfo(post_id);
  }

  @Get('/postall')
  public async getPostAll() {
    return await this.postService.postAll();
  }

  @Get('/like')
  public async postLike() {
    return await this.postService.postLike();
  }

  @Get('/recency')
  public async postRecency() {
    return await this.postService.postRecency();
  }

  @Get('/recommendation')
  public async postRecommendation() {
    console.log(1);
    return await this.postService.postRecommendation();
  }

  @Get('/:postId')
  public async getPost(@Param('post_id') post_id: number) {
    return await this.postService.getPost(post_id);
  }
}
