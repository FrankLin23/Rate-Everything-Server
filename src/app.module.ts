import { Module } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { UploadModule } from './module/upload/upload.module';

@Module({
  imports: [UserModule, AuthModule, UploadModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
