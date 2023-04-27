import { BettingType } from "./betting-type.enum";

export interface GamesInterface {
    id?: number;
    bettingsId: number;
    uid?: string;
    gameId: string;
    bettingType: BettingType;
    bettingScore: number;
    result: boolean
}