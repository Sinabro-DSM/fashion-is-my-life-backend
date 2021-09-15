import { closetResponseData } from 'src/closet/dto/closet.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async closet(user_id: number): Promise<closetResponseData> {
    return this.createQueryBuilder('post')
      .innerJoin('post.user_id', 'user')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.picture', 'picture')
      .select('user.nickname', 'nickname')
      .addSelect('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hashtag.name', 'name')
      .addSelect('hanger.user_id', 'user_id')
      .addSelect('post.createAt', 'createAt')
      .where('hanger.user_id = :user_id', { user_id })
      .getMany() as closetResponseData;
  }

  async deletePost(post_id: number) {
    return this.createQueryBuilder('post')
      .delete()
      .from(Post)
      .where('post_id = :post_id', { post_id })
      .execute();
  }

  async checkExistPost(post_id: number): Promise<boolean> {
    const post = await this.createQueryBuilder('post')
      .select('post.post_id', 'post_id')
      .where('post.post_id = :post_id', { post_id })
      .getOne();
    if (post) {
      return true;
    }
    return false;
  }

  async postRecommendation() {
    return this.createQueryBuilder('post')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createAt')
      .from(Post, 'post')
      .orderBy('RANDOM()')
      .limit(15)
      .execute();
  }

  async search(searchWord: string) {
    return this.createQueryBuilder('post')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createAt', 'createAt')
      .where('hashtag.name like %:name%', { name: searchWord })
      .getMany();
  }

  async getPost(post_id: number) {
    return this.createQueryBuilder('post')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createAt', 'createAt')
      .getOne();
  }
}
