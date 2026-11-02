import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
  CloudOff,
  Download,
  FileJson,
  Gift,
  Hourglass,
  KeyRound,
  Leaf,
  ListChecks,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserMinus,
  UserX,
  Wrench,
} from "lucide-react";

import { buttonVariants } from "@ui/button";
import { siteConfig } from "@config/site";
import { cn } from "@lib/utils";

// Source: docs/home.md. Keep both in sync.

const TOOL_HREF = "/ig-followers-check/";

interface Feature {
  icon: LucideIcon;
  title: string;
  text: string;
}

const checks: Feature[] = [
  {
    icon: UserX,
    title: "Accounts That Don't Follow You Back",
    text: "Find accounts you follow that aren't following you back, based on your exported followers and following lists.",
  },
  {
    icon: UserMinus,
    title: "Accounts You Don't Follow Back",
    text: "Discover accounts that follow you but aren't in your following list.",
  },
  {
    icon: Hourglass,
    title: "Pending Follow Requests",
    text: "View Instagram follow requests you've sent that are still pending according to your exported data, helping you keep track of requests that haven't been accepted.",
  },
];

const benefits: Feature[] = [
  {
    icon: Gift,
    title: "Free to Use",
    text: "Access the tool without subscriptions or hidden charges.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-Focused",
    text: "Your Instagram export files are processed locally in your browser.",
  },
  {
    icon: KeyRound,
    title: "No Instagram Login Required",
    text: "There's no need to share your username, password, or account access.",
  },
  {
    icon: ListChecks,
    title: "Simple and Easy",
    text: "Upload the relevant exported files and explore your results.",
  },
  {
    icon: Smartphone,
    title: "Accessible Across Devices",
    text: "Designed for a smooth experience on desktop and mobile browsers.",
  },
  {
    icon: CloudOff,
    title: "No Live Account Access",
    text: "The tool analyzes your export without connecting to your Instagram account.",
  },
];

const steps: Feature[] = [
  {
    icon: Download,
    title: "Download Your Instagram Data",
    text: "Request your followers, following, and follow-request information through Instagram's official data export feature.",
  },
  {
    icon: FileJson,
    title: "Select Your Export Files",
    text: "Open Instagram Followers Check and select the supported JSON files from your downloaded Instagram data.",
  },
  {
    icon: Sparkles,
    title: "Explore Your Results",
    text: "View your non-mutual followers and pending follow requests in a convenient, easy-to-understand format.",
  },
];

const principles: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Privacy First",
    text: "Keep your files and personal inputs on your device whenever possible.",
  },
  {
    icon: Accessibility,
    title: "Accessible to Everyone",
    text: "Build approachable tools that work across devices and support people with different abilities and technical backgrounds.",
  },
  {
    icon: Wrench,
    title: "Free and Practical",
    text: "Focus on useful functionality without unnecessary complexity.",
  },
  {
    icon: Leaf,
    title: "Mindful Technology",
    text: "Favor lightweight, efficient tools that make responsible use of computing resources.",
  },
];

