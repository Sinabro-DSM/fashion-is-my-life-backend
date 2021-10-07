import { Body, Controller, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Public } from './skip-auth.decorator';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { checkEmailDto } from './dto/check-email.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);

    const {
      refreshToken,
      ...refreshOption
    } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    res.cookie('Authentication', accessToken, accessOption);
    res.cookie('Refresh', refreshToken, refreshOption);

    return user;
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const {
      accessToken,
      ...accessOption
    } = this.authService.getCookieWithJwtAccessToken(user.id);
    res.cookie('Authentication', accessToken, accessOption);
    return user;
  }
}

