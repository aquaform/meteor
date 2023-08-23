import { create } from "zustand";

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  indicators: IndicatorData[];
  setIndicators: (indicators: IndicatorData[]) => void;
  language: "ru" | "en";
  setLanguage: (language: "ru" | "en") => void;
}

const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  indicators: [],
  setIndicators: (indicators) => set(() => ({ indicators })),
  language: "ru",
  setLanguage: (language) => set(() => ({ language })),
}));

export default useAppStore;
