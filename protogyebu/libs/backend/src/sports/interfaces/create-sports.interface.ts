import { BettingType } from '../../../../models'

export interface CreateSportsInterface {
    bettingsId: number;
    gameId: string;
    bettingType: BettingType;
    bettingScore: number;
}