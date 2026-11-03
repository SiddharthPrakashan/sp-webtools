import type { ReactNode } from "react";

import { Footer } from "@components/Footer";
import { Navbar } from "@components/Navbar";
import type { SiteChrome } from "@config/site";

interface LayoutProps {
  site: SiteChrome;
  children: ReactNode;
}

export function Layout({ site, children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-[3px] focus:ring-ring/50"
      >
        Skip to content
      </a>
      <Navbar site={site} />
      <main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6"
      >
        {children}
      </main>
      <Footer site={site} />
    </div>
  );
}
