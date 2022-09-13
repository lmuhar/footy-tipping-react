import { fetchTipsForUserByRound } from '@data';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'src/utils/web';

const fetchTipsForUserByRoundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Tips For User By Round Request');

  const { roundId, userId } = req.query;
  if (!roundId || !userId) return res.status(400).send(null);

  const [err, tips] = await to(fetchTipsForUserByRound(String(roundId), String(userId)));

  if (err) return res.status(500).json(err);
  if (!tips) return res.status(404).send(null);

  return res.status(200).json(tips);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return fetchTipsForUserByRoundHandler(req, res);
  return unknownRequestHandler(req, res);
}
