import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLatestRound } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const fetchLatestRoundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Request');

  const [err, round] = await to(fetchLatestRound());

  if (err) return res.status(500).json(err);
  if (!round) return res.status(404).send(null);

  return res.status(200).json(round);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchLatestRoundHandler(req, res);
  return unknownRequestHandler(req, res);
}
