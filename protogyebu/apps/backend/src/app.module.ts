import { Module } from '@nestjs/common';
import { SportController } from './sports/sports.controller';
import { SportControllerModule } from './sports/sports.controller.module';
import { AuthModule, SportModule, UsersModule } from '@protogyebu/backend';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersControllerModule } from './users/users.controller.module';
import { AuthControllerModule } from './auth/auth.controller.module';
import { GlobalJwtModule, GlobalTypeOrmModule } from '@protogyebu/globals'
@Module({
  imports: [
    ConfigModule,
    GlobalJwtModule,
    GlobalTypeOrmModule,
    SportModule,
    UsersModule,
    AuthModule,

    UsersControllerModule,
    SportControllerModule,
    AuthControllerModule
  ],
  controllers: [SportController],
})
export class AppModule { }
