import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Leaf,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { siteConfig } from "@config/site";

/** Set to an image path (e.g. "/assets/siddharth.jpg") to replace the placeholder. */
const authorImage: string | undefined = "/assets/siddharth.jpeg";

interface VisionItem {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
}

// Source: docs/about-us.md. Keep both in sync.
const vision: VisionItem[] = [
  {
    icon: ShieldCheck,
    title: "Privacy Comes First",
    body: (
      <>
        <p>I believe privacy is a fundamental right, not a premium feature.</p>
        <p>
          {siteConfig.name} is built with a privacy-first approach. Wherever
          possible, files and user inputs are processed directly within your
          browser, without uploading them to our servers.
        </p>
        <p>
          <strong>
            Your data belongs to you, and you should remain in control of it.
          </strong>
        </p>
      </>
    ),
  },
  {
    icon: Accessibility,
    title: "Technology for Everyone",
    body: (
      <>
        <p>
          Technology should be accessible to all, regardless of technical
          knowledge, background, ability, or financial circumstances.
        </p>
        <p>
          My goal is to create tools that are free, easy to understand,
          responsive across devices, and inclusive by design.
        </p>
        <p>
          <strong>
            Good technology should remove barriers, not create them.
          </strong>
        </p>
      </>
    ),
  },
  {
    icon: UsersRound,
    title: "Inclusivity and Community",
    body: (
      <>
        <p>
          I believe that different perspectives, experiences, and ideas make
          technology better.
        </p>
        <p>
          {siteConfig.name} embraces inclusivity, collaboration, and continuous
          learning. Feedback and contributions from users, friends, developers,
          and the wider community help shape the direction of this project.
        </p>
        <p>
          Together, we can build tools that serve a more diverse and connected
          world.
        </p>
      </>
    ),
  },
  {
    icon: Leaf,
    title: "Respect for Nature and Sustainability",
    body: (
      <>
        <p>Innovation should not come at the expense of our planet.</p>
        <p>
          I&apos;m passionate about protecting nature and believe that
          technology has a responsibility to support a more sustainable future.
        </p>
        <p>
          Through lightweight applications, efficient design, and mindful use of
          computing resources, I aim to reduce unnecessary digital waste and
          encourage environmentally responsible technology.
        </p>
        <p>
          <strong>Progress should benefit both people and the planet.</strong>
        </p>
      </>
    ),
  },
];

function AuthorAvatar() {
  if (authorImage) {
    return (
      <img
        src={authorImage}
        alt={`Photo of ${siteConfig.author}`}
        width={160}
        height={160}
        className="size-32 shrink-0 rounded-full object-cover sm:size-40"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-32 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border sm:size-40"
    >
      <UserRound className="size-16 sm:size-20" />
    </span>
  );
}

const prose =
  "space-y-4 leading-7 text-foreground/90 [&_strong]:text-foreground";

export default function AboutUs() {
  return (
    <article className="mx-auto max-w-4xl space-y-16">
      <header className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About Us
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground/90 sm:text-3xl">
          Building Technology That Makes a Difference
        </h2>
        <div className={`${prose} text-lg leading-8`}>
          <p>
            Welcome to <strong>{siteConfig.name}</strong>, a collection of free,
            simple, and accessible online utilities designed to make everyday
            digital tasks easier, faster, and more secure.
          </p>
          <p>
            {siteConfig.name} was founded on a simple belief:{" "}
            <strong>
              Technology should empower everyone, respect their privacy, and
              make a positive difference in the world.
            </strong>
          </p>
        </div>
      </header>

      <section aria-labelledby="developer-heading" className="space-y-6">
        <h2
          id="developer-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          The Developer Behind {siteConfig.name}
        </h2>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
          <AuthorAvatar />
          <div className={prose}>
            <p>
              Hi, I&apos;m <strong>{siteConfig.author}</strong>, a Software
              Engineer with a Bachelor&apos;s degree in Information Technology
              and over{" "}
              <strong>
                6 years of experience as a Full-Stack Software Developer
              </strong>
              .
            </p>
            <p>
              My professional journey involves designing, developing, and
              maintaining scalable software applications, solving complex
              technical challenges, and exploring new technologies.
            </p>
            <p>
              Beyond my professional work, I&apos;m passionate about building
              practical solutions that make technology more useful and
              approachable for everyone.
            </p>
            <p>
              {siteConfig.name} is my initiative to turn that passion into
              something meaningful—a growing collection of tools that anyone can
              use without unnecessary complexity.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="vision-heading" className="space-y-6">
        <h2
          id="vision-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Our Vision
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {vision.map(({ icon: Icon, title, body }) => (
            <section
              key={title}
              aria-label={title}
              className="space-y-4 rounded-xl border p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <div className={`${prose} text-sm leading-6`}>{body}</div>
            </section>
          ))}
        </div>
      </section>

      <section aria-labelledby="ahead-heading" className="space-y-6">
        <h2
          id="ahead-heading"
          className="text-2xl font-semibold tracking-tight"
        >
          Looking Ahead
        </h2>
        <div className={prose}>
          <p>
            {siteConfig.name} is more than a collection of online utilities.
            It&apos;s a personal commitment to responsible innovation,
            continuous improvement, and making useful technology available to
            everyone.
          </p>
          <p>
            As the platform grows, I hope to introduce more practical tools
            while staying true to the values that inspired its creation:{" "}
            <strong>
              privacy, accessibility, inclusivity, simplicity, and
              sustainability.
            </strong>
          </p>
          <p>Thank you for being part of this journey.</p>
        </div>

        <footer className="border-t pt-6">
          <p className="font-semibold">— {siteConfig.author}</p>
          <p className="text-muted-foreground">
            Founder &amp; Developer, {siteConfig.name}
          </p>
        </footer>
      </section>
    </article>
  );
}
