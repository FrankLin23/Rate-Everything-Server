import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes()
  async create(@Body() userData: CreateUserDto): Promise<any> {
    return await this.userService.createUser(userData);
  }

  @Get(':id')
  async findUserById(@Param() id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put()
  async updateUser() {}

  @Delete()
  async deleteUser() {}
}
