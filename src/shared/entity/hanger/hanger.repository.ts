import { deleteHangerRequestDto } from 'src/post/dto/delete-hanger.dto';
import { postHangerRequestDto } from 'src/post/dto/post-hanger.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Hanger } from './hanger.entity';

@EntityRepository(Hanger)
export class HangerRepository extends Repository<Hanger> {
  async getHanger(post_id: number) {
    return this.createQueryBuilder('hanger')
      .select()
      .where('hanger.post_id = :post_id', { post_id: post_id })
      .getMany();
  }

  async postHanger(user_id: number, post_id: number) {
    return this.createQueryBuilder('hanger')
      .insert()
      .into(Hanger)
      .values([{ user_id: user_id, post_id: post_id }])
      .execute();
  }

  async deleteHanger(user_id: number, post_id: number) {
    return this.createQueryBuilder('hanger')
      .delete()
      .from(Hanger)
      .where('hanger.user_id = :user_id AND hanger.post_id = :post_id', {
        user_id: user_id,
        post_id: post_id,
      })
      .execute();
  }
}
