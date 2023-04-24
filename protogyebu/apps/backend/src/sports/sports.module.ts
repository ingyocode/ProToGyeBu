import { Module } from '@nestjs/common';
import {SportController} from "./sports.controller";
import {SportService} from "./sports.service";
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  providers:[SportService, ConfigService],
  controllers:[SportController]
})
export class SportModule {}
