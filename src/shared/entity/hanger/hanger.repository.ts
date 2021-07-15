import { EntityRepository, Repository } from 'typeorm';
import { Hanger } from './hanger.entity';

@EntityRepository(Hanger)
export class HangerRepository extends Repository<Hanger> {}
