import { GamesInterface } from "@protogyebu/models";

export class PostBettingsDto {
    bettingAmount: number;
    resultAmount: number;
    games: GamesInterface[]
}