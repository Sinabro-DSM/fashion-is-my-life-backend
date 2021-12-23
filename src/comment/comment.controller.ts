import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { User } from 'src/shared/entity/user/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async getComment(@Param('post_id') post_id: number) {
    await this.commentService.getComment(post_id);
    return { status: 200, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createComment(
    @Param('post_id') post_id: number,
    @Body() comment: string,
    @Req() req: Request,
  ) {
    await this.commentService.createComment(req.user as User, post_id, comment);
    return { status: 201, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:comment_id')
  public async deleteComment(@Param('comment_id') comment_id: number) {
    await this.commentService.deleteComment(comment_id);
    return { status: 200, message: 'success' };
  }
}
