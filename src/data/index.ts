import { db } from "~/server/db";

const prisma = db;

export * from "./games";
export * from "./locations";
export * from "./teams";
export * from "./ladder";
export * from "./rounds";
export * from "./users";
export * from "./tips";

export default prisma;
