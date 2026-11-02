import type { ReactNode } from "react";

import { siteConfig, socialLinks } from "@config/site";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

/**
 * Document-style layout for legal pages. Styles plain semantic HTML
 * (h2, h3, p, ul, strong, code, a, hr) so page content can mirror its
 * Markdown source in docs/.
 */
export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <article
      className={[
        "mx-auto max-w-3xl text-base leading-7 text-foreground/90",
        "[&_p]:my-4",
        "[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:scroll-mt-20 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground",
        "[&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:pl-1 [&_li]:marker:text-muted-foreground",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
        "[&_a]:font-medium [&_a]:wrap-break-word [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-muted-foreground",
        "[&_hr]:my-10 [&_hr]:border-border",
      ].join(" ")}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3!">
          <strong>Last updated: {lastUpdated}</strong>
        </p>
      </header>
      {children}
    </article>
  );
}

/** "Website / Email / Social Media" block used in each legal page's Contact section. */
export function LegalContact() {
  return (
    <>
      <p>
        <strong>Website:</strong> <a href={siteConfig.url}>{siteConfig.url}</a>
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
      <p>
        <strong>Social Media:</strong>{" "}
        {socialLinks.map((social, index) => (
          <span key={social.platform}>
            {index > 0 && ", "}
            <a href={social.href} target="_blank" rel="me noopener noreferrer">
              {social.label}
            </a>
          </span>
        ))}
      </p>
    </>
  );
}
