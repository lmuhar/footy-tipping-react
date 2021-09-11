import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../client';
import { ILocationNames } from './../../../models/location-name.model';

export async function creatLocationNameService(data: ILocationNames): Promise<[Error, ILocationNames]> {
  if (!data.name) return [new Error('Something went wrong creating the record'), null];

  const [err, locationNames] = await to(prisma.location.create({ data }));

  if (err) return [new Error('Something went wrong creating the record'), null];

  if (!locationNames) return [new Error('Something went wrong creating the record'), null];

  return [null, data];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const [err, locationName] = await creatLocationNameService(req.body);

  if (err) return res.status(500).json(err);

  return res.status(200).json(locationName);
}
