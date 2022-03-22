import { IGame } from './game.model';

export interface IRound {
  id?: string;
  dateStart: Date;
  dateEnd: Date;
  roundNumber: number;
  createdAt?: Date;
  tips?: any;
  games?: IGame[];
}

export interface ViewTips {
  game: ViewGame[];
}

export interface ViewGame {
  startDateTime: Date;
  homeTeam: ViewTeam;
  awayTeam: ViewTeam;
  id: string;
  selectedTip;
}

export interface ViewTeam {
  id: string;
  name: string;
}

export interface SelectedTip {
  name: string;
}

export interface SaveResult {
  id: string;
  result: string;
}
