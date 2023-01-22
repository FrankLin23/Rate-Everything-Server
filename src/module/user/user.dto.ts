import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'abcdef', description: 'Username' })
  username: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  password: string;

  @ApiProperty({ example: '123@qq.com', description: 'Email' })
  email: string;
}
