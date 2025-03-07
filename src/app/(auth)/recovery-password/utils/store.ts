import { createStore } from 'zustand';

export interface RecoveryPasswordStore {
  showSuccessModal: boolean;
  sended: boolean;
  email: string;
  setEmail: (email: string) => void;
  setShowSuccessModal: (show: boolean) => void;
  setSended: (sended: boolean) => void;
}

export const createRecoveryPasswordStore = () =>
  createStore<RecoveryPasswordStore>((set) => ({
    showSuccessModal: false,
    sended: false,
    email: '',
    setEmail: (email) => set({ email }),
    setShowSuccessModal: (show) => set({ showSuccessModal: show }),
    setSended: (sended) => set({ sended }),
  }));
