import { ITeamNames } from './../../../models/team-names.model';
import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import prisma from '../client';

export async function createTeamNameService(data: ITeamNames): Promise<[Error, ITeamNames]> {
  if (!data.name) return [new Error('Something went wrong creating the team'), null];

  const [err, teamNames] = await to(prisma.teamName.create({ data }));

  if (err) return [new Error('Something went wrong creating the record'), null];

  if (!teamNames) return [new Error('Something went wrong creating the record'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, teamName] = await createTeamNameService(req.body);

  if (err) return res.status(500).json(err);

  return res.status(200).json(teamName);
}
