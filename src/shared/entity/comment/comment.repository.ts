import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async getComment(post_id: number) {
    return this.createQueryBuilder('comment')
      .select('user.user_id')
      .addSelect('user.profile_path')
      .addSelect('comment.comment')
      .innerJoin('comment.user_id', 'user')
      .where('post_id = :post_id', { post_id: post_id })
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
}
