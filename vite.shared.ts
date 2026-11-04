import { cpSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, type Plugin, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";

/** Absolute path of the repository root. */
export const repoRoot = path.dirname(fileURLToPath(import.meta.url));

export const fromRoot = (...segments: string[]) =>
  path.resolve(repoRoot, ...segments);

const pkg = JSON.parse(readFileSync(fromRoot("package.json"), "utf-8")) as {
  version: string;
};

/**
 * Makes files from the shared `public/` folder available to a site that uses
 * a different `publicDir`. Serves them in dev and copies them on build, so
 * brand assets (logo, favicons) are not duplicated across sites.
 */
export function sharedPublicFiles(entries: string[]): Plugin {
  const source = fromRoot("public");
  let outDir = "";

  return {
    name: "sp:shared-public-files",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        const match = entries.some(
          (entry) => url === `/${entry}` || url.startsWith(`/${entry}/`),
        );
        if (match) {
          serveFile(req, path.join(source, decodeURIComponent(url)), source);
        }
        next();
      });
    },
    writeBundle() {
      for (const entry of entries) {
        cpSync(path.join(source, entry), path.join(outDir, entry), {
          recursive: true,
        });
      }
    },
  };
}

/** Rewrites a dev request to Vite's /@fs/ handler if it maps to a file. */
function serveFile(req: { url?: string }, file: string, base: string) {
  if (file.startsWith(base + path.sep) && existsSync(file)) {
    req.url = `/@fs/${file.replace(/\\/g, "/")}`;
  }
}

/**
 * Dev only: for sites whose Vite root is a subfolder, HTML entries reference
 * their script as `../src/...`, which the dev server would look up inside
 * that subfolder. Point it at the repo's src/ instead. Builds resolve it
 * natively.
 */
function repoSourceInDev(): Plugin {
  const source = `/@fs/${fromRoot("src").replace(/\\/g, "/")}/`;

  return {
    name: "sp:repo-source-in-dev",
    apply: "serve",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replaceAll('src="../src/', `src="${source}`),
    },
  };
}

/**
 * Sets the theme on <html> before first paint so pages don't flash the wrong
 * theme. Mirrors applyTheme() in src/shared/lib/theme.ts and reads the
 * Zustand store persisted under SETTINGS_STORAGE_KEY in
 * src/shared/stores/settings.ts; keep all three in sync.
 */
function themeScript(): Plugin {
  const code = `(function () {
  var t;
  try {
    var s = JSON.parse(localStorage.getItem("sp-webtools:settings") || "null");
    t = s && s.state && s.state.theme;
  } catch (e) {}
  if (t !== "light" && t !== "dark") {
    t = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  var r = document.documentElement;
  if (t === "dark") r.classList.add("dark");
  r.style.colorScheme = t;
})();`;

  return {
    name: "sp:theme-script",
    transformIndexHtml: () => [
      { tag: "script", children: code, injectTo: "head-prepend" },
    ],
  };
}

interface SiteConfigOptions {
  /** Folder containing the site's HTML entries. */
  root: string;
  /** Build output folder. */
  outDir: string;
  /** Static files copied as-is to the output. */
  publicDir: string;
  /** HTML entries, keyed by chunk name. */
  input: Record<string, string>;
  devPort: number;
  previewPort: number;
  plugins?: Plugin[];
}

/** Config shared by every site built from this repo. */
export function createSiteConfig(options: SiteConfigOptions): UserConfig {
  return defineConfig({
    root: options.root,
    publicDir: options.publicDir,
    envDir: repoRoot,
    cacheDir: fromRoot("node_modules/.vite", path.basename(options.outDir)),
    plugins: [
      mkcert(),
      react(),
      tailwindcss(),
      themeScript(),
      ...(path.resolve(options.root) === repoRoot ? [] : [repoSourceInDev()]),
      ...(options.plugins ?? []),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
    },
    resolve: {
      alias: {
        "@": fromRoot("src"),

        // Shared resources
        "@shared": fromRoot("src/shared"),
        "@components": fromRoot("src/shared/components"),
        "@ui": fromRoot("src/shared/components/ui"),
        "@config": fromRoot("src/shared/config"),
        "@hooks": fromRoot("src/shared/hooks"),
        "@lib": fromRoot("src/shared/lib"),
        "@styles": fromRoot("src/shared/styles"),

        // Individual applications
        "@apps": fromRoot("src/apps"),
        "@site": fromRoot("src/apps/site"),
        "@root": fromRoot("src/apps/root"),
        "@ig-followers-check": fromRoot("src/apps/ig-followers-check"),
      },
    },

    server: {
      host: "0.0.0.0",
      port: options.devPort,
      strictPort: true,
    },

    preview: {
      host: "0.0.0.0",
      port: options.previewPort,
      strictPort: true,
    },

    build: {
      outDir: options.outDir,
      emptyOutDir: true,
      sourcemap: false,

      rollupOptions: {
        input: options.input,

        // Give shared chunks stable, meaningful names instead of letting the
        // bundler name them after whichever module it happens to see first.
        output: {
          codeSplitting: {
            groups: [
              { name: "vendor", test: /[\\/]node_modules[\\/]/ },
              { name: "shared", test: /[\\/]src[\\/]shared[\\/]/ },
            ],
          },
        },
      },
    },
  });
}
