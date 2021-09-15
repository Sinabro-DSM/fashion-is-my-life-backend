import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async getComment(@Param('post_id') post_id: number) {
    await this.commentService.getComment(post_id);
    return { status: 200, message: 'success' };
  }

  @Post()
  public async createComment(
    @Param('post_id') post_id: number,
    @Body() comment: string,
  ) {
    await this.commentService.createComment(post_id, comment);
    return { status: 201, message: 'success' };
  }

  @Delete(':commentId')
  public async deleteComment(@Param('comment_id') comment_id: number) {
    await this.commentService.deleteComment(comment_id);
    return { status: 200, message: 'success' };
  }
}
