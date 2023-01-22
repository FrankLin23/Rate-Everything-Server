import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() userData: CreateUserDto): Promise<any> {
    return this.userService.createUser(userData);
  }

  @Get()
  async readUser() {}

  @Put()
  async updateUser() {}

  @Delete()
  async deleteUser() {}
}
