import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export async function userDataService(): Promise<[Error, IUserData[]]> {
  const prisma = new PrismaClient();
  const [err, users] = await prisma.user.findMany({});

  if (err) return [new Error("Something wen't wrong fetching all Users"), null];

  if (!users) return [new Error("Something wen't wrong fetching all Users"), null];

  if (Array.isArray(users)) return [null, users];

  return [null, [users]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, users] = await userDataService();
  if (err) res.status(500).json(err);

  res.status(200).json(users);
}
