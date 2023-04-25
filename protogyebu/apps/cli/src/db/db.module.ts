import { Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from '@protogyebu/models'
@Module({
    imports: [ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('TYPEORM_HOST'),
                port: configService.get<number>('TYPEORM_PORT'),
                database: configService.get<string>('TYPEORM_DATABASE'),
                username: configService.get<string>('TYPEORM_USERNAME'),
                password: configService.get<string>('TYPEORM_PASSWORD'),
                namingStrategy: new SnakeNamingStrategy(),
            }),
            inject: [ConfigService],
        }),],
    providers: [DbService],
    exports: [DbService]
})
export class DbModule { }