import { create } from "zustand";

interface State {
  isSidebarMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUiStore = create<State>((set) => ({
  isSidebarMenuOpen: false,
  openSideMenu: () => set({ isSidebarMenuOpen: true }),
  closeSideMenu: () => set({ isSidebarMenuOpen: false }),
}));
