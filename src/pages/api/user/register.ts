import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { genSaltSync, hashSync } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const prisma = new PrismaClient();

  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400);
  }

  const { username, email, password } = req.body;
  const hashedPassword = hashSync(password, genSaltSync(10));

  const registeredUser = await prisma.user.create({
    data: { username, password: hashedPassword, email },
  });

  res.status(201).send(registeredUser);
}
