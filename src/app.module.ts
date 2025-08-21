import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin/admin.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UsersModule, AuthModule, UploadModule],
  controllers: [AppController, AdminController],
  providers: [AppService],
})
export class AppModule {}
