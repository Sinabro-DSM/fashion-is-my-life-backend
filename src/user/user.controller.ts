import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileMulterOptions } from 'src/config/multer';
import { modifyProfileDto } from './dto/modifyProfile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseInterceptors(FileInterceptor('profile', ProfileMulterOptions))
  public async modifyProfile(
    @UploadedFile() profile: Express.Multer.File,
    @Body() modifyProfileDto: modifyProfileDto,
  ) {
    await this.userService.modifyProfile(profile.filename, modifyProfileDto);
    return { status: 200, message: 'success' };
  }
}
