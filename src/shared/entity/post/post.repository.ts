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
      .addSelect('post.createdAt', 'createdAt')
      .where('hanger.user_id = :user_id', { user_id: user_id })
      .getMany() as closetResponseData;
  }

  async deletePost(post_id: number) {
    return this.createQueryBuilder('post')
      .delete()
      .from(Post)
      .where('post_id = :post_id', { post_id: post_id })
      .execute();
  }

  async checkExistPost(post_id: number): Promise<boolean> {
    const post = await this.createQueryBuilder('post')
      .select('post.post_id', 'post_id')
      .where('post.post_id = :post_id', { post_id: post_id })
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
      .addSelect('post.createdAt', 'createdAt')
      .from(Post, 'post')
      .orderBy('RANDOM()')
      .limit(15)
      .execute();
  }

  //좋아요순 게시물
  async postLike() {
    return this.createQueryBuilder('post')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .from(Post, 'post')
      .select('COUNT(*) AS hangerCount')
      .limit(15)
      .execute();
  }

  async getAllpost() {
    return this.createQueryBuilder('post')
      .innerJoin('post.hashtage', 'hashtag')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .from(Post, 'post')
      .getMany();
  }

  //최신순 게시물
  async postRecency() {
    return this.createQueryBuilder('post')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .from(Post, 'post')
      .orderBy('post.createdAt', 'DESC')
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
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .where('hashtag.name like %:name% OR user.nickname like %:nickname%', {
        name: searchWord,
        nickname: searchWord,
      })
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
      .addSelect('post.createdAt', 'createdAt')
      .where('post.post_id = :post_id', { post_id: post_id })
      .getOne();
  }

  async getClosetInfo(post_id: number) {
    return this.createQueryBuilder('post')
      .select('post.top_info', 'top_info')
      .addSelect('post.bottoms_info', 'bottoms_info')
      .addSelect('post.shoes_info', 'shoes_info')
      .where('post.post_id = :post_id', { post_id: post_id })
      .getOne();
  }
}
