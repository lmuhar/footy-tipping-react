import * as trpcNext from '@trpc/server/adapters/next';
import { db } from './db';

export const createContext = async ({ req, res }: trpcNext.CreateNextContextOptions) => {
  return {
    req,
    res,
    db,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
