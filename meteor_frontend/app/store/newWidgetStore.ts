import { create } from "zustand";

interface NewWidgetState {
  pointId: number;
  setPointId: (pointId: number) => void;
  name: string;
  setName: (name: string) => void;
  chartType: string;
  setChartType: (chartType: string) => void;
  indicators: string[];
  setIndicators: (indicators: string[]) => void;
  customIndicators: CustomIndicator[];
  setCustomIndicators: (customIndicators: CustomIndicator[]) => void;
  editedWidgetName: string;
  setEditedWidgetName: (editedWidgetName: string) => void;
}

const useNewWidgetStore = create<NewWidgetState>((set) => ({
  pointId: 0,
  setPointId: (pointId) => set(() => ({ pointId })),
  name: "",
  setName: (name) => set(() => ({ name })),
  chartType: "",
  setChartType: (chartType) => set(() => ({ chartType })),
  indicators: [],
  setIndicators: (indicators) => set(() => ({ indicators })),
  customIndicators: [],
  setCustomIndicators: (customIndicators) => set(() => ({ customIndicators })),
  editedWidgetName: "",
  setEditedWidgetName: (editedWidgetName) => set(() => ({ editedWidgetName })),
}));

export default useNewWidgetStore;
