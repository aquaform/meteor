import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { create } from "zustand";

const columnHelper = createColumnHelper<any>();

interface Item {
  number: number;
  date: string;
  temperature: number;
  windSpeed: number;
}

interface HistoryState {
  columns: ColumnDef<Item, any>[];
  setColumns: (columns: {
    [key: string]: { active: boolean; unit: string };
  }) => void;
  points: Point[];
  setPoints: (points: Point[]) => void;
  selectedPointId: number | null;
  setSelectedPointId: (selectedPointId: number) => void;
}

const useHistoryStore = create<HistoryState>((set) => ({
  columns: [],
  setColumns: (columns) => {
    const newColumns = Object.keys(columns)
      .filter((column) => columns[column].active)
      .map((column) =>
        columnHelper.accessor(column, {
          id: column,
          header: () =>
            `${column}${
              columns[column].unit ? `, ${columns[column].unit}` : ""
            }`,
          cell: (info) => info.getValue(),
        })
      );

    set(
      () =>
        ({
          columns: newColumns,
        } as HistoryState)
    );
  },
  points: [],
  setPoints: (points) => set(() => ({ points })),
  selectedPointId: null,
  setSelectedPointId: (selectedPointId) => set(() => ({ selectedPointId })),
}));

export default useHistoryStore;
