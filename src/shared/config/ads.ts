// AdSense IDs come from .env (see .env.example). Never hard-code them.
// Rules for ads: docs/adsense-policy.md.

export const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT;

/** One AdSense ad unit per placement. */
export const adSlots = {
  belowNavbar: import.meta.env.VITE_ADSENSE_SLOT_1,
  aboveFooter: import.meta.env.VITE_ADSENSE_SLOT_2,
} as const;
