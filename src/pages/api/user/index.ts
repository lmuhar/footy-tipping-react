import { fetchAllUsers, updateUsername } from '@data';
import to from 'await-to-js';
import * as jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'src/utils/web';

const updateUsernameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Update Username Request');

  const { id, newName } = req.body;
  if (!id || !newName) return res.status(400).send(null);

  const [err, user] = await to(updateUsername(id, newName));

  if (err) return res.status(500).json(err);
  if (!user) return res.status(404).send(null);

  const token = jwt.sign({ user }, String(process.env.SECRET_TOKEN));
  return res.status(200).json({ token: token });
};

const fetchAllUsersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Users Request');
  const [err, users] = await to(fetchAllUsers());

  if (err) return res.status(500).json(err);
  if (!users) return res.status(404).send(null);

  return res.status(200).json(users);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchAllUsersHandler(req, res);
  if (req.method === 'PUT') return updateUsernameHandler(req, res);
  return unknownRequestHandler(req, res);
}
