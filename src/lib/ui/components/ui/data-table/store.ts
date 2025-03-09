import { RowSelectionState, Updater } from '@tanstack/react-table';
import { create } from 'zustand';

export interface DataTableStore {
  columns: any[];
  rowSelection: Record<string, boolean>;
  setColumns: (columns: any[]) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
}

export const createDataTableStore = () =>
  create<DataTableStore>()((set) => ({
    columns: [],
    rowSelection: {},
    setColumns: (columns) => set({ columns }),
    setRowSelection: (updater: Updater<RowSelectionState>) =>
      set((state) => ({ rowSelection: typeof updater === 'function' ? updater(state.rowSelection) : updater })),
  }));
