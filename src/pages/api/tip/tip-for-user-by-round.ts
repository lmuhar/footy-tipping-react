import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUserTipsRound } from '../../../models/tip.model';

export async function tipsByUserRoundService(roundId: string, userId: string): Promise<[Error, IUserTipsRound[]]> {
  if (!roundId || !userId) return [new Error('Something went wrong creating the record'), null];

  const [err, tips] = await to(
    prisma.tip.findMany({
      where: { roundId, userId },
    }),
  );

  if (err) return [new Error(`Something went wrong fetching all games ${err}`), null];

  if (!tips) return [new Error('Something went wrong fetching all games'), null];

  if (Array.isArray(tips)) return [null, tips];

  return [null, [tips]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { roundId, userId } = req.body;
  const [err, tips] = await tipsByUserRoundService(roundId, userId);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tips);
}
