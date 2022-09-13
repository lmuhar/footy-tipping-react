import prisma from '../client';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { ILocationNames } from '../../../models/location-name.model';
import { APIResponse } from '../../../utils/types';

export async function locationDataService(): Promise<APIResponse<ILocationNames[]>> {
  const [err, locations] = await to(prisma.location.findMany({}));

  if (err) return [new Error('Something went wrong fetching all locations'), null];

  if (!locations) return [new Error('Something went wrong fetching all locations'), null];

  if (Array.isArray(locations)) return [null, locations];

  return [null, [locations]];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, locationNames] = await locationDataService();
  if (err) return res.status(500).json(err);

  return res.status(200).json(locationNames);
}
