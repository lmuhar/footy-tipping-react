import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { IUserData } from '../../../models/user-data.model';
import prisma from '../client';

export async function userDataService(): Promise<[Error, IUserData[]]> {
  const [err, users] = await to(
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    }),
  );

  if (err) return [new Error("Something wen't wrong fetching all Users"), null];

  if (!users) return [new Error("Something wen't wrong fetching all Users"), null];

  if (Array.isArray(users)) return [null, users];

  return [null, [users]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, users] = await userDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(users);
}
