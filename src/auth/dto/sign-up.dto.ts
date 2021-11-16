import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(2, 8)
  readonly nickname: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
