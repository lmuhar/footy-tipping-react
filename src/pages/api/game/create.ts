import { IGameCreate } from './../../../models/game.model';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';

export async function creatGameService(data: IGameCreate): Promise<[Error, IGameCreate]> {
  const { round, homeTeam, awayTeam, location, startDateTime } = data;

  if (!homeTeam || !round || !awayTeam || !location || !startDateTime)
    return [new Error('Something went wrong creating the record -missing data'), null];

  const [err, game] = await to(
    prisma.game.create({
      data: {
        round: { connect: { id: round } },
        homeTeam: { connect: { id: homeTeam } },
        awayTeam: { connect: { id: awayTeam } },
        location: { connect: { id: location } },
        startDateTime: startDateTime,
      },
    }),
  );

  if (err) return [new Error(`Something went wrong creating the record, ${err}`), null];

  if (!game) return [new Error('Something went wrong creating the record, no game'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, game] = await creatGameService(req.body);
  console.log(err);

  if (err) return res.status(500).json(err);

  return res.status(200).json(game);
}
