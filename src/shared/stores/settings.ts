import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { ThemePreference } from "@lib/theme";

/**
 * localStorage key for site-wide settings. The pre-paint theme script in
 * `vite.shared.ts` reads `state.theme` from this key; keep them in sync.
 */
export const SETTINGS_STORAGE_KEY = "sp-webtools:settings";

interface SettingsState {
  /** "system" follows the OS setting until the user picks a theme. */
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
