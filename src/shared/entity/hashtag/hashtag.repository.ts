import { EntityRepository, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';

@EntityRepository(Hashtag)
export class HashtagRepository extends Repository<Hashtag> {
  public async saveHashtag(request: { name: string; post_id: number }) {
    const { name, post_id } = request;
    const hashtag = new Hashtag();
    hashtag.name = name;
    hashtag.post_id = post_id;

    return await this.save(hashtag);
  }
}
