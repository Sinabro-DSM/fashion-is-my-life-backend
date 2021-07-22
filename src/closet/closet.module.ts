import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';

@Module({
  providers: [ClosetService],
  controllers: [ClosetController]
})
export class ClosetModule {}
