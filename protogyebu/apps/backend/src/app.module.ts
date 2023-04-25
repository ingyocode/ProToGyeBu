import { Module } from '@nestjs/common';
import { SportController } from './sports/sports.controller';
import { SportControllerModule } from './sports/sports.controller.module';
import { SportModule, UsersModule } from '@protogyebu/backend';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersControllerModule } from './users/users.controller.module';
import { SnakeNamingStrategy, UsersEntity } from '@protogyebu/models';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.get<number>('TYPEORM_PORT'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        entities: [UsersEntity],
        namingStrategy: new SnakeNamingStrategy(),
      }),
      inject: [ConfigService],
    }),
    SportModule,
    UsersModule,

    UsersControllerModule,
    SportControllerModule,
  ],
  controllers: [SportController],
})
export class AppModule { }
