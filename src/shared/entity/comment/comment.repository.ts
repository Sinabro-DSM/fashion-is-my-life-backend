import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async getComments(post_id: number) {
    return this.createQueryBuilder('comment')
      .select('user.user_id')
      .addSelect('user.profile_path')
      .addSelect('comment.comment')
      .innerJoin('comment.user_id', 'user')
      .where('post_id = :post_id', { post_id })
      .getMany();
  }

  async createComment(user_id: number, post_id: number, comment: string) {
    let newComment: Comment;

    newComment = this.create({
      user_id: user_id,
      post_id: post_id,
      comment: comment,
    });

    return await this.save(newComment);
  }

  async deleteComment(comment_id: number) {
    return this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment.comment_id = :comment_id', { comment_id })
      .execute();
  }

  async checkExistComment(comment_id: number): Promise<boolean> {
    const comment = await this.createQueryBuilder('comment')
      .select('comment.comment_id')
      .where('comment.comment_id = :comment_id', { comment_id })
      .getOne();
    if (comment) {
      return true;
    }
    return false;
  }

  async checkAuthority(user_id: number): Promise<boolean> {
    const checkAuthority = await this.createQueryBuilder('comment')
      .select('comment.commect_id')
      .where('comment.user_id = :user_id', { user_id })
      .getOne();
    if (checkAuthority) {
      return true;
    }
    return false;
  }
}
