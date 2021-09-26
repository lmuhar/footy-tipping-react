import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ITeamNames } from '../../../models/team-names.model';

export async function teamDataService(): Promise<[Error, ITeamNames[]]> {
  const [err, teamNames] = await to(prisma.teamName.findMany({}));

  if (err) return [new Error('Something went wrong fetching all team names'), null];

  if (!teamNames) return [new Error('Something went wrong fetching all team names'), null];

  if (Array.isArray(teamNames)) return [null, teamNames];

  return [null, [teamNames]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, teamNames] = await teamDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(teamNames);
}
