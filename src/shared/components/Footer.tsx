import { SocialIcon } from "@components/SocialIcon";
import { footerNav, siteConfig, socialLinks } from "@config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p>
            &copy; {year}{" "}
            <a
              href={siteConfig.url}
              className="underline-offset-4 hover:text-foreground hover:underline"
            >
              {siteConfig.shortName}
            </a>
            . MIT licensed. Files never leave your browser.
          </p>

          <ul
            aria-label="Social media"
            className="-ml-2 flex items-center gap-1"
          >
            {socialLinks.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  title={social.label}
                  className="flex size-9 items-center justify-center rounded-md transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  <SocialIcon platform={social.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="underline-offset-4 hover:text-foreground hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
