import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';
import { descryptPassword } from 'src/common/encrypt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRO } from './interface';
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
  @ApiOperation({ summary: 'Create User' })
  async create(@Body() userData: CreateUserDto): Promise<any> {
    return await this.userService.createUser(userData);
  }

  @Get()
  @ApiOperation({ summary: 'Get User By Id' })
  @UseGuards(JwtAuthGuard)
  async findUserById(@Query('id') id?: string): Promise<UserRO> {
    return this.userService.findUserById(id);
  }

  @Get('/profile')
  @ApiOperation({ summary: 'Get Current User Info' })
  @UseGuards(JwtAuthGuard)
  async findCurrentUser(@Req() request: Request) {
    const token = request.headers.authorization;
    const verify = this.authService.verifyToken(token);
    return this.userService.findUserById(verify.sub);
  }

  @Put()
  async updateUser() {}

  @Delete()
  async deleteUser() {}

  @Post('/login')
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
