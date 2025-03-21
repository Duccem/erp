'use client';
import { createSignUpStore, SignUpStore } from '@/store/auth/sign-up';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export type SignUpStoreApi = ReturnType<typeof createSignUpStore>;

export const SignUpStoreContext = createContext<SignUpStoreApi | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<SignUpStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createSignUpStore();
  }

  return <SignUpStoreContext.Provider value={storeRef.current}>{children}</SignUpStoreContext.Provider>;
};

export const useSignUpStore = <T,>(selector: (store: SignUpStore) => T): T => {
  const signUpStoreContext = useContext(SignUpStoreContext);
  if (!signUpStoreContext) {
    throw new Error('useSignUpStore must be used within a SignUpProvider');
  }
  return useStore(signUpStoreContext, selector);
};
