import { NextApiRequest, NextApiResponse } from 'next';
import { createTeamName, fetchAllTeamNames } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const createTeamNameHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Create Team Name Request');

  const { name } = req.body;
  if (!name) res.status(400).send(null);

  const [err, games] = await to(createTeamName(name));

  if (err) return res.status(500).json(err);
  if (!games) return res.status(404).send(null);

  return res.status(200).json(games);
};

const fetchTeamNamesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Team Names Request');

  const [err, names] = await to(fetchAllTeamNames());

  if (err) return res.status(500).json(err);
  if (!names) return res.status(404).send(null);

  return res.status(200).json(names);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') return createTeamNameHandler(req, res);
  if (req.method === 'GET') return fetchTeamNamesHandler(req, res);
  return unknownRequestHandler(req, res);
}
