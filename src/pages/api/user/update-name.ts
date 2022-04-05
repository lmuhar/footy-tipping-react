import { NextApiRequest, NextApiResponse } from 'next';

import { IUserNameUpdate } from './../../../models/user-data.model';
import prisma from '../client';
import { to } from 'await-to-js';

export async function updateUsername(req: IUserNameUpdate): Promise<[Error, boolean]> {
  if (!req.id || req.newName) return [new Error('Something went wrong'), null];

  const [err, user] = await to(
    prisma.user.update({
      where: { id: req.id },
      data: {
        ...(req.newName && { username: req.newName }),
      },
    }),
  );

  if (err) return [new Error(`Something went wrong updating the record ${err}`), null];
  if (!user) return [new Error('Something went wrong updating the record'), null];

  return [null, true];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, user] = await updateUsername(req.body);
  if (err) return res.status(500).json(err);

  return res.status(200).json(user);
}
