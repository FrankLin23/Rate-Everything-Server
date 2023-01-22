import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    return this.userService.createUser(userData);
  }
}
