import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hanger } from 'src/shared/entity/hanger/hanger.entity';
import { HangerRepository } from 'src/shared/entity/hanger/hanger.repository';
import { User } from 'src/shared/entity/user/user.entity';

@Injectable()
export class HangerService {
  constructor(
    @InjectRepository(Hanger)
    private readonly hangerRepository: HangerRepository,
  ) {}

  public async getHanger(post_id: number) {
    const hangerCnt = await this.hangerRepository.getHanger(post_id);
    return hangerCnt.length;
  }

  public async postHanger(post_id: number, user: User) {
    const user_id = user.user_id;
    return await this.hangerRepository.postHanger(user_id, post_id);
  }

  public async deleteHanger(post_id: number, user: User) {
    const user_id = user.user_id;
    return await this.hangerRepository.deleteHanger(user_id, post_id);
  }
}
