import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { descryptPassword } from 'src/common/encrypt';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
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

  @Post('/login')
  @UsePipes()
  async login(@Body() userData: UserLoginDto): Promise<string> {
    if (!userData.username && !userData.email) {
      throw new HttpException(
        { message: 'username or email cannot be null' },
        HttpStatus.BAD_REQUEST,
      );
    }
    let user: User;
    if (userData.username) {
      user = await this.userService.findUserByUsername(userData.username);
    } else {
      user = await this.userService.findUserByEmail(userData.email);
    }
    if (!user) {
      throw new HttpException(
        { message: 'The user is not registered' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (descryptPassword(userData.password, user.password)) {
      return this.authService.createToken(user);
    } else {
      throw new HttpException({ message: '' }, HttpStatus.BAD_REQUEST);
    }
  }
}
