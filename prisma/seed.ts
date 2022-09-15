import { PrismaClient, Role, User } from "@prisma/client";
import { genSaltSync, hashSync } from "bcryptjs";

const prisma = new PrismaClient()

const DEFAULT_USERS = [
  {
    username: "admin",
    email: "admin@muhar.xyz",
    password: "password",
    role: Role.admin
  },
  {
    username: "user",
    email: "user@muhar.xyz",
    password: "password",
    role: Role.user
  },
] as User[];

(async () => {
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            ...user,
            password: hashSync(user.password, genSaltSync(10))
          },
          create: {
            ...user,
            password: hashSync(user.password, genSaltSync(10))
          },
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();