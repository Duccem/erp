'use client';
import { createRecoveryPasswordStore, RecoveryPasswordStore } from '@/store/auth/recovery-password';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type RecoveryPasswordApi = ReturnType<typeof createRecoveryPasswordStore>;

export const RecoveryPasswordStoreContext = createContext<RecoveryPasswordApi | undefined>(undefined);

export const RecoveryPasswordProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<RecoveryPasswordApi>(null);
  if (!storeRef.current) {
    storeRef.current = createRecoveryPasswordStore();
  }
  return (
    <RecoveryPasswordStoreContext.Provider value={storeRef.current}>{children}</RecoveryPasswordStoreContext.Provider>
  );
};

export const useRecoveryPasswordStore = <T,>(selector: (store: RecoveryPasswordStore) => T): T => {
  const recoveryPasswordStoreContext = useContext(RecoveryPasswordStoreContext);
  if (!recoveryPasswordStoreContext) {
    throw new Error('useRecoveryPasswordStore must be used within a RecoveryPasswordProvider');
  }
  return useStore(recoveryPasswordStoreContext, selector);
};
