import { NextApiRequest, NextApiResponse } from 'next';
import { createGame, fetchAllGames, fetchGamesForRoundWithTipsUser } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const fetchGamesForRoundWithTipsForUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Game For User & Round Request');

  const { roundId, userId } = req.query;
  const [err, games] = await to(fetchGamesForRoundWithTipsUser(String(roundId), String(userId)));

  if (err) return res.status(500).json(err);
  if (!games) return res.status(404).send(null);

  return res.status(200).json(games);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchGamesForRoundWithTipsForUserHandler(req, res);
  return unknownRequestHandler(req, res);
}
