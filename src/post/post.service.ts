import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from 'src/shared/entity/picture/picture.entity';
import { PictureRepository } from 'src/shared/entity/picture/picture.repository';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { notFoundPostIdException } from 'src/shared/exception/exception.index';
import { postRequestData } from './dto/post-req.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
    @InjectRepository(Picture)
    private readonly pictureRepository: PictureRepository,
  ) {}

  public async createPost(dto: postRequestData, files: Express.Multer.File[]) {
    let files_url: Picture[] = await Promise.all(
      files.map(async (file) => {
        let picture = await this.pictureRepository.savePicture(file.filename);
        return picture;
      }),
    );

    return await this.postRepository.createPost(dto, files_url);
  }

  public async deletePost(post_id: number) {
    if (!(await this.postRepository.checkExistPost(post_id))) {
      throw notFoundPostIdException;
    }
    return await this.postRepository.deletePost(post_id);
  }
}
