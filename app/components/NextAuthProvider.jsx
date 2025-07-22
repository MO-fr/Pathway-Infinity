'use client';

import { SessionProvider } from 'next-auth';

export function NextAuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
