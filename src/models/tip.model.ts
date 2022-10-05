import type { ITeamNames } from './team-names.model';
export interface ITipCreate {
  id?: string;
  selectedTip: string;
  round: string;
  user: string;
  game: string;
}

export interface ITip {
  id?: string;
  selectedTip: { name: string };
  selectedTipId?: string;
  round: { name: number };
  roundId?: string;
  user: { name: string; username: string };
  userId?: string;
  game: { name: string; homeTeam: ITeamNames; awayTeam: ITeamNames };
  gameId?: string;
  startDateTime: Date;
}

export interface IUserTipsRound {
  id?: string;
  roundId: string;
  selectedTip?: string;
  round?: string;
  user?: string;
  userId?: string;
  game?: string;
  gameId?: string;
}

export interface ITipDelete {
  id: string;
}
