/*import { PrismaClient, Role, User } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'password';
const DEFAULT_ADMIN = {
  username: 'admin',
  email: 'admin@muhar.xyz',
  role: Role.admin,
} as User;

const TEAM_NAMES = ['Richmond', 'Collingwood', 'Essendon', 'Sydney Swans'];

const LOCATION_NAMES = ['SCG', 'MCG', 'Backyard'];

(async () => {
  const password =
    process.env.NODE_ENV !== 'development' && !!process.env.ADMIN_PASSWORD
      ? process.env.ADMIN_PASSWORD
      : DEFAULT_PASSWORD;

  try {
    await Promise.all([
      prisma.user.upsert({
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
      }),
    ]);

    // DEV ONLY SEED DATA
    if (process.env.NODE_ENV === 'development')
      await Promise.all([
        ...TEAM_NAMES.map((name) =>
          prisma.teamName.upsert({
            where: { name },
            create: { name },
            update: { name },
          }),
        ),
        ...LOCATION_NAMES.map((name) =>
          prisma.location.upsert({
            where: { name },
            create: { name },
            update: { name },
          }),
        ),
      ]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
*/