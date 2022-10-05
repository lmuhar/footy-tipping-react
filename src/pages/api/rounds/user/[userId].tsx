import { NextApiRequest, NextApiResponse } from 'next';
import { fetchRoundsWithGamesForUser } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const fetchRoundsWithGamesForUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Rounds With Games For User Request');

  const { userId } = req.query;
  const [err, round] = await to(fetchRoundsWithGamesForUser(String(userId)));

  if (err) return res.status(500).json(err);
  if (!round) return res.status(404).send(null);

  return res.status(200).json(round);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchRoundsWithGamesForUserHandler(req, res);
  return unknownRequestHandler(req, res);
}
