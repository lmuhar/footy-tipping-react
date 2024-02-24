import to from "await-to-js";
import prisma from ".";

export const fetchAllUsers = async () => {
  const [err, users] = await to(
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
  );

  if (err) throw err;

  if (!users) {
    console.error(`No users were found`);
    return [];
  }

  return users;
};

export const fetchAllUsersTipCount = async () => {
  const [err, users] = await to(
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        tips: {
          select: {
            id: true,
            selectedTip: true,
            game: { select: { result: true, roundId: true } },
          },
        },
      },
    })
  );

  if (err) throw err;

  if (!users) {
    console.error(`No users were found`);
    return [];
  }

  return users;
};
