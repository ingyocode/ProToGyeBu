import { BettingType } from "./betting-type.enum";

export interface SportsInterface {
    id?: number;
    bettingsId: number;
    uid?: string;
    sportsId: string;
    bettingType: BettingType;
    bettingScore: number;
    result: boolean
}