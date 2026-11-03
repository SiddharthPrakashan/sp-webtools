import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowDown,
  ArrowRight,
  Check,
  Hourglass,
  Leaf,
  ShieldCheck,
  Users,
  UserMinus,
  UserX,
  Wrench,
} from "lucide-react";

import { SocialIcon } from "@components/SocialIcon";
import { buttonVariants } from "@ui/button";
import { siteConfig, socialLinks, tools } from "@config/site";
import { cn } from "@lib/utils";

// Source: docs/root-site.md. Keep both in sync.

// Swap for a real photo (square, at least 320x320) in root-site/public/images/.
const PROFILE_PHOTO = "/images/siddharth.jpeg";

const WEBTOOLS_HREF = `${siteConfig.url}/`;
const IG_TOOL = tools.find((tool) => tool.slug === "ig-followers-check");
const IG_TOOL_HREF = `${siteConfig.url}${IG_TOOL?.href ?? "/"}`;

interface Item {
  icon: LucideIcon;
  title: string;
  text: string;
}

const capabilities: Item[] = [
  {
    icon: UserX,
    title: "Find Non-Followers",
    text: "See which accounts you follow that don't follow you back.",
  },
  {
    icon: UserMinus,
    title: "Find Accounts You Don't Follow Back",
    text: "Identify followers you're not following.",
  },
  {
    icon: Hourglass,
    title: "Check Pending Follow Requests",
    text: "Review follow requests you've sent that haven't been accepted, according to your exported data.",
  },
  {
    icon: ShieldCheck,
    title: "Protect Your Privacy",
    text: "Analyze your files locally without uploading them to our servers.",
  },
];

const reasons = [
  "Free to use.",
  "No Instagram login or password required.",
  "No connection to your Instagram account.",
  "Browser-based file processing.",
  "Simple and convenient to use.",
];

