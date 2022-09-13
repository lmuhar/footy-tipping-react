import { to } from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { SaveResult } from '../../../models/round.model';
import { APIResponse } from '../../../utils/types';
import prisma from '../client';

export async function updateGameResult(req: SaveResult): Promise<APIResponse<boolean>> {
  if (!req.id || !req.result) return [new Error('Something went wrong updating the record'), null];

  const [err, tip] = await to(
    prisma.game.update({
      where: { id: req.id },
      data: {
        ...(req.result && { result: { connect: { id: req.result } } }),
      },
    }),
  );

  if (err) return [new Error(`Something went wrong updating the record ${err}`), null];
  if (!tip) return [new Error('Something went wrong updating the record'), null];

  return [null, true];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, tip] = await updateGameResult(req.body);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
