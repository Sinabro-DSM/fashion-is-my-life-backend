import { Module } from '@nestjs/common';
import { ClosetService } from './closet.service';
import { ClosetController } from './closet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/shared/entity/post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [ClosetService],
  controllers: [ClosetController],
})
export class ClosetModule {}
