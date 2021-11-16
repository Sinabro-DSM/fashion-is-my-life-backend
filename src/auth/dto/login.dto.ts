import { IsEmail, IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
