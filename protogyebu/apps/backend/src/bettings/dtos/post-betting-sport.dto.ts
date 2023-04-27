import { ApiProperty } from "@nestjs/swagger";
import { CreateSportsInterface } from "@protogyebu/backend";
import { BettingType } from "@protogyebu/models";

export class PostBettingSportsDto implements CreateSportsInterface {
    @ApiProperty({
        description: 'sport 경기의 ID값'
    })
    sportsId: string;

    @ApiProperty({
        description: '배팅 타입',
        enum: BettingType
    })
    bettingType: BettingType;

    @ApiProperty({
        description: '기준점'
    })
    bettingScore: number;

}