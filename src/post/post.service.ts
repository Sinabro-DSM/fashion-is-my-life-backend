import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MulterFileInterface } from 'src/config/multer.interface';
import { Hanger } from 'src/shared/entity/hanger/hanger.entity';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
import { Hashtag } from 'src/shared/entity/hashtag/hashtag.entity';
import { HashtagRepository } from 'src/shared/entity/hashtag/hashtag.repository';
import { Picture } from 'src/shared/entity/picture/picture.entity';
import { PictureRepository } from 'src/shared/entity/picture/picture.repository';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { User } from 'src/shared/entity/user/user.entity';
import { notFoundPostIdException } from 'src/shared/exception/exception.index';
import { deleteHangerRequestDto } from './dto/delete-hanger.dto';
import { getFeedTooColorDto } from './dto/getFeedTooColor.dto';
import { postHangerRequestDto } from './dto/post-hanger.dto';
import { postRequestDto } from './dto/post-req.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
    @InjectRepository(Picture)
    private readonly pictureRepository: PictureRepository,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: HashtagRepository,
    @InjectRepository(Hanger)
    private readonly hangerRepository: HangerRepository,
  ) {}

  public async createPost(dto: postRequestDto, user: User) {
    const post = new Post();

    post.title = dto.title;
    post.top_info = dto.topInfo;
    post.bottoms_info = dto.bottomInfo;
    post.shoes_info = dto.shoesInfo;
    post.content = dto.content;
    post.user_id = user.user_id;
    post.r = dto.r;
    post.g = dto.g;
    post.b = dto.b;

    const createdPost = await this.postRepository.save(post);

    dto.tags.map(async (tag) => {
      await this.hashtagRepository.saveHashtag({
        name: tag,
        post_id: createdPost.post_id,
      });
    });

    return createdPost.post_id;
  }

  public async createPicture(file: MulterFileInterface, post_id: number) {
    return await this.pictureRepository.savePicture(file, post_id);
  }

  public async getFeedTooColor(getFeedTooColorDto: getFeedTooColorDto) {
    const { r, g, b } = getFeedTooColorDto;
    return await this.postRepository.getFeedTooColor(r, g, b);
  }

  public async deletePost(post_id: number) {
    if (await this.postRepository.checkExistPost(post_id)) {
      throw notFoundPostIdException;
    }
    return await this.postRepository.deletePost(post_id);
  }

  public async search(searchWord: string) {
    return await this.postRepository.search(searchWord);
  }

  public async getHanger(post_id: number) {
    const hangerCnt = await this.hangerRepository.getHanger(post_id);

    return hangerCnt.length;
  }

  public async postHanger(post_id: number, user: User) {
    const user_id = user.user_id;
    return await this.hangerRepository.postHanger(user_id, post_id);
  }

  public async deleteHanger(post_id: number, user: User) {
    const user_id = user.user_id;
    return await this.hangerRepository.deleteHanger(user_id, post_id);
  }

  public async getPost(post_id: number) {
    return await this.postRepository.getPost(post_id);
  }

  public async getClosetInfo(post_id: number) {
    return await this.postRepository.getClosetInfo(post_id);
  }

  public async postAll() {
    return await this.postRepository.getAllpost();
  }

  public async postRecommendation() {
    return await this.postRepository.recommendation();
  }

  public async postLike() {
    return await this.postRepository.postLike();
  }

  public async postRecency() {
    return await this.postRepository.postRecency();
  }
}
