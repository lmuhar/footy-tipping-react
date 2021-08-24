import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const prisma = new PrismaClient();
  
  const user = await prisma.user.findOne({ where: { email: req.body.email } });

  if (!user) res.status(403);

  const isMatch = compareSync(req.body.password, user.password);

  if (!isMatch) res.status(403);

  const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN);
  return res.status(200).json({ token: token });
}
