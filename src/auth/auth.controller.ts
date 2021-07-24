import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/shared/entity/user/user.entity';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(@Body() user: SignUpDto) {
    await this.authService.signUp(user);
    return { status: 200, message: 'success' };
  }
}
