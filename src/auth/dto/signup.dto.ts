import { IsEmail, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(2, 20)
  readonly nickname: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
