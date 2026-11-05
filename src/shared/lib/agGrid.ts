/**
 * AG Grid setup shared by every utility that shows a data grid.
 *
 * Import this module only from pages that render a grid, so other pages don't
 * load AG Grid. Importing it registers the modules once (side effect).
 */
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

/**
 * Quartz theme driven by the site's CSS variables (src/shared/styles/
 * globals.css), so the grid follows light/dark mode without re-rendering.
 */
export const gridTheme = themeQuartz.withParams({
  fontFamily: "inherit",
  browserColorScheme: "inherit",
  backgroundColor: "var(--background)",
  foregroundColor: "var(--foreground)",
  borderColor: "var(--border)",
  chromeBackgroundColor: "var(--muted)",
  headerBackgroundColor: "var(--muted)",
  accentColor: "var(--primary)",
  checkboxCheckedShapeColor: "var(--primary-foreground)",
  wrapperBorderRadius: "var(--radius)",
});
