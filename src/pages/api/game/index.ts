import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';

export async function gameDataService(): Promise<[Error, any[]]> {
  const [err, games] = await to(
    prisma.game.findMany({
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } },
        location: { select: { name: true } },
        result: { select: { name: true } },
      },
    }),
  );

  if (err) return [new Error('Something went wrong fetching all games'), null];

  if (!games) return [new Error('Something went wrong fetching all games'), null];

  if (Array.isArray(games)) return [null, games];

  return [null, [games]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, games] = await gameDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(games);
}
