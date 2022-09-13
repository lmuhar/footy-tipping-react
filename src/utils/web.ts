import { NextApiRequest, NextApiResponse } from "next";

export const unknownRequestHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.info('Unknown Request');
  return res.status(404).send(null);
};
