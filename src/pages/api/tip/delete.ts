import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import prisma from '../client';
import { ITipDelete } from '../../../models/tip.model';

export async function deleteTipService(data: ITipDelete): Promise<[Error, ITipDelete]> {
  const { id } = data;
  if (!data) return [new Error('Something went wrong creating the team'), null];

  const [err, tips] = await to(
    prisma.tip.delete({
      where: { id: id },
    }),
  );

  if (err) return [new Error('Something went wrong creating the record'), null];

  if (!tips) return [new Error('Something went wrong creating the record'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, tip] = await deleteTipService(req.body);
  if (err) return res.status(500).json(err);

  return res.status(200).json(tip);
}
