import { NextApiRequest, NextApiResponse } from 'next';
import { createGame, fetchAllGames, fetchGamesForRoundByUser } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const createGameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Create Game Request');

  const { round, homeTeam, awayTeam, location, startDateTime } = req.body;
  if (!round || !homeTeam || !awayTeam || !location || !startDateTime) res.status(400).send(null);

  const [err, game] = await to(createGame(round, homeTeam, awayTeam, location, startDateTime));

  if (err) return res.status(500).json(err);
  if (!game) return res.status(404).send(null);

  return res.status(200).json(game);
};

const fetchAllGamesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch All Games Request');
  const [err, games] = await to(fetchAllGames());

  if (err) return res.status(500).json(err);
  if (!games) return res.status(404).send(null);

  return res.status(200).json(games);
};

const fetchGamesForRoundByUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Game For User & Round Request');

  const { roundId, userId } = req.query;
  const [err, games] = await to(fetchGamesForRoundByUser(String(roundId), String(userId)));

  if (err) return res.status(500).json(err);
  if (!games) return res.status(404).send(null);

  return res.status(200).json(games);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return createGameHandler(req, res);
  if (req.method === 'GET') {
    return req.query.roundId && req.query.userId
      ? fetchGamesForRoundByUserHandler(req, res)
      : fetchAllGamesHandler(req, res);
  }
  return unknownRequestHandler(req, res);
}
