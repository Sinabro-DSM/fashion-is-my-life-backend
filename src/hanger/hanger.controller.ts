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
import { User } from 'src/shared/entity/user/user.entity';
import { Request } from 'express';
import { HangerService } from './hanger.service';

@Controller('hanger')
export class HangerController {
  constructor(private readonly hangerService: HangerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async postHanger(@Body() post_id: number, @Req() req: Request) {
    await this.hangerService.postHanger(post_id, req.user as User);
    return { status: 201, message: 'succes' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  public async deleteHanger(@Body() post_id: number, @Req() req: Request) {
    await this.hangerService.deleteHanger(post_id, req.user as User);
    return { status: 200, message: 'succes' };
  }

  @Get('/:post_id')
  public async getHanger(@Param('post_id', ParseIntPipe) post_id: number) {
    return await this.hangerService.getHanger(post_id);
  }
}
