export interface ResponseData {
    list: GameInterface[]
    pagingInfo: {
      page: number;
      pageSize: number;
      totalCount: number;
    }
  }
  export interface GameInterface {
    gameId: number;
    // gameName: string;
    gamePlayType: string; // TODO enum
    gameRoundStatus: GameRoundInterface[];
    league: LeagueInterface;
    season: SeasonInterface
    event: {
      name: string // 종류
    },
    field: {
      nameMain: string; // 경기장 이름
    },
    home: {
      result: number;
      wlt: string;
      team: {
        nameMain: string;
        imageUrl: string;
      }
    },
    away: {
      result: number;
      wlt: string;
      team: {
        nameMain: string;
        imageUrl: string;
      }
    }
  }
  interface GameRoundInterface {
    round: string;
    roundStatus: string; // TODO ENUM
  }
  interface LeagueInterface {
    name: string;
    leagueCode: string;
  }

  interface SeasonInterface {
    nameMain: string;
  }

