import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';

export async function latestRoundId(): Promise<[Error, any]> {
  const [err, round] = await to(
    prisma.round.findMany({
      orderBy: { dateEnd: 'desc' },
      where: {
        dateEnd: { lt: new Date() },
      },
      take: 1,
      select: { id: true },
    }),
  );

  if (err) return [new Error('Something went wrong fetching all round'), null];

  if (!round) return [new Error('Something went wrong fetching all round'), null];

  return [null, round];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, round] = await latestRoundId();
  if (err) return res.status(500).json(err);

  return res.status(200).json(round);
}
