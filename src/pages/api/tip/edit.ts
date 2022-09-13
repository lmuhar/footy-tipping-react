import { to } from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITipCreate } from '../../../models/tip.model';
import { APIResponse } from '../../../utils/types';
import prisma from '../client';

export async function updateTipService(req: ITipCreate): Promise<APIResponse<boolean>> {
  if (!req.id || !req.selectedTip) return [new Error('Something went wrong updating the record'), null];

  const [err, tip] = await to(
    prisma.tip.update({
      where: { id: req.id },
      data: {
        ...(req.selectedTip && { selectedTip: { connect: { id: req.selectedTip } } }),
      },
    }),
  );

  if (err) return [new Error(`Something went wrong updating the record ${err}`), null];
  if (!tip) return [new Error('Something went wrong updating the record'), null];

  return [null, true];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, tip] = await updateTipService(req.body);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
