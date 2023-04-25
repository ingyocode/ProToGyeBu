import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {SportController} from "./sports.controller";
import compression from 'compression';
import {SportModule} from '@protogyebu/backend'

@Module({
  imports: [SportModule],
  controllers:[SportController],
})
export class SportControllerModule {}
