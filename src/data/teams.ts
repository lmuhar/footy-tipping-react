import to from 'await-to-js';
import prisma from '.';

export const fetchAllTeamNames = async () => {
  const [err, teamNames] = await to(
    prisma.teamName.findMany({
      orderBy: { name: 'asc' },
    }),
  );

  if (err) throw err;

  if (!teamNames) {
    console.error(new Error(`No team name returned on create`));
    return [];
  }

  return teamNames;
};

export const createTeamName = async (name: string) => {
  const [err, teamName] = await to(
    prisma.teamName.create({
      data: {
        name,
      },
    }),
  );

  if (err) throw err;

  if (!teamName) {
    console.error(new Error(`No team name returned on create`));
    return null;
  }

  return teamName;
};
