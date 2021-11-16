import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { checkEmailDto } from './dto/check-email.dto';
import { UserService } from 'src/user/user.service';
import { LoginRequestDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/signup')
  public async signUp(@Body() user: SignUpDto) {
    await this.authService.signUp(user);
    return { status: 200, message: 'success' };
  }

  @Post('/email')
  public async emailAuthentication(@Body() body: checkEmailDto) {
    return await this.authService.sendMail(body.email);
  }

  @Post('/login')
  public async login(@Body() dto: LoginRequestDto) {
    return await this.authService.jwtLogin(dto);
  }
}
