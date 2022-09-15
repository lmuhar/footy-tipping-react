import { NextApiRequest, NextApiResponse } from 'next';
import { createLocation, fetchAllLocations } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const fetchAllLocationsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch All Locations Request');

  const [err, locationNames] = await to(fetchAllLocations());

  if (err) return res.status(500).json(err);
  if (!locationNames) return res.status(404).send(null);

  return res.status(200).json(locationNames);
};

const createLocationHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Create Location Request');

  const { name } = req.body;
  if (!name) return res.status(400).send(null);

  const [err, location] = await to(createLocation(req.body.name));

  if (err) return res.status(500).json(err);
  if (!location) return res.status(404).send(null);

  return res.status(200).json(location);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return createLocationHandler(req, res);
  if (req.method === 'GET') return fetchAllLocationsHandler(req, res);
  return unknownRequestHandler(req, res);
}