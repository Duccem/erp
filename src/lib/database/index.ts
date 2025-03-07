import { PrismaClient } from "@prisma/client";
import "server-only";
import { env } from "../env";

const createPrismaClient = () =>
  new PrismaClient({
    log: ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const database = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = database;

