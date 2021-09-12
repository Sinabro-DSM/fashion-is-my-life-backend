import { Module } from '@nestjs/common';
<<<<<<< Updated upstream
=======
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from 'src/shared/entity/comment/comment.repository';
>>>>>>> Stashed changes
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
<<<<<<< Updated upstream
  controllers: [CommentController],
  providers: [CommentService]
=======
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
>>>>>>> Stashed changes
})
export class CommentModule {}
