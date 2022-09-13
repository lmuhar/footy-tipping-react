import { updateUsername } from '@data';
import to from 'await-to-js';
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'src/utils/web';

const updateUsernameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Update Username Request');

  const { username } = req.body;
  if ( !username) return res.status(400).send(null);

  const { userId } = req.query;
  const [err, user] = await to(updateUsername(String(userId), username));

  if (err) return res.status(500).json(err);
  if (!user) return res.status(404).send(null);

  const token = jwt.sign({ user }, String(process.env.SECRET_TOKEN));
  return res.status(200).json({ token: token });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'PUT') return updateUsernameHandler(req, res);
  return unknownRequestHandler(req, res);
}
