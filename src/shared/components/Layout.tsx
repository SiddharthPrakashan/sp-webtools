import type { ReactNode } from "react";

import { AdSlot } from "@components/AdSlot";
import { Footer } from "@components/Footer";
import { Navbar } from "@components/Navbar";
import { adSlots } from "@config/ads";
import type { SiteChrome } from "@config/site";
import { useApplyTheme } from "@hooks/useTheme";

interface LayoutProps {
  site: SiteChrome;
  children: ReactNode;
  /**
   * Show the ad slots below the navbar and above the footer. Off by default.
   * Never enable on legal/site pages or on loading, error or empty screens
   * (docs/adsense-policy.md). The page's HTML entry must load the AdSense
   * script.
   */
  showAds?: boolean;
}

const adContainer = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export function Layout({ site, children, showAds = false }: LayoutProps) {
  useApplyTheme();

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:ring-[3px] focus:ring-ring/50"
      >
        Skip to content
      </a>
      <Navbar site={site} />
      {showAds && (
        <AdSlot
          slot={adSlots.belowNavbar}
          format="horizontal"
          minHeight={90}
          className={`${adContainer} pt-4`}
        />
      )}
      <main
        id="main"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6"
      >
        {children}
      </main>
      {showAds && (
        <AdSlot
          slot={adSlots.aboveFooter}
          format="horizontal"
          minHeight={90}
          className={`${adContainer} pb-6`}
        />
      )}
      <Footer site={site} />
    </div>
  );
}
