import { Module } from '@nestjs/common';
import { SportController } from './sports/sports.controller';
import { SportControllerModule } from './sports/sports.controller.module';
import { SportModule } from '@protogyebu/backend';

@Module({
  imports: [SportModule, SportControllerModule],
  controllers: [SportController],
})
export class AppModule { }
