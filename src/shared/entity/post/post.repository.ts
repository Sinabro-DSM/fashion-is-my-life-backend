import { closetResponseData } from 'src/closet/dto/closet.dto';
import { getFeedTooColorDto } from 'src/post/dto/getFeedTooColor.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async closet(user_id: number): Promise<closetResponseData> {
    return this.createQueryBuilder('post')
      .select('user.nickname', 'nickname')
      .addSelect('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hashtag.name', 'name')
      .addSelect('hanger.user_id', 'user_id')
      .addSelect('post.r')
      .addSelect('post.g')
      .addSelect('post.b')
      .addSelect('post.createdAt')
      .innerJoin('post.user_id', 'user')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.picture', 'picture')
      .where('hanger.user_id = :user_id', { user_id })
      .getMany() as closetResponseData;
  }

  async getFeedTooColor(r: number, g: number, b: number) {
    return this.createQueryBuilder();
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

  async recommendation() {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .orderBy('RAND()')
      .getMany();
  }

  //좋아요순 게시물
  async postLike() {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .select('COUNT(*) AS hangerCount')
      .limit(15)
      .getMany();
  }

  async getPostList() {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('post.r', 'r')
      .addSelect('post.g', 'g')
      .addSelect('post.b', 'b')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .getMany();
  }

  //최신순 게시물
  async postRecency() {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .orderBy('post.createdAt', 'DESC')
      .limit(15)
      .getMany();
  }

  async search(searchWord: string) {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.hashtag', 'hashtag')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .where('hashtag.name like %:name% OR user.nickname like %:nickname%', {
        name: searchWord,
        nickname: searchWord,
      })
      .getMany();
  }

  async getPost(post_id: number) {
    return this.createQueryBuilder('post')
      .select('post.title', 'title')
      .addSelect('picture.picture_path', 'picture_path')
      .addSelect('hanger.post_id', 'post_id')
      .addSelect('post.content', 'content')
      .addSelect('hashtag.name', 'name')
      .addSelect('post.createdAt', 'createdAt')
      .innerJoin('post.picture', 'picture')
      .innerJoin('post.hanger', 'hanger')
      .innerJoin('post.hashtag', 'hashtag')
      .where('post.post_id = :post_id', { post_id: post_id })
      .getOne();
  }

  async getClosetInfo(post_id: number) {
    return this.createQueryBuilder('post')
      .select('post.top_info')
      .addSelect('post.bottoms_info')
      .addSelect('post.shoes_info')
      .where('post.post_id = :post_id', { post_id: post_id })
      .getOne();
  }
}
