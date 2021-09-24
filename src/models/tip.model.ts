export interface ITipCreate {
  id?: string;
  tip: string;
  round: string;
  user: string;
}

export interface ITip {
  id?: string;
  tip: { id: string; name: string };
  tipId?: string;
  round: { id: string; name: number };
  roundId?: string;
  user: { id: string; name: string };
  userId?: string;
}
