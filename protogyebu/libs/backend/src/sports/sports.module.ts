import { Module } from '@nestjs/common';
import { SportService } from "./sports.service";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportsEntity } from '@protogyebu/models';

@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([SportsEntity])],
  providers: [SportService],
  exports: [SportService]
})
export class SportModule { }
