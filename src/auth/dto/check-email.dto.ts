import { IsEmail, Length } from 'class-validator';

export class checkEmailDto {
  @IsEmail()
  @Length(5, 50)
  email: string;
}
