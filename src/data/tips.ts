import to from 'await-to-js';
import prisma from '.';

export const createTip = async (roundId: string, selectedTipId: string, userId: string, gameId: string) => {
  const [err, tip] = await to(
    prisma.tip.create({
      data: {
        round: { connect: { id: roundId } },
        selectedTip: { connect: { id: selectedTipId } },
        user: { connect: { id: userId } },
        game: { connect: { id: gameId } },
      },
    }),
  );

  if (err) throw err;

  if (!tip) {
    console.error(new Error(`No tip returned on create`));
    return null;
  }

  return tip;
};

export const deleteTip = async (id: string) => {
  const [err, tip] = await to(
    prisma.tip.delete({
      where: { id },
    }),
  );

  if (err) throw err;

  if (!tip) {
    console.error(new Error(`No tip deleted to return`));
    return null;
  }

  return tip;
};

export const updateTip = async (id: string, selectedTipId: string) => {
  const [err, tip] = await to(
    prisma.tip.update({
      where: { id },
      data: {
        selectedTip: { connect: { id: selectedTipId } },
      },
    }),
  );

  if (err) throw err;

  if (!tip) {
    console.error(new Error(`No tip updated to return`));
    return null;
  }

  return tip;
};

export const upsertTip = async (roundId: string, selectedTipId: string, userId: string, gameId: string) => {
  const [foundTipErr, foundTip] = await to(
    prisma.tip.findFirst({
      where: { userId, AND: { gameId } },
      select: { id: true },
    }),
  );

  if (foundTipErr) throw foundTipErr;

  const id = foundTip ? foundTip.id : '';

  const [err, tip] = await to(
    prisma.tip.upsert({
      where: { id: id },
      create: {
        round: { connect: { id: roundId } },
        selectedTip: { connect: { id: selectedTipId } },
        user: { connect: { id: userId } },
        game: { connect: { id: gameId } },
      },
      update: {
        selectedTip: { connect: { id: selectedTipId } },
      },
    }),
  );

  if (err) throw err;

  if (!tip) {
    console.error(new Error(`No tip updated to return`));
    return null;
  }

  return tip;
};

export const fetchTipsForUserByRound = async (roundId: string, userId: string) => {
  const [err, tips] = await to(
    prisma.tip.findMany({
      where: { roundId, userId },
    }),
  );

  if (err) throw err;

  if (!tips) {
    console.error(new Error(`No tips found to return`));
    return [];
  }

  return tips;
};
