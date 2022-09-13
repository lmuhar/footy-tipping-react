import { NextApiRequest, NextApiResponse } from 'next';
import { compareSync } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { fetchUserByEmail } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const loginUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Login Request');

  const { email, password } = req.body;
  if (!email || !password) return res.status(403).send(null);

  const [err, user] = await to(fetchUserByEmail(email));

  if (err) return res.status(500).json(err);
  if (!user) return res.status(403).send(null);

  const isMatch = compareSync(password, user.password);
  if (!isMatch) return res.status(401).send(null);

  const token = jwt.sign({ user }, String(process.env.SECRET_TOKEN));
  return res.status(200).json({ token: token });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return loginUserHandler(req, res);
  return unknownRequestHandler(req, res);
}
