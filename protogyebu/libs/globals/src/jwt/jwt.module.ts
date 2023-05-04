import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        JwtModule.registerAsync({
            useFactory: async (configSerivce: ConfigService) => ({
                secret: configSerivce.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class GlobalJwtModule { }