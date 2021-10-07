import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { User } from 'src/shared/entity/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    findAll(): Promise<User[]> {
      return this.userRepository.find();
    }
  
    findOne(id: string): Promise<User> {
      return this.userRepository.findOne(id);
    }
  
    async remove(id: string): Promise<void> {
      await this.userRepository.delete(id);
    }
  
    async create(user: User): Promise<User> {
      await this.userRepository.save(user);
      return user;
    }
  
    async getByEmail(email: string) {
      const user = this.userRepository.findOne({ email });
      if (user) {
        return user;
      }
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  
    async getById(user_id: number){
      const user = await this.userRepository.findOne({ user_id });
      if (user) {
        return user;
      }

      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  
    async setCurrentRefreshToken(refreshToken: string, user_id: number) {
      const currentHashedRefreshToken = await hash(refreshToken, 10);
      await this.userRepository.update(user_id, { currentHashedRefreshToken });
    }
  
    async getUserIfRefreshTokenMatches(refreshToken: string, id: number) {
      const user = await this.getById(id);
  
      const isRefreshTokenMatching = await compare(
        refreshToken,
        user.currentHashedRefreshToken,
      );
  
      if (isRefreshTokenMatching) {
        return user;
      }
    }
}
