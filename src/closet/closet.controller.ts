import { Controller, Get, Param } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { closetResponseData } from './dto/closet.dto';

@Controller('closet')
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  @Get('/:userId')
  public async closet(
    @Param('user_id') user_id: number,
  ): Promise<closetResponseData> {
    return await this.closetService.closet(user_id);
  }
}
