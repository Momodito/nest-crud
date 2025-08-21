import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin/admin.controller';
import { UploadModule } from './upload/upload.module';
import { TrackingService } from './tracking/tracking.service';
import { TrackingController } from './tracking/tracking.controller';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [UsersModule, AuthModule, UploadModule, TrackingModule],
  controllers: [AppController, AdminController, TrackingController],
  providers: [AppService, TrackingService],
})
export class AppModule {}
