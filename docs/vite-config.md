
Reuse the existing React + Vite multipage application (MPA), create a separate landing page, and deploy it to siddharthprakashan.com while keeping the Web Tools application at webtools.siddharthprakashan.com.

share the footer, styling, navigation components and SEO utilities without duplicating code.

use separate Vite configurations to build only the required pages.
vite.root.config.ts and vite.webtools.config.ts

| Setting          | Root Website             | Web Tools                         |
| ---------------- | ------------------------ | --------------------------------- |
| Repository       | Same repo                | Same repo                         |
| Build command    | `pnpm build:root`        | `pnpm build:webtools`             |
| Output directory | `dist-root`              | `dist-webtools`                   |
| Custom domain    | `siddharthprakashan.com` | `webtools.siddharthprakashan.com` |


```
{
  "scripts": {
    "build:root": "vite build --config vite.root.config.ts",
    "build:webtools": "vite build --config vite.webtools.config.ts"
  }
}
```

