import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(6, 20)
  password: string;
}
