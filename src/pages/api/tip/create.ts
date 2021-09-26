import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import prisma from '../client';
import { ITipCreate } from '../../../models/tip.model';

export async function createTipsService(data: ITipCreate): Promise<[Error, ITipCreate]> {
  const { round, selectedTip, user, game } = data;
  if (!data) return [new Error('Something went wrong creating the team'), null];

  const [err, tips] = await to(
    prisma.tip.create({
      data: {
        round: { connect: { id: round } },
        selectedTip: { connect: { id: selectedTip } },
        user: { connect: { id: user } },
        game: { connect: { id: game } },
      },
    }),
  );

  if (err) return [new Error(`Something went wrong creating the record ${err}`), null];
  if (!tips) return [new Error('Something went wrong creating the record'), null];
  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, tip] = await createTipsService(req.body);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
