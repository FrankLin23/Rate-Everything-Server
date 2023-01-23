import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { UserRO } from './interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<UserRO> {
    const user = await this.findUserByUsername(data.username);
    if (user) {
      const errors = 'Username and email must be unique.';
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const res = await this.prisma.user.create({
      data,
    });
    return this.buildUserRO(res);
  }

  async findUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  private buildUserRO(user: User): UserRO {
    const userRO: UserRO = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return userRO;
  }
}
