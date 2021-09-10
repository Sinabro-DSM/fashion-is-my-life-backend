import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {
  async savePicture(file_path: string) {
    let newPicture: Picture;

    newPicture = this.create({
      picture_path: file_path,
    });
    let picture = await this.save(newPicture);

    return picture;
  }
}
