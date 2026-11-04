export interface NavLink {
  label: string;
  href: string;
}

export interface Tool {
  slug: string;
  name: string;
  description: string;
  href: string;
}

export const siteConfig = {
  name: "SP WebTools",
  shortName: "SP WebTools",
  url: "https://webtools.siddharthprakashan.com",
  description: "Independent, privacy-focused browser utilities.",
  author: "Siddharth Prakashan",
  authorUrl: "https://siddharthprakashan.com",
  email: "siddharthdev9999@gmail.com",
} as const;

export type SocialPlatform = "instagram" | "x" | "youtube" | "linkedin";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@siddharth.prakashan",
    href: "https://www.instagram.com/siddharth.prakashan",
  },
  {
    platform: "x",
    label: "X",
    handle: "@sid_prakashan",
    href: "https://x.com/sid_prakashan",
  },
  {
    platform: "youtube",
    label: "YouTube",
    handle: "@siddharth.prakashan",
    href: "https://youtube.com/@siddharth.prakashan",
  },
];

export const tools: Tool[] = [
  {
    slug: "ig-followers-check",
    name: "IG Followers Check",
    description:
      "See who doesn't follow you back using your Instagram data export, processed entirely in your browser.",
    href: "/ig-followers-check/",
  },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  ...tools.map((tool) => ({ label: tool.name, href: tool.href })),
  { label: "About Us", href: "/about-us/" },
  { label: "Credits", href: "/credits/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export const footerNav: NavLink[] = [
  { label: "About Us", href: "/about-us/" },
  { label: "Contact Us", href: "/contact-us/" },
  // { label: "FAQ", href: "/faq/" },
  { label: "Credits", href: "/credits/" },
  // { label: "Disclaimer", href: "/disclaimer/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms and Conditions", href: "/terms-and-conditions/" },
];

/** Branding and navigation for the shared Layout, Navbar and Footer. */
export interface SiteChrome {
  name: string;
  shortName: string;
  /** Home URL, used for the copyright link. */
  url: string;
  logo: string;
  mainNav: NavLink[];
  footerNav: NavLink[];
  /** Text after the copyright line. */
  footerNote?: string;
}

/** SP WebTools: https://webtools.siddharthprakashan.com */
export const webtoolsChrome: SiteChrome = {
  name: siteConfig.name,
  shortName: siteConfig.shortName,
  url: siteConfig.url,
  logo: "/assets/favicon-32x32.png",
  mainNav,
  footerNav,
  footerNote: "MIT licensed. Files never leave your browser.",
};

/** Root website: https://siddharthprakashan.com */
export const rootChrome: SiteChrome = {
  name: siteConfig.author,
  shortName: siteConfig.author,
  url: siteConfig.authorUrl,
  logo: "/assets/favicon-32x32.png",
  mainNav: [
    { label: "Home", href: "/" },
    { label: siteConfig.name, href: `${siteConfig.url}/` },
  ],
  footerNav: [{ label: siteConfig.name, href: `${siteConfig.url}/` }],
  footerNote:
    "Built with care, curiosity, and a commitment to responsible technology.",
};
