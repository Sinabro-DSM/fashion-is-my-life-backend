import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClosetService } from './closet.service';
import { closetResponseData } from './dto/closet.dto';

@Controller('closet')
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:user_id')
  public async closet(
    @Param('user_id') user_id: number,
  ): Promise<closetResponseData> {
    return await this.closetService.closet(user_id);
  }
}
