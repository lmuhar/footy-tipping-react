import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({});

    res.status(200).json(users);
  }
  