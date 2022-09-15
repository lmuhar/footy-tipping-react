import { PrismaClient, Role, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'password';
const DEFAULT_ADMIN = {
  username: 'admin',
  email: 'admin@muhar.xyz',
  role: Role.admin,
} as User;

(async () => {
  const password =
    process.env.NODE_ENV !== 'development' && !!process.env.ADMIN_PASSWORD
      ? process.env.ADMIN_PASSWORD
      : DEFAULT_PASSWORD;

  try {
    await prisma.user.upsert({
      where: {
        email: DEFAULT_ADMIN.email!,
      },
      update: {
        ...DEFAULT_ADMIN,
        password: hashSync(password, genSaltSync(10)),
      },
      create: {
        ...DEFAULT_ADMIN,
        password: hashSync(password, genSaltSync(10)),
      },
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
