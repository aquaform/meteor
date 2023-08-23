import { create } from "zustand";

interface MonitoringState {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedPoint?: Point;
  setSelectedPoint: (selectedPoint: Point) => void;
  isPickingCoordinates: boolean;
  setIsPickingCoordinates: (isPickingCoordinates: boolean) => void;
  pickedCoordinates: { lng: number; lat: number };
  setPickedCoordinates: (pickedCoordinates: {
    lng: number;
    lat: number;
  }) => void;
}

const useMonitoringStore = create<MonitoringState>((set) => ({
  isEditModalOpen: false,
  setIsEditModalOpen: (isEditModalOpen) =>
    set(() => ({
      isEditModalOpen,
    })),
  setSelectedPoint: (selectedPoint) =>
    set(() => ({
      selectedPoint,
    })),
  isPickingCoordinates: false,
  setIsPickingCoordinates: (isPickingCoordinates) =>
    set(() => ({
      isPickingCoordinates,
    })),
  pickedCoordinates: { lng: 0, lat: 0 },
  setPickedCoordinates: (pickedCoordinates) =>
    set(() => ({
      pickedCoordinates,
    })),
}));

export default useMonitoringStore;
