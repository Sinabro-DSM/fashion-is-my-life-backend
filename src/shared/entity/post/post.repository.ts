import { closetResponseData } from 'src/closet/dto/closet.dto';
import { getFeedTooColorDto } from 'src/post/dto/getFeedTooColor.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async closet(user_id: number): Promise<closetResponseData> {
    return this.createQueryBuilder('post')
      .select('user.nickname')
      .addSelect('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hashtag.name')
      .addSelect('hanger.user_id')
      .addSelect('post.r')
      .addSelect('post.g')
      .addSelect('post.b')
      .addSelect('post.created_at')
      .innerJoin('post.user_id', 'user')
      .innerJoin('post.hashTags', 'hashtag')
      .innerJoin('post.hangers', 'hanger')
      .innerJoin('post.pictures', 'picture')
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
      .where('post_id = :post_id', { post_id })
      .execute();
  }

  async checkExistPost(post_id: number): Promise<boolean> {
    const post = await this.createQueryBuilder('post')
      .select('post.post_id')
      .where('post.post_id = :post_id', { post_id })
      .getOne();
    if (post) {
      return true;
    }
    return false;
  }

  async recommendation() {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hanger.post_id')
      .addSelect('post.content')
      .addSelect('hashtag.name')
      .addSelect('post.created_at')
      .innerJoin('post.pictures', 'picture')
      .innerJoin('post.hangers', 'hanger')
      .innerJoin('post.hashTags', 'hashtag')
      .orderBy('RAND()')
      .getMany();
  }

  //좋아요순 게시물
  async postLike() {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hanger.post_id')
      .addSelect('post.content')
      .addSelect('hashtag.name')
      .addSelect('post.created_at')
      .innerJoin('post.pictures', 'picture')
      .innerJoin('post.hangers', 'hanger')
      .innerJoin('post.hashTags', 'hashtag')
      .select('COUNT(*) AS hangerCount')
      .limit(15)
      .getMany();
  }

  async getPostList() {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hangers.post_id')
      .addSelect('post.content')
      .addSelect('post.r')
      .addSelect('post.g')
      .addSelect('post.b')
      .addSelect('hashtag.name')
      .addSelect('post.created_at')
      .innerJoin('post.hashTags', 'hashtag')
      .innerJoin('post.pictures', 'picture')
      .innerJoin('post.hangers', 'hanger')
      .getMany();
  }

  //최신순 게시물
  async postRecency() {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hanger.post_id')
      .addSelect('post.content')
      .addSelect('hashtag.name')
      .addSelect('post.created_at')
      .innerJoin('post.pictures', 'picture')
      .innerJoin('post.hangers', 'hanger')
      .innerJoin('post.hashTags', 'hashtag')
      .orderBy('post.created_at', 'DESC')
      .limit(15)
      .getMany();
  }

  async search(searchWord: string) {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('picture.picture_path')
      .addSelect('hanger.post_id')
      .addSelect('post.content')
      .addSelect('hashtag.name')
      .addSelect('post.created_at')
      .innerJoin('post.hashtags', 'hashtag')
      .innerJoin('post.pictures', 'picture')
      .innerJoin('post.hangers', 'hanger')
      .innerJoin('post.hashTags', 'hashtag')
      .where('hashtag.name like %:name% OR user.nickname like %:nickname%', {
        name: searchWord,
        nickname: searchWord,
      })
      .getMany();
  }

  async getPost(post_id: number) {
    return this.createQueryBuilder('post')
      .select('post.title')
      .addSelect('post.content')
      .addSelect('post.created_at')
      .addSelect('hashtag.name')
      .addSelect('hanger.post_id')
      .addSelect('picture.picture_path')
      .leftJoin('post.hangers', 'hanger')
      .leftJoin('post.pictures', 'picture')
      .leftJoin('post.hashTags', 'hashtag')
      .where('post.post_id = :post_id', { post_id })
      .getOne();
  }

  async getClosetInfo(post_id: number) {
    return this.createQueryBuilder('post')
      .select('post.top_info')
      .addSelect('post.bottoms_info')
      .addSelect('post.shoes_info')
      .where('post.post_id = :post_id', { post_id })
      .getOne();
  }
}
