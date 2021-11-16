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
}
