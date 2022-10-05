import { fetchAllUsersTipCount } from 'data';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'utils/web';

const fetchUserTipCountHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch All Users Tip count Request');
  const [err, users] = await to(fetchAllUsersTipCount());

  if (err) return res.status(500).json(err);
  if (!users) return res.status(404).send(null);

  return res.status(200).json(users);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchUserTipCountHandler(req, res);
  return unknownRequestHandler(req, res);
}
