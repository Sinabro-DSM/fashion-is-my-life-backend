import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/shared/entity/post/post.entity';
import { PostRepository } from 'src/shared/entity/post/post.repository';
import { NotFoundUserIdError } from 'src/shared/exception/exception.index';
import { closetResponseData } from './dto/closet.dto';

@Injectable()
export class ClosetService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
  ) {}

  public async closet(user_id: number): Promise<closetResponseData> {
    if (!(await this.postRepository.findOne({ user_id: user_id }))) {
      throw NotFoundUserIdError;
    }
    const myCloset = await this.postRepository.closet(user_id);
    return myCloset;
  }
}
