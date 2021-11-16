import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { checkEmailDto } from './dto/check-email.dto';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  public async signUp(@Body() user: SignUpDto) {
    await this.authService.signUp(user);
    return { status: 201, message: 'success' };
  }

  @Post('/email')
  public async emailAuthentication(@Body() body: checkEmailDto) {
    return await this.authService.sendMail(body.email);
  }

  @Post('/login')
  public async logIn(@Body() dto: LoginRequestDto) {
    return await this.authService.jwtLogIn(dto);
  }
}
