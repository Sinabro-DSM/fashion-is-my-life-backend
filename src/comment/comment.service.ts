import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entity/comment/comment.entity';
import { CommentRepository } from 'src/shared/entity/comment/comment.repository';
import { User } from 'src/shared/entity/user/user.entity';
import {
  notFoundCommentException,
  notMatchUserAuthorizedException,
} from 'src/shared/exception/exception.index';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
  ) {}

  public async getComments(post_id: number) {
    return await this.commentRepository.getComments(post_id);
  }

  public async createComment(user: User, post_id: number, comment: string) {
    return await this.commentRepository.createComment(
      user.user_id,
      post_id,
      comment,
    );
  }

  public async deleteComment(user: User, comment_id: number) {
    if (await this.commentRepository.checkAuthority(user.user_id)) {
      throw notMatchUserAuthorizedException;
    } else if (await this.commentRepository.checkExistComment(comment_id)) {
      throw notFoundCommentException;
    }
    return await this.commentRepository.deleteComment(comment_id);
  }
}
