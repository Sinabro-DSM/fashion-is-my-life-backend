import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer';
import { postRequestData } from './dto/post-req.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions))
  public async createPost(
    @UploadedFiles() files: Express.Multer.File[], // 만약 안된다면 @UploadedFiles() files: Array<IMulterFile> 이렇게 인터페이스로 바꿔보기
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
}

// @UseGuards(AuthGuard('jwt'))
// @UseInterceptors(FilesInterceptor('song', 2, SongMulterConfigs))
// @Post()
// public async uploadSong(
//   @UploadedFiles() files: Array<IMulterFile>,
//   @Body() dto: UploadSongDto,
// ): Promise<UploadSongResponseData> {
//   await this.songService.uploadSong(
//     files[0].filename,
//     files[1].filename,
//     dto,
//   );
//   return { message: 'success' };
// }
