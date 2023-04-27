import { ApiProperty } from "@nestjs/swagger";
import { PostBettingSportsDto } from "./post-betting-sport.dto";

export class PostBettingsDto {
    @ApiProperty({
        description: '배팅 금액'
    })
    bettingAmount: number;

    @ApiProperty({
        description: '배당'
    })
    drainage: number;

    @ApiProperty({
        description: 'Sport 선택',
        type: PostBettingSportsDto
    })
    games: PostBettingSportsDto[]
}