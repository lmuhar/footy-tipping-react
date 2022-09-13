import { NextApiRequest, NextApiResponse } from 'next';
import { createRound, fetchAllRounds, fetchLatestRound } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const createRoundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Create Round Request');

  const [err, round] = await to(createRound(req.body.roundNumber, req.body.dateStart, req.body.dateEnd));

  if (err) return res.status(500).json(err);
  if (!round) return res.status(404).send(null);

  return res.status(200).json(round);
};

const fetchAllRoundsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch All Rounds Request');

  const [err, rounds] = await to(fetchAllRounds());

  if (err) return res.status(500).json(err);
  if (!rounds) return res.status(404).send(null);

  return res.status(200).json(rounds);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return createRoundHandler(req, res);
  if (req.method === 'GET') return fetchAllRoundsHandler(req, res);
  return unknownRequestHandler(req, res);
}
