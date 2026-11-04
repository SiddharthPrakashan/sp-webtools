/// <reference types="vite/client" />

/** App version from package.json, injected at build time by Vite `define`. */
declare const __APP_VERSION__: string;

interface ImportMetaEnv {
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_ADSENSE_SLOT_1?: string;
  readonly VITE_ADSENSE_SLOT_2?: string;
}
