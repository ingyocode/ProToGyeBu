import { Module } from "@nestjs/common";
import { SportController } from "./sports/sports.controller";
import { SportModule } from "./sports/sports.module";

@Module({
  imports: [SportModule],
  controllers: [SportController]
})
export class AppModule {}
