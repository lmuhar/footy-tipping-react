import to from 'await-to-js';
import prisma from '.';

export const fetchAllLocations = async () => {
  const [err, locations] = await to(
    prisma.location.findMany({
      orderBy: { name: 'asc' },
    }),
  );

  if (err) throw err;

  if (!locations) {
    console.error(new Error(`No locations found`));
    return [];
  }

  return locations;
};

export const createLocation = async (name: string) => {
  const [err, location] = await to(
    prisma.location.create({
      data: { name },
    }),
  );

  if (err) throw err;

  if (!location) {
    console.error(new Error(`No location returned on create`));
    return null;
  }

  return location;
};
