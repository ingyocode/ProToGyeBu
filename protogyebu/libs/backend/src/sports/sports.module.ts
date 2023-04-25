import { Module } from '@nestjs/common';
import {SportService} from "./sports.service";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers:[SportService],
  exports: [SportService]
})
export class SportModule {}
