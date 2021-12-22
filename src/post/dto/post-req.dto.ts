import { IsArray, IsNumber, IsString } from 'class-validator';

export class postRequestDto {
  @IsString()
  title: string;

  @IsString()
  topInfo?: string;

  @IsString()
  bottomInfo?: string;

  @IsString()
  shoesInfo?: string;

  @IsString()
  content?: string;

  @IsArray()
  tags?: string[];

  @IsNumber()
  r?: number;

  @IsNumber()
  g?: number;

  @IsNumber()
  b?: number;
}
