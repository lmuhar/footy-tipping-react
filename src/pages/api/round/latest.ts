import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLatestRound, fetchLatestRoundGames, fetchLatestRoundId } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const fetchLatestRoundGamesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Games Request');

  const [err, round] = await to(fetchLatestRoundGames());

  if (err) return res.status(500).json(err);
  if (!round) return res.status(404).send(null);

  return res.status(200).json(round);
};

const fetchLatestRoundIdsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Ids Request');

  const [err, roundId] = await to(fetchLatestRoundId());

  if (err) return res.status(500).json(err);
  if (!roundId) return res.status(404).send(null);

  return res.status(200).json(roundId);
};

const fetchLatestRoundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Request');

  const [err, round] = await to(fetchLatestRound());

  if (err) return res.status(500).json(err);
  if (!round) return res.status(404).send(null);

  return res.status(200).json(round);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') {
    if (req.query.ids === 'true') return fetchLatestRoundIdsHandler(req, res);
    if (req.query.games === 'true') return fetchLatestRoundGamesHandler(req, res);
    return fetchLatestRoundHandler(req, res);
  }
  return unknownRequestHandler(req, res);
}
