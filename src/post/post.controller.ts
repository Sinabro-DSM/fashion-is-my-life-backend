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
import { deleteHangerRequestDto } from './dto/delete-hanger.dto';
import { getFeedTooColorDto } from './dto/getFeedTooColor.dto';
import { postHangerRequestDto } from './dto/post-hanger.dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Post('/:post_id')
  @UseInterceptors(FileInterceptor('file', PostMulterOptions))
  public async createPicture(
    @UploadedFile() file: MulterFileInterface,
    @Param('post_id') post_id: number,
  ) {
    await this.postService.createPicture(file, post_id);
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
    return await this.postService.postRecommendation();
  }

  @Get('/:post_id')
  public async getPost(@Param('post_id') post_id: number) {
    return await this.postService.getPost(post_id);
  }
}
