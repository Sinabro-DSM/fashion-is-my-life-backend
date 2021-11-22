import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {
  async savePicture(file_path: string, post_id: number) {
    let newPicture: Picture;

    newPicture = this.create({
      picture_id: post_id,
      picture_path: file_path,
      post_id: post_id,
    });
    let picture = await this.save(newPicture);

    return picture;
  }
}
