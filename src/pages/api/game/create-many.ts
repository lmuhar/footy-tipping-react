/*import { IGameCreate } from './../../../models/game.model';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';

export async function creatGameService(data: IGameCreate[]): Promise<[Error, IGameCreate[]]> {
  if (!data) return [new Error('Something went wrong creating the record'), null];

  const req: any = [];

  data.forEach((i) => {
    req.push({
      round: { connect: { id: i.round } },
      homeTeam: { connect: { id: i.homeTeam } },
      awayTeam: { connect: { id: i.awayTeam } },
      location: { connect: { id: i.location } },
      startDateTime: new Date(i.startDateTime),
    });
  });

  const [err, game] = await to(
    prisma.game.createMany({
      data: req,
    }),
  );

  if (err) return [new Error('Something went wrong creating the record'), null];

  if (!game) return [new Error('Something went wrong creating the record'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, game] = await creatGameService(req.body);
  console.log(err);

  if (err) return res.status(500).json(err);

  return res.status(200).json(game);
}
*/
