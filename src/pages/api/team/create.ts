import { ITeamNames } from './../../../models/team-names.model';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';

export async function createTeamNameService(data: ITeamNames): Promise<[Error, ITeamNames]> {
  const prisma = new PrismaClient();

  if (!data.name) return [new Error('Something went wrong creating the team'), null];

  const [err, teamNames] = await to(prisma.teamName.create({ data }));

  if (err) return [new Error('Something went wrong fetching all team names'), null];

  if (!teamNames) return [new Error('Something went wrong fetching all team names'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  console.log(req);
  const [err, teamName] = await createTeamNameService(req.body);

  if (err) return res.status(500).json(err);

  return res.status(200).json(teamName);
}
