import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export * from './games'
export * from './locations'
export * from './teams'
export * from './ladder'
export * from './rounds'
export * from './users'
export * from './tips'

export default prisma;