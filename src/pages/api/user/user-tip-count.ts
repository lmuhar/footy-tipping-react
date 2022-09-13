import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUserTips } from '../../../models/user-data.model';
import { APIResponse } from '../../../utils/types';
import prisma from '../client';

export async function userTipCount(): Promise<APIResponse<IUserTips[]>> {
  const [err, users] = await to(
    prisma.user.findMany({
      include: {
        tips: {
          select: {
            id: true,
            selectedTip: true,
            game: { select: { result: true, roundId: true } },
          },
        },
      },
    }),
  );

  if (err) return [new Error("Something wen't wrong fetching all Users"), null];

  if (!users) return [new Error("Something wen't wrong fetching all Users"), null];

  if (Array.isArray(users)) return [null, users];

  return [null, [users]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, users] = await userTipCount();

  if (err) return res.status(500).json(err);

  return res.status(200).json(users);
}
