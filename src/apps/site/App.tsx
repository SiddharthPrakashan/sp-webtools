import type { ComponentType } from "react";

import { Layout } from "@components/Layout";
import { webtoolsChrome } from "@config/site";
import AboutUs from "@site/pages/AboutUs";
import ContactUs from "@site/pages/ContactUs";
import Credits from "@site/pages/Credits";
import Disclaimer from "@site/pages/Disclaimer";
import Faq from "@site/pages/Faq";
import Home from "@site/pages/Home";
import NotFound from "@site/pages/NotFound";
import PrivacyPolicy from "@site/pages/PrivacyPolicy";
import TermsAndConditions from "@site/pages/TermsAndConditions";

const pages: Record<string, ComponentType> = {
  home: Home,
  "about-us": AboutUs,
  "privacy-policy": PrivacyPolicy,
  "terms-and-conditions": TermsAndConditions,
  "contact-us": ContactUs,
  credits: Credits,
  disclaimer: Disclaimer,
  faq: Faq,
};

interface AppProps {
  page: string | undefined;
}

export default function App({ page }: AppProps) {
  const Page = (page && pages[page]) || NotFound;
  // Ads only on pages listed here. Never on legal/site pages or the 404 page
  // (docs/adsense-policy.md); their HTML entries don't load AdSense either.
  const showAds = Page === Home;

  return (
    <Layout site={webtoolsChrome} showAds={showAds}>
      <Page />
    </Layout>
  );
}
