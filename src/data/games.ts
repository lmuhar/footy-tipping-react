import to from 'await-to-js';
import prisma from '.';

export const fetchAllGames = async () => {
  const [err, games] = await to(
    prisma.game.findMany({
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } },
        location: { select: { name: true } },
        result: { select: { name: true } },
      },
    }),
  );

  if (err) throw err;

  if (!games) {
    console.warn(new Error(`No games found`));
    return [];
  }

  return games;
};

export const fetchGamesForRoundWithTipsUser = async (roundId: string, userId: string) => {
  const [err, games] = await to(
    prisma.game.findMany({
      where: { roundId },
      orderBy: { startDateTime: 'asc' },
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } },
        location: { select: { name: true } },
        result: { select: { name: true } },
        tip: { where: { userId } },
      },
    }),
  );

  if (err) throw err;

  if (!games) {
    console.warn(new Error(`No games found`));
    return [];
  }

  return games || [];
};

export const updateGameResult = async (id: string, resultId: string) => {
  const [err, game] = await to(
    prisma.game.update({
      where: { id },
      data: {
        result: { connect: { id: resultId } },
      },
    }),
  );

  if (err) throw err;

  if (!game) {
    console.warn(new Error(`No game found for id:${id}`));
    return null;
  }

  return game;
};

export const createGame = async (
  round: string,
  homeTeam: string,
  awayTeam: string,
  location: string,
  startDateTime: Date,
) => {
  const [err, game] = await to(
    prisma.game.create({
      data: {
        round: { connect: { id: round } },
        homeTeam: { connect: { id: homeTeam } },
        awayTeam: { connect: { id: awayTeam } },
        location: { connect: { id: location } },
        startDateTime: startDateTime,
      },
    }),
  );

  if (err) throw err;

  if (!game) {
    console.warn(new Error(`Couldnt return created game`));
    return null;
  }

  return game;
};
