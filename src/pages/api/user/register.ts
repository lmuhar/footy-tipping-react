import prisma from '../client';
import { NextApiRequest, NextApiResponse } from 'next';
import { genSaltSync, hashSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400);
  }

  const { username, email, password } = req.body;
  const hashedPassword = hashSync(password, genSaltSync(10));

  const registeredUser = await prisma.user.create({
    data: { username, password: hashedPassword, email },
  });

  const token = jwt.sign({ user: registeredUser }, process.env.SECRET_TOKEN || '');
  return res.status(200).json({ token: token });
}
