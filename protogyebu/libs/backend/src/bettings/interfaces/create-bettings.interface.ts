import { SportsInterface } from "@protogyebu/models";
import { CreateSportsInterface } from "../../sports";

export interface CreateBettingInterface {
    userId: number;
    bettingAmount: number;
    drainage: number;
    games: CreateSportsInterface[]
}