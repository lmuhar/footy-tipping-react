import { createTip, deleteTip, fetchTipsForUserByRound, updateTip } from '@data';
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

const deleteTipHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Delete Tip Request');

  const { id } = req.query;
  if (!id) return res.status(400).send(null);

  const [err, tip] = await to(deleteTip(String(id)));

  if (err) return res.status(500).json(err);
  if (!tip) return res.status(404).send(null);

  return res.status(204).json(tip);
};

const updateTipHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Update Tip Request');

  const { id, selectedTip } = req.body;
  if (!id || !selectedTip) return res.status(400).send(null);

  const [err, tip] = await to(updateTip(id, selectedTip));

  if (err) return res.status(500).json(err);
  if (!tip) return res.status(404).send(null);

  return res.status(200).json(tip);
};

const fetchTipsForUserByRoundHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Fetch Tips For User By Round Request');

  const { roundId, userId } = req.body;
  if (!roundId || !userId) return res.status(400).send(null);

  const [err, tips] = await to(fetchTipsForUserByRound(roundId, userId));

  if (err) return res.status(500).json(err);
  if (!tips) return res.status(404).send(null);

  return res.status(200).json(tips);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') return createTipHandler(req, res);
  if (req.method === 'DELETE') return deleteTipHandler(req, res);
  if (req.method === 'PUT') return updateTipHandler(req, res);
  if (req.method === 'GET') return fetchTipsForUserByRoundHandler(req, res);
  return unknownRequestHandler(req, res);
}
