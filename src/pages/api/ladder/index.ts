import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLadder } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const fetchLadderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [err, ladder] = await to(fetchLadder());

  if (err) return res.status(500).json(err);
  if (!ladder) return res.status(404).send(null);

  return res.status(200).json(ladder);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') return fetchLadderHandler(req, res);
  return unknownRequestHandler(req, res);
}
