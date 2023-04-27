import { BettingType } from '../../../../models'

export interface CreateSportsInterface {
    bettingsId?: number;
    sportsId: string;
    bettingType: BettingType;
    bettingScore: number;
}