function CtaLink({
  children,
  size = "md",
}: {
  children: string;
  size?: "md" | "xl";
}) {
  return (
    <a
      href={TOOL_HREF}
      className={cn(
        buttonVariants(),
        "group font-semibold shadow-sm",
        size === "xl"
          ? "h-16 w-full max-w-md rounded-xl px-8 text-lg shadow-lg ring-4 ring-primary/15 hover:shadow-xl sm:h-[4.5rem] sm:w-auto sm:px-12 sm:text-xl [&_svg:not([class*='size-'])]:size-6"
          : "h-12 rounded-lg px-6 text-base [&_svg:not([class*='size-'])]:size-5",
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

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
      {children}
    </h2>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  headingLevel: Heading = "h4",
}: Feature & { headingLevel?: "h3" | "h4" }) {
  return (
    <li className="space-y-3 rounded-xl border p-6">
      <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <Heading className="font-semibold">{title}</Heading>
      <p className="text-sm leading-6 text-muted-foreground">{text}</p>
    </li>
  );
}

export default function Home() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="-mt-10 flex flex-col items-center px-2 pt-12 pb-4 text-center sm:pt-20"
      >
        <h1
          id="hero-heading"
          className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          Instagram Followers Check &amp; Free Online Tools
        </h1>
        <p className="mt-5 text-lg font-semibold text-foreground/90 sm:text-xl">
          Simple tools. Smarter insights. Your privacy matters.
        </p>

        <div className="mt-10 flex w-full justify-center">
          <CtaLink size="xl">Check Your Instagram Followers</CtaLink>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <KeyRound className="size-4" aria-hidden="true" />
            No Instagram login
          </li>
          <li className="flex items-center gap-1.5">
            <ShieldCheck className="size-4" aria-hidden="true" />
            No password sharing
          </li>
          <li className="flex items-center gap-1.5">
            <CloudOff className="size-4" aria-hidden="true" />
            No file uploads to our servers
          </li>
        </ul>

        <div className="mt-12 max-w-2xl space-y-4 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          <p>
            Welcome to{" "}
            <strong className="text-foreground">{siteConfig.name}</strong>, your
            destination for free, easy-to-use online utilities built with
            privacy, accessibility, and simplicity in mind.
          </p>
          <p>
            Our first tool,{" "}
            <strong className="text-foreground">
              Instagram Followers Check
            </strong>
            , helps you understand your Instagram connections by analyzing your
            exported Instagram data directly in your browser.
          </p>
        </div>
      </section>

      {/* Instagram Followers Check */}
      <section aria-labelledby="tool-heading" className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <SectionHeading id="tool-heading">
            Instagram Followers Check
          </SectionHeading>
          <h3 className="text-xl font-semibold">
            Discover Who Doesn&apos;t Follow You Back on Instagram
          </h3>
          <p className="leading-7 text-muted-foreground">
            Ever wondered which Instagram accounts you follow but don&apos;t
            follow you back? Or which follow requests you&apos;ve sent are still
            pending?
          </p>
          <p className="leading-7 text-muted-foreground">
            With{" "}
            <strong className="text-foreground">
              Instagram Followers Check
            </strong>
            , you can explore your Instagram connections using your official
            Instagram data export.
          </p>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-semibold">What Can You Check?</h3>
          <ol className="grid gap-6 md:grid-cols-3">
            {checks.map((check, index) => (
              <li key={check.title} className="space-y-3 rounded-xl border p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <check.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {index + 1}.
                  </span>
                </div>
                <h4 className="font-semibold">{check.title}</h4>
                <p className="text-sm leading-6 text-muted-foreground">
                  {check.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-5">
          <h3 className="text-xl font-semibold">
            Why Use Our Instagram Followers Check?
          </h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <FeatureCard key={benefit.title} {...benefit} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-5 rounded-2xl border bg-muted/50 px-6 py-10 text-center">
          <p className="text-xl font-semibold">
            Ready to understand your Instagram connections?
          </p>
          <CtaLink>Check Your Instagram Followers</CtaLink>
          <p className="max-w-2xl text-sm text-muted-foreground italic">
            Results reflect the Instagram export files you provide and may not
            represent current account activity. {siteConfig.name} is independent
            and is not affiliated with Instagram or Meta.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-heading" className="space-y-8">
        <SectionHeading id="how-heading">
          How Does Instagram Followers Check Work?
        </SectionHeading>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative space-y-3 rounded-xl border p-6"
            >
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Step {index + 1}
              </span>
              <div className="flex items-center gap-3">
                <step.icon className="size-5 shrink-0" aria-hidden="true" />
                <h3 className="font-semibold">{step.title}</h3>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
            Your files are processed directly in your browser without being
            uploaded to our servers.
          </p>
          <CtaLink>Try Instagram Followers Check</CtaLink>
        </div>
      </section>

      {/* Coming soon */}
      <section aria-labelledby="more-heading" className="max-w-3xl space-y-4">
        <SectionHeading id="more-heading">
          More Free Online Tools Are Coming
        </SectionHeading>
        <p className="leading-7 text-muted-foreground">
          Instagram Followers Check is just the beginning.
        </p>
        <p className="leading-7 text-muted-foreground">
          At {siteConfig.name}, we&apos;re building a growing collection of
          practical, browser-based utilities to simplify everyday digital tasks.
          These are planned features and may change as the platform evolves.
        </p>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <SectionHeading id="principles-heading">
            Built with Privacy and Accessibility in Mind
          </SectionHeading>
          <p className="leading-7 text-muted-foreground">
            We believe useful technology should be available to everyone.
          </p>
          <p className="leading-7 text-muted-foreground">
            {siteConfig.name} is guided by four principles:
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <FeatureCard
              key={principle.title}
              {...principle}
              headingLevel="h3"
            />
          ))}
        </ul>
      </section>

      {/* Closing CTA */}
      <section
        aria-labelledby="explore-heading"
        className="flex flex-col items-center gap-6 rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground"
      >
        <h2
          id="explore-heading"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Explore {siteConfig.name}
        </h2>
        <p className="max-w-2xl leading-7 text-primary-foreground/80">
          Whether you&apos;re checking Instagram followers, organizing data, or
          exploring new digital utilities, {siteConfig.name} aims to make
          everyday tasks simpler and more secure.
        </p>
        <p className="font-semibold">Start with our first free tool today.</p>
        <a
          href={TOOL_HREF}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 text-base font-semibold text-primary shadow-sm transition-colors outline-none hover:bg-primary-foreground/90 focus-visible:ring-[3px] focus-visible:ring-primary-foreground/60"
        >
          Open Instagram Followers Check
          <ArrowRight
            className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </a>
        <p className="text-sm text-primary-foreground/70 italic">
          Built with care by {siteConfig.author}.
        </p>
      </section>
    </div>
  );
}
