import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';

export async function latestRoundService(): Promise<[Error, any]> {
  const [err, round] = await to(
    prisma.round.findMany({
      orderBy: { dateEnd: 'desc' },
      take: 1,
      include: {
        tips: {
          select: {
            user: { select: { username: true } },
            selectedTip: { select: { name: true } },
            game: { select: { startDateTime: true } },
          },
        },
      },
    }),
  );

  if (err) return [new Error('Something went wrong fetching all round'), null];

  if (!round) return [new Error('Something went wrong fetching all round'), null];

  return [null, round];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, round] = await latestRoundService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(round);
}
