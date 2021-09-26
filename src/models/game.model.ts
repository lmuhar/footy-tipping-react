import { ITip } from './tip.model';

export interface IGameCreate {
  id?: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  startDateTime: Date;
  round: string;
  result?: string;
}

export interface IGame {
  id?: string;
  homeTeam: { id: string; name: string };
  homeTeamId?: string;
  awayTeam: { id: string; name: string };
  awayTeamId?: string;
  location: { id: string; name: string };
  startDateTime: Date;
  round: { id: string; name: string };
  result?: { id: string; name: string };
  tip?: ITip[];
}

export interface IGameGet {
  id?: string;
  homeTeam: { id: string; name: string };
  awayTeam: { id: string; name: string };
  location: { id: string; name: string };
  startDateTime: Date;
  round: { id: string; name: string };
  result?: { id: string; name: string };
}

export interface IGameByRoundUser {
  roundId: string;
  userId: string;
}
