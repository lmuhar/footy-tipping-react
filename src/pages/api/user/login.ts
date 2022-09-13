import prisma from '../client';
import { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({ where: { email: req.body.email } });

  if (!user) return res.status(403);

  const isMatch = compareSync(req.body.password, user.password);

  if (!isMatch) return res.status(403);

  const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN || '');
  return res.status(200).json({ token: token });
}
