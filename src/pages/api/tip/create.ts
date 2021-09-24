import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import prisma from '../client';
import { ITipCreate } from '../../../models/tip.model';

export async function createTipsService(data: ITipCreate): Promise<[Error, ITipCreate]> {
  const { round, tip, user } = data;
  if (!data) return [new Error('Something went wrong creating the team'), null];

  const [err, tips] = await to(
    prisma.tip.create({
      data: {
        round: { connect: { id: round } },
        tip: { connect: { id: tip } },
        user: { connect: { id: user } },
      },
    }),
  );

  if (err) return [new Error('Something went wrong creating the record'), null];
  console.log(err);
  if (!tips) return [new Error('Something went wrong creating the record'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, tip] = await createTipsService(req.body);
  console.log(err);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
