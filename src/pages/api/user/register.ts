import { NextApiRequest, NextApiResponse } from 'next';
import { genSaltSync, hashSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { createNewUser } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const registerUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Register Request');

  const { username, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).send(null);

  const hashedPassword = hashSync(password, genSaltSync(10));
  const [err, user] = await to(createNewUser(username, hashedPassword, email));

  if (err) return res.status(500).json(err);
  if (!user) return res.status(404).send(null);

  const token = jwt.sign({ user }, String(process.env.SECRET_TOKEN));
  return res.status(201).json({ token: token });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return registerUserHandler(req, res);
  return unknownRequestHandler(req, res);
}
