import { Module } from "@nestjs/common";
import { DbService } from "./db.service";
import { GlobalTypeOrmModule } from '@protogyebu/globals'
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [ConfigModule, GlobalTypeOrmModule],
    providers: [DbService],
    exports: [DbService]
})
export class DbModule { }