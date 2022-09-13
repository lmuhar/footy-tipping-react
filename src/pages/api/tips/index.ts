import { createTip, fetchTipsForUserByRound } from '@data';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'src/utils/web';

const createTipHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Create Tip Request');

  const { round, selectedTip, user, game } = req.body;
  if (!round || !selectedTip || !user || !game) return res.status(400).send(null);

  const [err, tip] = await to(createTip(round, selectedTip, user, game));

  if (err) return res.status(500).json(err);
  if (!tip) return res.status(404).send(null);

  return res.status(200).json(tip);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') return createTipHandler(req, res);
  return unknownRequestHandler(req, res);
}
