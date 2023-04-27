import { Module } from "@nestjs/common";
import { BettingsService } from "./bettings.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BettingsEntity } from "@protogyebu/models";
import { SportModule } from "../sports";

@Module({
    imports: [TypeOrmModule.forFeature([BettingsEntity]), SportModule],
    providers: [BettingsService],
    exports: [BettingsService]
})
export class BettingsModule { }