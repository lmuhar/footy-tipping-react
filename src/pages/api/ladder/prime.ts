import { NextApiRequest, NextApiResponse } from 'next';
import { primeTeamNames } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const primeTeamNamesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [err, ladder] = await to(primeTeamNames());

  if (err) return res.status(500).json(err);
  if (!ladder) return res.status(404).send(null);

  return res.status(200).json(ladder);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') return primeTeamNamesHandler(req, res);
  return unknownRequestHandler(req, res);
}
