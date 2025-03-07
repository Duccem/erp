'use client';

import { useSession } from '@/lib/auth/client';
import { BetterUser } from '@/lib/auth/server';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const UserSession = () => {
  const [_, setRole] = useLocalStorage<string>('role', 'USER');
  const [__, setUser] = useLocalStorage<BetterUser | null>('user', null);
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      setRole(data.user.role);
      setUser(data.user);
    }
  }, [data]);
  return null;
};
