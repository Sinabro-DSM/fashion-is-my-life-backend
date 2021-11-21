import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import {
  ExistEmailException,
  ExistNicknameException,
  ExistUserException,
  notConfirmPasswordException,
  notFoundUserException,
} from 'src/shared/exception/exception.index';
import { LoginRequestDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  public async signUp(user: SignUpDto): Promise<User> {
    if (await this.userRepository.findOne({ email: user.email })) {
      throw ExistEmailException;
    } else if (await this.userRepository.findOne({ email: user.nickname })) {
      throw ExistNicknameException;
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

  public async jwtLogIn(dto: LoginRequestDto) {
    const { email, password } = dto;

    const user: User = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw notFoundUserException;
    }

    const confirmPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!confirmPassword) {
      throw notConfirmPasswordException;
    }

    const payload = { email: email, sub: user.user_id };

    return {
      token: this.jwtService.sign(payload),
      userId: user.user_id,
    };
  }
}
