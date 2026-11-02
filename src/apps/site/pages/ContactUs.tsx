import { Bug, Lightbulb, Mail, MessageSquare, ShieldCheck } from "lucide-react";

import { SocialIcon } from "@components/SocialIcon";
import { siteConfig, socialLinks } from "@config/site";

const topics = [
  {
    icon: Bug,
    title: "Bug reports",
    text: "Something not working as expected? Tell me which utility you used, your browser and device, and the steps that led to the problem.",
  },
  {
    icon: Lightbulb,
    title: "Feature ideas",
    text: "Have an idea for a new utility or an improvement to an existing one? Suggestions are always welcome.",
  },
  {
    icon: MessageSquare,
    title: "General questions",
    text: "Questions about how a tool works, privacy, or anything else about the site.",
  },
];

const cardLink =
  "rounded-xl border transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50";

export default function ContactUs() {
  return (
    <article className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground">
          {siteConfig.name} is an independent project built and maintained by{" "}
          {siteConfig.author}. Whether you found a bug, have an idea, or just
          want to say hello, I&apos;d love to hear from you.
        </p>
      </header>

      <section aria-labelledby="email-heading" className="space-y-4">
        <h2 id="email-heading" className="text-xl font-semibold">
          Email
        </h2>
        <a
          href={`mailto:${siteConfig.email}`}
          className={`flex items-center gap-4 p-5 ${cardLink}`}
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium">Send an email</span>
            <span className="block break-all text-muted-foreground">
              {siteConfig.email}
            </span>
          </span>
        </a>
        <p className="text-sm text-muted-foreground">
          Email is the best way to reach me. I read every message, though
          replies may take a few days.
        </p>
      </section>

      <section aria-labelledby="social-heading" className="space-y-4">
        <h2 id="social-heading" className="text-xl font-semibold">
          Social media
        </h2>
        <ul className="grid gap-3 sm:grid-cols-3">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="me noopener noreferrer"
                className={`flex h-full items-center gap-3 p-4 ${cardLink}`}
              >
                <SocialIcon
                  platform={social.platform}
                  className="size-5 shrink-0"
                />
                <span className="min-w-0">
                  <span className="block font-medium">{social.label}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {social.handle}
                  </span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="topics-heading" className="space-y-4">
        <h2 id="topics-heading" className="text-xl font-semibold">
          What you can reach out about
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {topics.map(({ icon: Icon, title, text }) => (
            <li key={title} className="space-y-2 rounded-xl border p-5">
              <Icon
                className="size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside
        aria-labelledby="privacy-heading"
        className="flex gap-4 rounded-xl border bg-muted/50 p-5"
      >
        <ShieldCheck
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
        <div className="space-y-1">
          <h2 id="privacy-heading" className="font-medium">
            Please don&apos;t send your files
          </h2>
          <p className="text-sm text-muted-foreground">
            Every utility on this site processes files locally in your browser,
            and nothing is uploaded. When reporting a problem, a description of
            the issue is enough, so please don&apos;t attach personal data
            exports or other private files. There is no contact form here:
            messages go straight to my inbox and are only used to reply to you.
          </p>
        </div>
      </aside>
    </article>
  );
}
