import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLatestRoundWithGames } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const fetchLatestRoundGamesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Games Request');

  const [err, games] = await to(fetchLatestRoundWithGames());

  if (err) return res.status(500).json(err);
  if (!games) return res.status(404).send(null);

  return res.status(200).json(games);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchLatestRoundGamesHandler(req, res);
  return unknownRequestHandler(req, res);
}
