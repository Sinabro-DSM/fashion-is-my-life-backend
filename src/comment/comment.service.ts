import { Injectable } from '@nestjs/common';
<<<<<<< Updated upstream

@Injectable()
export class CommentService {}
=======
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entity/comment/comment.entity';
import { CommentRepository } from 'src/shared/entity/comment/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
  ) {}

  public async deleteComment(comment_id: number) {
    return await this.commentRepository.deleteComment(comment_id);
  }
}
>>>>>>> Stashed changes
