import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async getComment(post_id: number) {
    return this.createQueryBuilder('comment')
      .innerJoin('comment.user_id', 'user')
      .select('user.user_id', 'user_id')
      .addSelect('user.profile_path', 'profile_path')
      .addSelect('comment.comment', 'comment')
      .where('post_id = :post_id', { post_id })
      .getMany();
  }

  async deleteComment(comment_id: number) {
    return this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment_id = :comment_id', { comment_id })
      .execute();
  }
}
