import { Module } from "@nestjs/common";
import { BettingsController } from "./bettings.controller";
import { BettingsModule } from "@protogyebu/backend";

@Module({
    imports: [BettingsModule],
    controllers: [BettingsController]
})
export class BettingsControllerModule { }