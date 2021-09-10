import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {}
