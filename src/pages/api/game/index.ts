/*import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { IGame } from '../../../models/game.model';

export async function gameDataService(): Promise<[Error, IGame[]]> {
  const [err, games] = await to(prisma.game.findMany({}));

  if (err) return [new Error('Something went wrong fetching all games'), null];

  if (!games) return [new Error('Something went wrong fetching all games'), null];

  if (Array.isArray(games)) return [null, games];

  return [null, [games]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, games] = await gameDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(games);
}
*/
