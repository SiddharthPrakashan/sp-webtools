import { useEffect, useRef } from "react";

import { adsenseClient } from "@config/ads";
import { cn } from "@lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  /** AdSense ad unit ID, from `adSlots` in `@config/ads`. */
  slot: string | undefined;
  /** AdSense `data-ad-format`. */
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  /** Height reserved before the ad loads, to avoid layout shift. */
  minHeight?: number;
  className?: string;
}

/**
 * The only way to show an ad on this site. Read docs/adsense-policy.md first:
 * no auto-refresh, no ads triggered by clicks, no ads on legal, loading,
 * error or empty screens, and keep ads away from action buttons.
 *
 * Requires the AdSense script in the page's <head>.
 */
export function AdSlot({
  slot,
  format = "auto",
  minHeight = 100,
  className,
}: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    const ins = insRef.current;
    // Push once per mount. The ref survives StrictMode's effect re-run, and
    // AdSense marks filled <ins> elements with data-adsbygoogle-status.
    if (!ins || pushed.current || ins.dataset.adsbygoogleStatus) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // Script blocked or failed. The slot stays empty; nothing to do.
    }
  }, []);

  if (!adsenseClient || !slot) {
    if (!import.meta.env.DEV) return null;
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground",
          className,
        )}
        style={{ minHeight }}
      >
        Ad slot not configured (set VITE_ADSENSE_CLIENT and the slot ID in .env)
      </div>
    );
  }

  return (
    <aside
      aria-label="Advertisement"
      // Collapse when AdSense has no ad to show for this slot.
      className={cn(
        "has-[ins[data-ad-status=unfilled]]:hidden",
        "flex flex-col items-center gap-1",
        className,
      )}
    >
      <span className="text-[11px] tracking-wide text-muted-foreground uppercase">
        Advertisement
      </span>
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{ minHeight }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        data-adtest={import.meta.env.DEV ? "on" : undefined}
      />
    </aside>
  );
}
