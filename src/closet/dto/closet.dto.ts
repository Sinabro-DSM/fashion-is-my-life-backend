import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class closetResponseData {
  @IsString()
  nickname?: string;

  @IsString()
  title?: string;

  @IsString()
  picture?: string;

  @IsArray()
  tags?: string[];

  @IsNumber()
  hanger?: number;

  @IsDate()
  createAt?: Date;
}
