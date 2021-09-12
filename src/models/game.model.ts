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
  homeTeam: string;
  awayTeam: string;
  location: string;
  startDateTime: Date;
  round: string;
  result?: string;
}
