import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
