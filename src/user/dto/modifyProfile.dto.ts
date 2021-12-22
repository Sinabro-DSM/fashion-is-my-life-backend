import { IsString } from 'class-validator';

export class modifyProfileDto {
  @IsString()
  user_id: string;

  @IsString()
  nickname: string;
}
