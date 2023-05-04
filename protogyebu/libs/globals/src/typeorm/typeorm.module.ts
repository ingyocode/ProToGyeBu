import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SnakeNamingStrategy } from '../../../models';
import { entities } from './typeorm.entity';

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
                entities: [...entities],
                namingStrategy: new SnakeNamingStrategy(),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class GlobalTypeOrmModule { }