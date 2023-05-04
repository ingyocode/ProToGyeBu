import { SportsStateType } from '@protogyebu/common'

export interface GetSportsResponseInterface {
    sports: string;
    date: string; // ex 04.27
    Qtime: string;
    states: SportsStateType;
    home_name: string;
    away_name: string;
    leagueName: string;
    h_s_t: number;
    a_s_t: number;
}