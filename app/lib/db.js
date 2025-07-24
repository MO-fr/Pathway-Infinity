/**
 * Database client configuration for Pathway Infinity
 * Ensures single PrismaClient instance across app with proper initialization
 * Handles development hot reloading and production deployment
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = /** @type {{ prisma: import('@prisma/client').PrismaClient }} */ (global);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
