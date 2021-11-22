import { MulterFileInterface } from 'src/config/multer.interface';
import { EntityRepository, Repository } from 'typeorm';
import { Picture } from './picture.entity';

@EntityRepository(Picture)
export class PictureRepository extends Repository<Picture> {
  async savePicture(file_path: MulterFileInterface, post_id: number) {
    let newPicture: Picture;

    const picture_path = file_path.location;

    newPicture = this.create({
      picture_id: post_id,
      picture_path: picture_path,
      post_id: post_id,
    });
    let picture = await this.save(newPicture);

    return picture;
  }
}
