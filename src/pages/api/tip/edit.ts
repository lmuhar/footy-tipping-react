import { to } from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITip } from '../../../models/tip.model';
import prisma from '../client';

export async function updateTipService(
  id: string,
  selectedTipId: string,
  roundId: string,
  gameId: string,
  userId: string,
): Promise<[Error, ITip]> {
  if (!id || !selectedTipId) return [new Error('Something went wrong updating the record'), null];

  const [err, tip] = await to(
    prisma.tip.update({
      where: { id: id },
      data: {
        ...(selectedTipId && { selectedTip: { connect: { id: selectedTipId } } }),
        ...(roundId && { round: { connect: { id: roundId } } }),
        ...(userId && { user: { connect: { id: userId } } }),
        ...(gameId && { game: { connect: { id: gameId } } }),
      },
    }),
  );

  if (err) return [new Error(`Something went wrong updating the record ${err}`), null];
  console.log(err);
  if (!tip) return [new Error('Something went wrong updating the record'), null];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { id, selectedTip, round, game, user } = req.body;
  console.log(req.body);
  const [err, tip] = await updateTipService(id, selectedTip, round, game, user);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
