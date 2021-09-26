import { IRound } from './../../../models/round.model';
import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';

export async function createRoundService(data: IRound): Promise<[Error, IRound]> {
  if (!data.roundNumber || !data.dateStart || !data.dateEnd)
    return [new Error('Something went wrong creating the round'), null];

  const [err, round] = await to(prisma.round.create({ data }));

  if (err) return [new Error('Something went wrong creating the round'), null];

  if (!round) return [new Error('Something went wrong creating the round'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, round] = await createRoundService(req.body);

  if (err) return res.status(500).json(err);

  return res.status(200).json(round);
}
