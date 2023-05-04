import { Module } from '@nestjs/common';
import { SportController } from './sports.controller';
import { SportModule } from '@protogyebu/backend';

@Module({
  imports: [SportModule],
  controllers: [SportController],
})
export class SportControllerModule { }
