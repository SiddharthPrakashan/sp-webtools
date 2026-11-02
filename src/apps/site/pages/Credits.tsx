import { UserRound } from "lucide-react";

import { SocialIcon } from "@components/SocialIcon";
import type { SocialPlatform } from "@config/site";

interface ProfileLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

interface Startup {
  name: string;
  links: ProfileLink[];
}

interface Person {
  name: string;
  headline: string;
  /** Optional profile photo path. A placeholder avatar is shown when absent. */
  image?: string;
  links: ProfileLink[];
  startup?: Startup;
}

// Source: docs/credits.md. Keep both in sync.
const people: Person[] = [
  {
    name: "Dattatray Patil",
    image: "/assets/credits/1711947698143.jpg",
    headline:
      "Software Engineer | React, Next.js, GenAI | Building Scalable Web & Mobile Applications",
    links: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/work-with-datta-patil",
      },
    ],
  },
  {
    name: "Laxman Kerkar",
    image: "/assets/credits/1764245985774.jpg",
    headline:
      "Founder - Whook Media | AI & Automations | Performance Marketing | SEO | Content Strategist.",
    links: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/laxman-kerkar",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/laxyknowsit",
      },
    ],
    startup: {
      name: "whookmedia",
      links: [
        {
          platform: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/whook-media/home",
        },
        {
          platform: "instagram",
          label: "Instagram",
          href: "https://www.instagram.com/whookmedia",
        },
      ],
    },
  },
  {
    name: "Biswas Tiwari",
    image: "/assets/credits/1687318365078.jpg",
    headline:
      "Entrepreneur | Senior Business Analyst | MBA, Business Analysis, ServiceNow",
    links: [
      {
        platform: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/biswastiwari",
      },
      {
        platform: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/biswas_tiwari",
      },
    ],
    startup: {
      name: "theindianperfumist",
      links: [
        {
          platform: "instagram",
          label: "Instagram",
          href: "https://www.instagram.com/theindianperfumist",
        },
      ],
    },
  },
];

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`Photo of ${name}`}
        width={64}
        height={64}
        loading="lazy"
        className="size-16 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border"
    >
      <UserRound className="size-8" />
    </span>
  );
}

function LinkList({ links, owner }: { links: ProfileLink[]; owner: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <SocialIcon platform={link.platform} className="size-4" />
            {link.label}
            <span className="sr-only">
              {" "}
              profile of {owner} (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Credits() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Special Thanks &amp; Acknowledgements
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          A heartfelt thank you to my friends who generously shared their time,
          ideas, feedback, and encouragement while helping me build SP WebTools.
          Your valuable insights have played an important role in shaping this
          project. I&apos;m grateful for your support and equally proud to
          support your entrepreneurial journeys. Please take a moment to explore
          their startups and businesses below and show them some love!
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <li key={person.name}>
            <article className="flex h-full flex-col gap-5 rounded-xl border p-6">
              <div className="flex items-center gap-4">
                <Avatar name={person.name} image={person.image} />
                <h2 className="text-xl font-semibold tracking-tight">
                  {person.name}
                </h2>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {person.headline}
              </p>

              <LinkList links={person.links} owner={person.name} />

              {person.startup && (
                <div className="mt-auto space-y-3 border-t pt-5">
                  <h3 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    Startup
                  </h3>
                  <p className="font-semibold">{person.startup.name}</p>
                  <LinkList
                    links={person.startup.links}
                    owner={person.startup.name}
                  />
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
