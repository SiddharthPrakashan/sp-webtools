import { useEffect, useSyncExternalStore } from "react";

import {
  applyTheme,
  getSystemTheme,
  subscribeToSystemTheme,
  type ResolvedTheme,
} from "@lib/theme";
import {
  SETTINGS_STORAGE_KEY,
  useSettingsStore,
} from "@shared/stores/settings";

/** Current theme preference, the theme actually shown, and a setter. */
export function useTheme() {
  const preference = useSettingsStore((state) => state.theme);
  const setTheme = useSettingsStore((state) => state.setTheme);
  const systemTheme = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
  );
  const resolvedTheme: ResolvedTheme =
    preference === "system" ? systemTheme : preference;

  return { preference, resolvedTheme, setTheme };
}

/**
 * Keeps <html> in sync with the theme, including OS changes and changes made
 * in other tabs. Call once per page (the shared Layout does).
 */
export function useApplyTheme() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === SETTINGS_STORAGE_KEY) {
        void useSettingsStore.persist.rehydrate();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
}
