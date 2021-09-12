import { Controller, Delete, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Delete(':commentId')
  public async deleteComment(@Param('comment_id') comment_id: number) {
    await this.commentService.deleteComment(comment_id);
    return { status: 200, message: 'success' };
  }
}
