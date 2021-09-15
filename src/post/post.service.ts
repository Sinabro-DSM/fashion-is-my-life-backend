import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hanger } from 'src/shared/entity/hanger/hanger.entity';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
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
    @InjectRepository(Hanger)
    private readonly hangerRepository: HangerRepository,
  ) {}

  public async createPost(dto: postRequestDto, files: Express.Multer.File[]) {
    const post = new Post();
    const files_url: Picture[] = await Promise.all(
      files.map(async (file) => {
        let picture = await this.pictureRepository.savePicture(file.filename);
        return picture;
      }),
    );

    post.title = dto.title;
    post.picture = files_url;
    post.top_info = dto.topInfo;
    post.bottoms_info = dto.bottomInfo;
    post.shoes_info = dto.shoesInfo;
    post.content = dto.content;
    const createdPost = await this.postRepository.save(post);

    dto.tags.map(async (tag) => {
      await this.hashtagRepository.saveHashtag({
        name: tag,
        post_id: createdPost.post_id,
      });
    });
  }

  public async deletePost(post_id: number) {
    if (!(await this.postRepository.checkExistPost(post_id))) {
      throw notFoundPostIdException;
    }
    return await this.postRepository.deletePost(post_id);
  }

  public async postRecommendation() {
    return await this.postRepository.postRecommendation();
  }

  public async searchHashtag(searchWord: string) {
    return await this.postRepository.search(searchWord);
  }

  public async getHanger(post_id: number) {
    const hangerCnt = await this.hangerRepository.getHanger(post_id);

    return hangerCnt.length;
  }

  public async getPost(post_id: number) {
    return await this.postRepository.getPost(post_id);
  }
}
