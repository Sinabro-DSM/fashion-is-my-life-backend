import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileMulterOptions } from 'src/config/multer';
import { modifyProfileDto } from './dto/modifyProfile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @UseInterceptors(FileInterceptor('profile', ProfileMulterOptions))
  public async modifyProfile(
    @UploadedFile() profile: Express.Multer.File,
    @Body() modifyProfileDto: modifyProfileDto,
  ) {
    await this.userService.modifyProfile(profile.filename, modifyProfileDto);
    return { status: 200, message: 'success' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:user_id')
  public async userInfo(@Param('user_id') user_id: number) {
    return this.userService.userInfo(user_id);
  }
}
