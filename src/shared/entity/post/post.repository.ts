import { closetResponseData } from 'src/closet/dto/closet.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async closet(user_id: number): Promise<closetResponseData> {
    return this.createQueryBuilder('post')
      .innerJoin('post.user_id', 'user')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.hanger_exis', 'hanger')
      .select('user.nickname', 'nickname')
      .addSelect('post.title', 'title')
      .addSelect('post.picture', 'picture')
      .addSelect('hashtag.name', 'hashtag')
      .addSelect('hanger.user_id', 'hanger')
      .addSelect('post.createAt', 'createAt')
      .where('hanger.user_id = user_id', { user_id })
      .getMany() as closetResponseData;
  }
}
