import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  ExistEmailException,
  ExistUserException,
} from 'src/shared/exception/exception.index';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private mailerService: MailerService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(user: SignUpDto): Promise<User> {
    if (await this.userRepository.findOne({ email: user.email })) {
      throw ExistEmailException;
    }
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;

    return await this.userRepository.signUp(user);
  }

  public async sendMail(email: string) {
    const existUser: User = await this.userRepository.findOne({
      where: { email },
    });
    if (existUser) {
      throw ExistUserException;
    }
    try {
      const authNumber: number = Math.floor(Math.random() * 1000000);
      await this.mailerService.sendMail({
        to: email,
        from: process.env.GMAIL_USER,
        subject: '이메일 인증 요청 메일입니다.',
        html: '6자리 인증 코드 : ' + `<b> ${authNumber}</b>`,
      });
      return authNumber;
    } catch (err) {
      console.log(err);
    }
  }

  async vaildateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  getCookieWithJwtAccessToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }

  getCookieWithJwtRefreshToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) *
        1000,
    };
  }


}
