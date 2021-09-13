import { closetResponseData } from 'src/closet/dto/closet.dto';
import { postRequestDto } from 'src/post/dto/post-req.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Picture } from '../picture/picture.entity';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async closet(user_id: number): Promise<closetResponseData> {
    return this.createQueryBuilder('post')
      .innerJoin('post.user_id', 'user')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.hanger', 'hanger')
      .select('user.nickname', 'nickname')
      .addSelect('post.title', 'title')
      .addSelect('post.picture', 'picture')
      .addSelect('hashtag.name', 'hashtag')
      .addSelect('hanger.user_id', 'hanger')
      .addSelect('post.createAt', 'createAt')
      .where('hanger.user_id = user_id', { user_id })
      .getMany() as closetResponseData;
  }

  async deletePost(post_id: number) {
    return this.createQueryBuilder('post')
      .delete()
      .from(Post)
      .where('post_id = post_id', { post_id })
      .execute();
  }

  async checkExistPost(post_id: number): Promise<boolean> {
    const post = await this.createQueryBuilder('post')
      .select('post.post_id')
      .where('post.post_id = post_id', { post_id })
      .getOne();
    if (post) {
      return true;
    }
    return false;
  }
}
