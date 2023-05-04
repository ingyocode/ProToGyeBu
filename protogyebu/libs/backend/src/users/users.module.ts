import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersEntity } from "@protogyebu/models";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), ConfigModule],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule { }