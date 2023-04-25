import { ApiPropertyOptional } from "@nestjs/swagger";
import { GetSportsQueryInterface } from "@protogyebu/backend";
import {IsDate, IsOptional} from 'class-validator'
export class GetSportsQueryDto implements GetSportsQueryInterface {
    @ApiPropertyOptional({
        description: 'YYYYMMDD 형식의 조회 시작 일. default로 오늘 시간'
    })
    @IsOptional()
    @IsDate()
    startDate?: Date;

    @ApiPropertyOptional({
        description: 'YYYYMMDD 형식의 조회 종료 일. default로 2일 뒤의 시간'
    })
    @IsOptional()
    @IsDate()
    endDate?: Date;
}