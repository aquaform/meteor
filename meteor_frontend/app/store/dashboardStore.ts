import { create } from "zustand";

interface DashboardState {
  widgetsCount: number;
  widgets: Widget[];
  addNewWidget: (widget: Widget) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  widgetsCount: 0,
  widgets: [],
  addNewWidget: (widget) =>
    set((state) => ({
      widgetsCount: state.widgetsCount + 1,
      widgets: [...state.widgets, widget],
    })),
}));

export default useDashboardStore;
