import { closetResponseData } from 'src/closet/dto/closet.dto';
import { postRequestData } from 'src/post/dto/post-req.dto';
import { EntityRepository, Repository } from 'typeorm';
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

  async createPost(
    dto: postRequestData,
    files_url: string[],
  ): Promise<postRequestData> {
    let newPost: Post;
    //  dto.picture = files_url;

    newPost = this.create({
      title: dto.title,
      picture: dto.picture,
      top_info: dto.topInfo,
      bottoms_info: dto.bottomInfo,
      shoes_info: dto.shoesInfo,
      content: dto.content,
      tags: dto.tags,
    });

    return await this.save(newPost);
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
