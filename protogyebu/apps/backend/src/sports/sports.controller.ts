import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetSportsResponseInterface, JwtAuthGuard, SportService } from '@protogyebu/backend';
import { GetSportsQueryDto } from './dtos/get-sports-query.dto';

@ApiTags('sports')
@Controller('sports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('token')
export class SportController {
  constructor(private readonly sportService: SportService) { }

  @ApiOperation({ summary: 'SPORT 경기 정보 조회', description: '기간 내의 스포츠 정보 조회' })
  @Get()
  async getSportList(@Query() query: GetSportsQueryDto): Promise<GetSportsResponseInterface[]> {
    const sports: GetSportsResponseInterface[] = await this.sportService.getSports(query);
    return sports;
  }
}
