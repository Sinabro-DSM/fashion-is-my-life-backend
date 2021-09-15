import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entity/comment/comment.entity';
import { CommentRepository } from 'src/shared/entity/comment/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
  ) {}

  public async getComment(post_id: number) {
    return await this.commentRepository.getComment(post_id);
  }

  public async createComment(post_id: number, comment: string) {
    return await this.commentRepository.createComment(post_id, comment);
  }

  public async deleteComment(comment_id: number) {
    return await this.commentRepository.deleteComment(comment_id);
  }
}
