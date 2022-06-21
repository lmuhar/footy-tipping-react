import { IRound } from './../../../models/round.model';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';

export async function roundDataService(): Promise<[Error, IRound[]]> {
  const [err, rounds] = await to(prisma.round.findMany({ orderBy: { dateEnd: 'desc' } }));

  if (err) return [new Error('Something went wrong fetching all rounds'), null];

  if (!rounds) return [new Error('Something went wrong fetching all rounds'), null];

  if (Array.isArray(rounds)) return [null, rounds];

  return [null, [rounds]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, rounds] = await roundDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(rounds);
}
