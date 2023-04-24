import {Controller, Get} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {SportService} from "./sports.service";

@Controller('sports')
export class SportController {
  constructor(
    private readonly sportService:SportService
  ) {
  }
  @ApiOperation({summary:"테스트용 GET",description:"정상적으로 작동하는지 확인시켜줌"})
  @Get('')
  async getSportList() {
    return await this.sportService.getSports();
  }
}
