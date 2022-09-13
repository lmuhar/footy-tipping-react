import { deleteTip, updateTip } from 'data';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { unknownRequestHandler } from 'utils/web';

const deleteTipHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Delete Tip Request');

  const { tipId } = req.query;
  const [err, tip] = await to(deleteTip(String(tipId)));

  if (err) return res.status(500).json(err);
  if (!tip) return res.status(404).send(null);

  return res.status(204).json(tip);
};

const updateTipHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Update Tip Request');

  const { selectedTip } = req.body;
  if (!selectedTip) return res.status(400).send(null);

  const { tipId } = req.query;
  const [err, tip] = await to(updateTip(String(tipId), selectedTip));

  if (err) return res.status(500).json(err);
  if (!tip) return res.status(404).send(null);

  return res.status(200).json(tip);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') return deleteTipHandler(req, res);
  if (req.method === 'PUT') return updateTipHandler(req, res);
  return unknownRequestHandler(req, res);
}
