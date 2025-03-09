'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createDataTableStore, DataTableStore } from './store';

export type DataTableStoreApi = ReturnType<typeof createDataTableStore>;

export const DataTableStoreContext = createContext<DataTableStoreApi | undefined>(undefined);

export const DataTableProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<DataTableStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createDataTableStore();
  }

  return <DataTableStoreContext.Provider value={storeRef.current}>{children}</DataTableStoreContext.Provider>;
};

export const useDataTableStore = <T,>(selector: (store: DataTableStore) => T): T => {
  const dataTableStoreContext = useContext(DataTableStoreContext);
  if (!dataTableStoreContext) {
    throw new Error('useDataTableStore must be used within a DataTableProvider');
  }
  return useStore(dataTableStoreContext, selector);
};
