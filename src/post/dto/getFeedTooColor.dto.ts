import { IsNumber } from 'class-validator';

export class getFeedTooColorDto {
  @IsNumber()
  r: number;

  @IsNumber()
  g: number;

  @IsNumber()
  b: number;
}
