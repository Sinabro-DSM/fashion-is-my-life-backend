import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from 'src/shared/entity/hashtag/hashtag.entity';
import { HashtagRepository } from 'src/shared/entity/hashtag/hashtag.repository';
import { Picture } from 'src/shared/entity/picture/picture.entity';
import { PictureRepository } from 'src/shared/entity/picture/picture.repository';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { notFoundPostIdException } from 'src/shared/exception/exception.index';
import { postRequestDto } from './dto/post-req.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
    @InjectRepository(Picture)
    private readonly pictureRepository: PictureRepository,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: HashtagRepository,
  ) {}

  public async createPost(dto: postRequestDto, files: Express.Multer.File[]) {
    let post = new Post();
    let files_url: Picture[] = await Promise.all(
      files.map(async (file) => {
        let picture = await this.pictureRepository.savePicture(file.filename);
        return picture;
      }),
    );
    await this.hashtagRepository.saveHashtag(dto);

    post.title = dto.title;
    post.picture = files_url;
    post.top_info = dto.topInfo;
    post.bottoms_info = dto.bottomInfo;
    post.shoes_info = dto.shoesInfo;
    post.content = dto.content;
    return await this.postRepository.save(post);
  }

  public async deletePost(post_id: number) {
    if (!(await this.postRepository.checkExistPost(post_id))) {
      throw notFoundPostIdException;
    }
    return await this.postRepository.deletePost(post_id);
  }
}
