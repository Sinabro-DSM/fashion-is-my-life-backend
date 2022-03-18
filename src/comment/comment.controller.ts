import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  public async getComments(@Param('post_id') post_id: number) {
    return await this.commentService.getComments(post_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createComment(
    @Param('post_id', ParseIntPipe) post_id: number,
    @Body() comment: string,
    @Req() req: Request,
  ) {
    await this.commentService.createComment(req.user as User, post_id, comment);
    return { status: 201, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:comment_id')
  public async deleteComment(
    @Param('comment_id', ParseIntPipe) comment_id: number,
    @Req() req: Request,
  ) {
    await this.commentService.deleteComment(req.user as User, comment_id);
    return { status: 200, message: 'success' };
  }
}
