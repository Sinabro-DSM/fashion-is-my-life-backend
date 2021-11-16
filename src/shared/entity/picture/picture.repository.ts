import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {
  async savePicture(file_path: string, post_id: number) {
    let newPicture: Picture;

    newPicture = this.create({
      post_id: post_id,
      picture_path: file_path,
    });
    let picture = await this.save(newPicture);

    return picture;
  }
}
