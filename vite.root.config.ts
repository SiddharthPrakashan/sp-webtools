import {
  createSiteConfig,
  fromRoot,
  sharedPublicFiles,
} from "./vite.shared.ts";

// Root website: https://siddharthprakashan.com
// HTML entries and site-specific static files live in root-site/.
export default createSiteConfig({
  root: fromRoot("root-site"),
  publicDir: fromRoot("root-site/public"),
  outDir: fromRoot("dist-root"),
  devPort: 5174,
  previewPort: 4174,
  input: {
    home: fromRoot("root-site/index.html"),
    notFound: fromRoot("root-site/404.html"),
  },
  // Brand assets shared with SP WebTools.
  plugins: [sharedPublicFiles(["assets", "favicon.ico"])],
});
