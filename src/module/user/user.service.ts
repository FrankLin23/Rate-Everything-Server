import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { encryptPassword } from 'src/common/encrypt';
import { PrismaService } from 'src/common/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserRO> {
    const user = await this.findUserByUsername(data.username);
    if (user) {
      const errors = 'Username and must be unique.';
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _user = await this.findUserByEmail(data.email);
    if (_user) {
      const errors = 'Email and must be unique.';
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = data;
    newUser.password = await encryptPassword(data.password);
    const res = await this.prisma.user.create({
      data: newUser,
    });
    return this.buildUserRO(res);
  }

  async findUserById(id: string): Promise<UserRO> {
    let user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) return null;
    return this.buildUserRO(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  private buildUserRO(user: User): UserRO {
    const userRO: UserRO = {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      avatar: user.avatar,
    };
    return userRO;
  }
}
