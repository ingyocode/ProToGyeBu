import { GamesInterface } from "@protogyebu/models";

export interface CreateBettingInterface {
    userId: number;
    bettingAmount: number;
    resultAmount: number;
    games: GamesInterface[]
}