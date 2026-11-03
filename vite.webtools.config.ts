import { createSiteConfig, fromRoot } from "./vite.shared.ts";

// SP WebTools: https://webtools.siddharthprakashan.com
export default createSiteConfig({
  root: fromRoot(),
  publicDir: fromRoot("public"),
  outDir: fromRoot("dist-webtools"),
  devPort: 5173,
  previewPort: 4173,
  input: {
    // Main website
    home: fromRoot("index.html"),
    aboutUs: fromRoot("about-us/index.html"),
    privacy: fromRoot("privacy-policy/index.html"),
    termsAndConditions: fromRoot("terms-and-conditions/index.html"),
    contactUs: fromRoot("contact-us/index.html"),
    credits: fromRoot("credits/index.html"),
    disclaimer: fromRoot("disclaimer/index.html"),
    faq: fromRoot("faq/index.html"),
    notFound: fromRoot("404.html"),

    // Utility applications
    igFollowersCheck: fromRoot("ig-followers-check/index.html"),
  },
});
