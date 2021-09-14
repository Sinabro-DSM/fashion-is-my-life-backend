import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async deleteComment(comment_id: number) {
    return this.createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment_id = comment_id', { comment_id })
      .execute();
  }
}
