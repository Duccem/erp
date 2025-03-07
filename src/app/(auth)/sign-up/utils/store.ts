import { createStore } from 'zustand';

export interface SignUpStore {
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
  verifying: boolean;
  setVerifying: (verifying: boolean) => void;
  verification: {
    state: '' | 'pending' | 'success' | 'error';
    code: string;
    error: string;
  };
  setVerification: (verification: SignUpStore['verification']) => void;
  signEmail: string;
  setSignEmail: (email: string) => void;
}

export const createSignUpStore = () =>
  createStore<SignUpStore>((set) => ({
    showSuccessModal: false,
    verifying: false,
    verification: {
      state: '',
      code: '',
      error: '',
    },
    signEmail: '',
    setSignEmail: (email) => set({ signEmail: email }),
    setShowSuccessModal: (show) => set({ showSuccessModal: show }),
    setVerifying: (verifying) => set({ verifying }),
    setVerification: (verification) => set({ verification }),
  }));
