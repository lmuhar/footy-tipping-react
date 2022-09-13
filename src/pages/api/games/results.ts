import { NextApiRequest, NextApiResponse } from 'next';
import { updateGameResult } from 'data';
import to from 'await-to-js';
import { unknownRequestHandler } from 'utils/web';

const updateGameResultHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Update Game Result Request');

  const [err, game] = await to(updateGameResult(req.body.id, req.body.result));

  if (err) return res.status(500).json(err);
  if (!game) return res.status(404).send(null);

  return res.status(200).json(game);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'PUT') updateGameResultHandler(req, res);
  return unknownRequestHandler(req, res);
}
