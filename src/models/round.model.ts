export interface IRound {
  id?: string;
  dateStart: Date;
  dateEnd: Date;
  roundNumber: number;
  createdAt?: Date;
  tips?: any;
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
