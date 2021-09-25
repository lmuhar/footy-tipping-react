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
  user: { name: string };
  userId?: string;
  game: { name: string };
  gameId?: string;
}

export interface IUserTipsRound {
  id?: string;
  roundId: string;
  selectedTip: { name: string };
  round: string;
  user: string;
  tipId: string;
  userId: string;
  gameId: string;
}

export interface ITipDelete {
  id: string;
}
