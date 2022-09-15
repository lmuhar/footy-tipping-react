import to from 'await-to-js';
import prisma from '.';

export const fetchAllRounds = async () => {
  const [err, rounds] = await to(prisma.round.findMany({ orderBy: { dateEnd: 'desc' } }));

  if (err) throw err;

  if (!rounds) {
    console.error(`No rounds were found`);
    return [];
  }

  return rounds;
};

export const fetchLatestRound = async () => {
  const [err, round] = await to(
    prisma.round.findFirst({
      orderBy: { dateEnd: 'desc' },
      include: {
        tips: {
          select: {
            id: true,
            user: { select: { username: true } },
            selectedTip: true,
            game: { select: { startDateTime: true, homeTeam: true, awayTeam: true, result: true } },
          },
        },
      },
    }),
  );

  if (err) throw err;

  if (!round) {
    console.error(`failed to fetch rounds`);
    return null;
  }

  return round;
};

export const fetchLatestRoundId = async () => {
  const [err, round] = await to(
    prisma.round.findFirst({
      orderBy: { dateEnd: 'desc' },
      where: {
        dateEnd: { lt: new Date() },
      },
      select: { id: true },
    }),
  );

  if (err) throw err;

  if (!round) {
    console.error(`failed to fetch rounds`);
    return null;
  }

  return round.id;
};

export const fetchLatestRoundWithGames = async () => {
  const [err, round] = await to(
    prisma.round.findFirst({
      orderBy: { dateEnd: 'desc' },
      select: {
        id: true,
        roundNumber: true,
        dateStart: true,
        dateEnd: true,
        games: {
          orderBy: { startDateTime: 'asc' },
          select: {
            id: true,
            homeTeam: true,
            awayTeam: true,
            result: true,
          },
        },
      },
    }),
  );

  if (err) throw err;

  if (!round) {
    console.error(`Failed to fetch latest round games`);
    return null;
  }

  return round;
};

export const createRound = async (roundNumber: number, dateStart: Date, dateEnd: Date) => {
  const [err, round] = await to(
    prisma.round.create({
      data: {
        roundNumber,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
      },
    }),
  );

  if (err) throw err;

  if (!round) {
    console.error(`failed to return created round`);
    return null;
  }

  return round;
};
