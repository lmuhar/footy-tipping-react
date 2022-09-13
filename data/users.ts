import to from 'await-to-js';
import prisma from '.';

export const fetchAllUsers = async () => {
  const [err, users] = await to(
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    }),
  );

  if (err) throw err;

  if (!users) {
    console.error(`No users were found`);
    return [];
  }

  return users;
};

export const fetchUserByEmail = async (email: string) => {
  const [err, user] = await to(prisma.user.findUnique({ where: { email } }));

  if (err) throw err;

  if (!user) {
    console.error(`No user was found for ${email}`);
    return null;
  }

  return user;
};

export const createNewUser = async (username: string, password: string, email: string) => {
  const [err, user] = await to(
    prisma.user.create({
      data: { username, password, email },
    }),
  );

  if (err) throw err;

  if (!user) {
    console.error(`No user was found for ${email}`);
    return null;
  }

  return user;
};

export const updateUsername = async (id: string, username: string) => {
  const [err, user] = await to(
    prisma.user.update({
      where: { id },
      data: {
        username,
      },
    }),
  );

  if (err) throw err;

  if (!user) {
    console.error(`No user was found for id: ${id}`);
    return null;
  }

  return user;
};

export const fetchAllUsersTipCount = async () => {
  const [err, users] = await to(
    prisma.user.findMany({
      include: {
        tips: {
          select: {
            id: true,
            selectedTip: true,
            game: { select: { result: true, roundId: true } },
          },
        },
      },
    }),
  );

  if (err) throw err;

  if (!users) {
    console.error(`No users were found`);
    return [];
  }

  return users;
};
