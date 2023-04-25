import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SportService, GetSportsQueryInterface } from '@protogyebu/backend';

@ApiTags('sports')
@Controller('sports')
export class SportController {
  constructor(private readonly sportService: SportService) { }
  @ApiOperation({ summary: 'SPORT 경기 정보 조회', description: '기간 내의 스포츠 정보 조회' })
  @Get()
  async getSportList(@Query() query: GetSportsQueryInterface) {
    return await this.sportService.getSports(query);
  }
}
