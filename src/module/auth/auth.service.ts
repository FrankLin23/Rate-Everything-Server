import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { TokenVerifyProps } from 'src/types/auth';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createToken(user: User): Promise<string> {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): TokenVerifyProps {
    return this.jwtService.verify(token.slice(7));
  }
}
