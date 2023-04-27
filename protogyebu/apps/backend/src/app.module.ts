import { Module } from '@nestjs/common';
import { SportControllerModule } from './sports/sports.controller.module';
import { AuthModule, JwtAuthGuard, JwtStrategy, SportModule, UsersModule } from '@protogyebu/backend';
import { ConfigModule } from '@nestjs/config';
import { UsersControllerModule } from './users/users.controller.module';
import { AuthControllerModule } from './auth/auth.controller.module';
import { GlobalJwtModule, GlobalTypeOrmModule } from '@protogyebu/globals'
import { BettingsControllerModule } from './bettings/bettings.controller.module';
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
    AuthControllerModule,
    BettingsControllerModule
  ],
  providers: [JwtStrategy]
})
export class AppModule { }
