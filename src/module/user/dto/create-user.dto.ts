import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'abcdef', description: 'Username' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  @Length(6, 20)
  password: string;

  @ApiProperty({ example: '123@qq.com', description: 'Email' })
  @IsEmail()
  email: string;
}
