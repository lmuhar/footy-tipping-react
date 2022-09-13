import { NextApiRequest, NextApiResponse } from 'next';
import { fetchLatestRoundId } from '@data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'src/utils/web';

const fetchLatestRoundIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Latest Round Ids Request');

  const [err, id] = await to(fetchLatestRoundId());

  if (err) return res.status(500).json(err);
  if (!id) return res.status(404).send(null);

  return res.status(200).json(id);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'GET') return fetchLatestRoundIdHandler(req, res);
  return unknownRequestHandler(req, res);
}
