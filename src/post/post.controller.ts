import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { PostMulterOptions } from 'src/config/multer';
import { MulterFileInterface } from 'src/config/multer.interface';
import { User } from 'src/shared/entity/user/user.entity';
import { getFeedTooColorDto } from './dto/getFeedTooColor.dto';
import { postRequestDto } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  public async createPost(
    @Body() postRequestData: postRequestDto,
    @Req() req: Request,
  ) {
    const post_id = await this.postService.createPost(
      postRequestData,
      req.user as User,
    );
    return post_id;
  }

  @Post('/file/:post_id')
  @UseInterceptors(FileInterceptor('file', PostMulterOptions))
  public async createPicture(
    @UploadedFile() file: MulterFileInterface,
    @Param('post_id') post_id: number,
  ) {
    await this.postService.createPicture(file, post_id);
    return { status: 201, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:post_id')
  public async deletePost(@Param('post_id') post_id: number) {
    await this.postService.deletePost(post_id);
    return { status: 200, message: 'success' };
  }

  @Get('/color')
  public async getFeedTooColor(@Body() getFeedTooColorDto: getFeedTooColorDto) {
    return await this.postService.getFeedTooColor(getFeedTooColorDto);
  }

  @Get()
  public async search(@Query() searchWord: string) {
    return await this.postService.search(searchWord);
  }

  @Get('/closet/:post_id')
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
    return await this.postService.postRecommendation();
  }

  @Get('/:post_id')
  public async getPost(@Param('post_id') post_id: number) {
    return await this.postService.getPost(post_id);
  }
}
