/**
 * Database client configuration for Pathway Infinity
 * Ensures single PrismaClient instance across app
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
export const db = prisma;