const ideas: (Item & { extra?: string })[] = [
  {
    icon: ShieldCheck,
    title: "Privacy Is a Priority",
    text: "I believe people should have control over their personal data. Wherever practical, I build tools that process information directly on the user's device rather than requiring unnecessary server uploads.",
  },
  {
    icon: Accessibility,
    title: "Technology Should Be Accessible",
    text: "Useful technology should be available to everyone, regardless of technical experience, background, ability, or financial circumstances.",
    extra:
      "I aim to build intuitive, inclusive digital experiences that remove barriers instead of creating them.",
  },
  {
    icon: Users,
    title: "Learning, Sharing & Collaboration",
    text: "Software development is a continuous learning journey. I value open-source technology, constructive feedback, and the contributions of people who share their knowledge and ideas.",
  },
  {
    icon: Leaf,
    title: "Respect for Nature",
    text: "I believe technological progress should go hand in hand with environmental responsibility. I value lightweight, efficient applications and thoughtful use of digital resources, while recognizing that sustainability requires continuous improvement.",
  },
];

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function ArrowLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: string;
  variant?: "default" | "outline";
}) {
  return (
    <a
      href={href}
      className={cn(
        buttonVariants({ variant }),
        "group h-auto min-h-12 rounded-lg px-6 py-3 text-center text-base font-semibold whitespace-normal [&_svg:not([class*='size-'])]:size-5",
      )}
    >
      {children}
      <ArrowRight
        className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
        aria-hidden="true"
      />
    </a>
  );
}

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Intro */}
      <section
        aria-labelledby="intro-heading"
        className="flex flex-col items-center gap-10 pt-6 text-center md:flex-row md:items-center md:gap-14 md:pt-12 md:text-left"
      >
        <img
          src={PROFILE_PHOTO}
          alt="Siddharth Prakashan"
          width={256}
          height={256}
          className="size-40 shrink-0 rounded-full border-4 border-background object-cover shadow-lg ring-1 ring-border sm:size-52 md:size-64"
        />

        <div className="space-y-5">
          <div className="space-y-3">
            <h1
              id="intro-heading"
              className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl"
            >
              {siteConfig.author}
            </h1>
            <p className="text-lg font-semibold text-foreground/90 sm:text-xl">
              Software Engineer | Full-Stack Developer | Technology Enthusiast
            </p>
          </div>

          <h2 className="text-xl font-semibold">
            Building Useful Technology for Everyone
          </h2>

          <div className="max-w-2xl space-y-4 leading-7 text-muted-foreground">
            <p>
              Hello! I&apos;m{" "}
              <strong className="text-foreground">{siteConfig.author}</strong>,
              a software engineer with a Bachelor&apos;s degree in Information
              Technology and over{" "}
              <strong className="text-foreground">6 years of experience</strong>{" "}
              designing, developing, and maintaining scalable software
              applications.
            </p>
            <p>
              I enjoy transforming ideas into practical digital solutions that
              solve everyday problems. My work spans web development, software
              engineering, and exploring technologies that make digital
              experiences simpler, safer, and more accessible.
            </p>
            <p>
              This website is my personal space to share projects, experiments,
              and tools I&apos;ve built along the way.
            </p>
          </div>

          <a
            href="#projects"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "group h-auto min-h-12 rounded-lg px-6 py-3 text-center text-base font-semibold whitespace-normal [&_svg:not([class*='size-'])]:size-5",
            )}
          >
            Explore My Projects
            <ArrowDown
              className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
        </div>
      </section>

      {/* Featured project */}
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="scroll-mt-20 space-y-10"
      >
        <div className="max-w-3xl space-y-4">
          <SectionHeading id="projects-heading">
            Featured Project: SP WebTools
          </SectionHeading>
          <h3 className="text-xl font-semibold">
            Free Online Tools, Built with Privacy in Mind
          </h3>
          <p className="leading-7 text-muted-foreground">
            <strong className="text-foreground">{siteConfig.name}</strong> is my
            initiative to create a growing collection of free, easy-to-use
            browser-based utilities.
          </p>
          <p className="leading-7 text-muted-foreground">
            The idea is simple: everyday digital tasks shouldn&apos;t require
            complicated software, unnecessary subscriptions, or compromising
            your personal information.
          </p>
          <p className="leading-7 text-muted-foreground">
            The tools focus on simplicity, accessibility, and privacy, with
            user-provided files and inputs processed directly in the browser.
          </p>
        </div>

        <article
          aria-labelledby="ig-heading"
          className="space-y-8 rounded-2xl border p-6 sm:p-10"
        >
          <div className="max-w-3xl space-y-4">
            <h3 id="ig-heading" className="text-2xl font-bold tracking-tight">
              Instagram Followers Check
            </h3>
            <p className="text-lg font-semibold">
              Discover who doesn&apos;t follow you back and review your pending
              Instagram follow requests.
            </p>
            <p className="leading-7 text-muted-foreground">
              Have you ever wondered which Instagram accounts you follow but
              don&apos;t follow you back? Or how many follow requests
              you&apos;ve sent are still pending?
            </p>
            <p className="leading-7 text-muted-foreground">
              My first web tool,{" "}
              <strong className="text-foreground">
                Instagram Followers Check
              </strong>
              , helps you understand your Instagram connections by analyzing
              data you&apos;ve downloaded from Instagram.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              <h4 className="font-semibold">What can you do?</h4>
              <ul className="grid gap-4 sm:grid-cols-2">
                {capabilities.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <p className="font-medium">{title}</p>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Why use it?</h4>
              <ul className="space-y-2 text-muted-foreground">
                {reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <Check
                      className="mt-1 size-4 shrink-0 text-foreground"
                      aria-hidden="true"
                    />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <ArrowLink href={IG_TOOL_HREF}>
              Try Instagram Followers Check
            </ArrowLink>
            <p className="max-w-3xl text-sm text-muted-foreground italic">
              The tool analyzes your exported Instagram data and does not
              provide live Instagram account information. It is an independent
              project and is not affiliated with Instagram or Meta.
            </p>
          </div>
        </article>
      </section>

      {/* More on the way */}
      <section aria-labelledby="more-heading" className="max-w-3xl space-y-4">
        <SectionHeading id="more-heading">
          More Projects &amp; Tools on the Way
        </SectionHeading>
        <p className="leading-7 text-muted-foreground">
          Instagram Followers Check is just the beginning.
        </p>
        <p className="leading-7 text-muted-foreground">
          I&apos;m continuously exploring ideas and developing useful tools for
          developers, students, professionals, and everyday internet users.
        </p>
        <div className="space-y-3 rounded-xl border bg-muted/50 p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Wrench className="size-5" aria-hidden="true" />
            Developer &amp; Productivity Tools
          </h3>
          <p className="text-sm leading-6 text-muted-foreground">
            A growing selection of practical utilities for common development
            tasks, data processing, and everyday productivity.
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            These tools are currently planned, and their availability and
            features may change during development.
          </p>
        </div>
        <ArrowLink href={WEBTOOLS_HREF} variant="outline">
          Explore SP WebTools
        </ArrowLink>
      </section>

      {/* Ideas */}
      <section aria-labelledby="ideas-heading" className="space-y-8">
        <SectionHeading id="ideas-heading">
          The Ideas Behind My Work
        </SectionHeading>
        <ul className="grid gap-6 sm:grid-cols-2">
          {ideas.map(({ icon: Icon, title, text, extra }) => (
            <li key={title} className="space-y-3 rounded-xl border p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{text}</p>
              {extra && (
                <p className="text-sm leading-6 text-muted-foreground">
                  {extra}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section aria-labelledby="about-heading" className="max-w-3xl space-y-4">
        <SectionHeading id="about-heading">
          A Little More About Me
        </SectionHeading>
        <p className="leading-7 text-muted-foreground">
          Beyond writing code, I enjoy exploring new technologies, solving
          interesting problems, and finding creative ways to make software more
          useful.
        </p>
        <p className="leading-7 text-muted-foreground">
          My experience as a full-stack developer has taught me that good
          software isn&apos;t just about functionality. It&apos;s also about
          reliability, simplicity, accessibility, and understanding the people
          who use it.
        </p>
        <p className="leading-7 text-muted-foreground">
          Through my personal projects, I hope to contribute small but
          meaningful solutions that make everyday digital experiences better.
        </p>
      </section>

      {/* Connect */}
      <section
        aria-labelledby="connect-heading"
        className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground"
      >
        <h2
          id="connect-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Explore, Connect &amp; Share Ideas
        </h2>
        <div className="max-w-2xl space-y-3 leading-7 text-primary-foreground/80">
          <p className="font-semibold text-primary-foreground">
            Thanks for visiting my website!
          </p>
          <p>
            Whether you&apos;re here to try a tool, explore my work, or share an
            idea, I appreciate your interest.
          </p>
          <p>
            Have feedback, suggestions, or an idea for a useful web tool? Feel
            free to connect with me through the contact links provided on this
            website.
          </p>
        </div>

        <ul aria-label="Social media" className="flex items-center gap-2">
          {socialLinks.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={`${social.label} (opens in a new tab)`}
                title={social.label}
                className="flex size-11 items-center justify-center rounded-full border border-primary-foreground/30 transition-colors outline-none hover:bg-primary-foreground/10 focus-visible:ring-[3px] focus-visible:ring-primary-foreground/60"
              >
                <SocialIcon platform={social.platform} className="size-5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          {[
            { href: WEBTOOLS_HREF, label: "Visit SP WebTools" },
            { href: IG_TOOL_HREF, label: "Open Instagram Followers Check" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-base font-semibold text-primary shadow-sm transition-colors outline-none hover:bg-primary-foreground/90 focus-visible:ring-[3px] focus-visible:ring-primary-foreground/60"
            >
              {link.label}
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
