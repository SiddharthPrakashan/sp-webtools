import { useCallback, useMemo, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {
  CircleAlert,
  CircleCheck,
  LoaderCircle,
  Search,
  ShieldCheck,
  Tag,
} from "lucide-react";

import { Layout } from "@components/Layout";
import { siteConfig, webtoolsChrome } from "@config/site";
import { cn } from "@lib/utils";
import { db, type TagField } from "@ig-followers-check/db";
import { ImportControls } from "@ig-followers-check/components/ImportControls";
import { RecordsGrid } from "@ig-followers-check/components/RecordsGrid";
import {
  parseInstagramFiles,
  saveInstagramRecords,
} from "@ig-followers-check/lib/importer";
import {
  computeStats,
  relationshipOptions,
  tagFields,
  tagStyles,
} from "@ig-followers-check/lib/relationships";
import { useIgSettingsStore } from "@ig-followers-check/stores/settings";

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong.";
}

const exportSteps = [
  "In Instagram, open Accounts Center → Your information and permissions → Export your information.",
  'Create an export to your device, choose "Some of your information" and select only "Followers and following".',
  "Set the format to JSON, request the export and download the ZIP when it's ready.",
  "Select the ZIP here (or the followers, following and pending requests JSON files from inside it).",
];

export default function App() {
  const records = useLiveQuery(() => db.records.toArray(), []);

  const relationship = useIgSettingsStore((state) => state.relationship);
  const setRelationship = useIgSettingsStore((state) => state.setRelationship);
  const tagFilters = useIgSettingsStore((state) => state.tagFilters);
  const toggleTagFilter = useIgSettingsStore((state) => state.toggleTagFilter);

  const [search, setSearch] = useState("");
  const [importing, setImporting] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const stats = useMemo(() => computeStats(records ?? []), [records]);
  const hasRecords = (records?.length ?? 0) > 0;

  const handleImport = async (files: File[]) => {
    setImporting(true);
    setError("");

    try {
      setStatus("Reading your Instagram export…");
      const parsed = await parseInstagramFiles(files);

      setStatus("Saving results on this device…");
      await saveInstagramRecords(parsed);

      setStatus(`Imported ${parsed.size.toLocaleString()} unique accounts.`);
    } catch (err) {
      setStatus("");
      setError(errorMessage(err));
    } finally {
      setImporting(false);
    }
  };

  const handleClear = async () => {
    if (
      !window.confirm(
        "Delete all imported accounts and tags from this browser? This can't be undone.",
      )
    ) {
      return;
    }

    try {
      await db.records.clear();
      setSearch("");
      setError("");
      setStatus("All data cleared from this browser.");
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const handleTagChange = useCallback(
    (username: string, field: TagField, value: boolean) => {
      db.records.update(username, { [field]: value }).catch((err: unknown) => {
        setError(errorMessage(err));
      });
    },
    [],
  );

  return (
    <Layout site={webtoolsChrome} showAds={true}>
      <div className="space-y-8">
        <header className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Instagram Followers Check
          </h1>
          <p className="leading-7 text-muted-foreground">
            See who doesn&apos;t follow you back, who you don&apos;t follow
            back, and your pending follow requests using your official Instagram
            data export.
          </p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            Files are processed in your browser and results are saved only on
            this device. Nothing is uploaded.
          </p>
        </header>

        <section aria-label="Import" className="space-y-4">
          <ImportControls
            importing={importing}
            hasRecords={hasRecords}
            onImport={(files) => void handleImport(files)}
            onClear={() => void handleClear()}
          />

          <div aria-live="polite" className="space-y-2">
            {status && (
              <p className="flex items-center gap-2 text-sm">
                {importing ? (
                  <LoaderCircle
                    className="size-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <CircleCheck
                    className="size-4 text-green-600 dark:text-green-400"
                    aria-hidden="true"
                  />
                )}
                {status}
              </p>
            )}
          </div>
          {error && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300"
            >
              <CircleAlert
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              {error}
            </p>
          )}
        </section>

        {records === undefined ? (
          <p className="flex items-center gap-2 text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Loading saved results…
          </p>
        ) : !hasRecords ? (
          <section
            aria-labelledby="how-heading"
            className="max-w-3xl space-y-4 rounded-xl border p-6"
          >
            <h2 id="how-heading" className="text-xl font-semibold">
              How to get your Instagram export
            </h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              {exportSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ) : (
          <section aria-labelledby="results-heading" className="space-y-5">
            <h2 id="results-heading" className="sr-only">
              Results
            </h2>

            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">
                {stats.followers.toLocaleString()}
              </strong>{" "}
              followers ·{" "}
              <strong className="text-foreground">
                {stats.following.toLocaleString()}
              </strong>{" "}
              following
            </p>

            <div
              role="group"
              aria-label="Show accounts"
              className="grid grid-cols-3 gap-2"
            >
              {relationshipOptions.map((option) => {
                const count = stats[option.value];
                const active = relationship === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRelationship(option.value)}
                    className={cn(
                      "flex flex-col items-start rounded-lg border px-3 py-3 text-left sm:px-4 transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-accent",
                    )}
                  >
                    <span className="text-xl font-bold tabular-nums sm:text-2xl">
                      {count.toLocaleString()}
                    </span>
                    <span
                      className={cn(
                        "text-xs leading-snug sm:text-sm",
                        active
                          ? "text-primary-foreground/80"
                          : "text-muted-foreground",
                      )}
                    >
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full sm:max-w-xs">
                <span className="sr-only">Search username</span>
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search username…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-9 w-full rounded-md border bg-background pr-3 pl-9 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                />
              </label>

              <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <legend className="sr-only">Filter by tag</legend>
                <span
                  aria-hidden="true"
                  className="text-sm text-muted-foreground"
                >
                  Tags:
                </span>
                {tagFields.map((field) => (
                  <label
                    key={field}
                    className="flex cursor-pointer items-center gap-1.5"
                  >
                    <input
                      type="checkbox"
                      checked={tagFilters.includes(field)}
                      onChange={() => toggleTagFilter(field)}
                      className="size-4 accent-primary"
                    />
                    <Tag
                      className={cn("size-4", tagStyles[field].icon)}
                      aria-hidden="true"
                    />
                    <span className="sr-only">{tagStyles[field].name}</span>
                  </label>
                ))}
                <label className="flex cursor-pointer items-center gap-1.5 text-sm">
                  <input
                    type="checkbox"
                    checked={tagFilters.includes("untagged")}
                    onChange={() => toggleTagFilter("untagged")}
                    className="size-4 accent-primary"
                  />
                  Untagged
                </label>
              </fieldset>
            </div>

            <RecordsGrid
              records={records}
              search={search}
              relationship={relationship}
              tagFilters={tagFilters}
              onTagChange={handleTagChange}
            />
            
            <ul className="list-disc pl-4 space-y-1 text-xs text-muted-foreground">
              <li>Tick the tag boxes to mark accounts; tags are kept when you import a newer export.</li>
              <li>Results reflect the export you provided and may not match your current account.</li>
              <li>Some profiles may be deactivated, deleted, suspended, or renamed and therefore may not be accessible.</li>
              <li>{siteConfig.name} is not affiliated with Instagram or Meta.</li>
            </ul>
          </section>
        )}
      </div>
    </Layout>
  );
}
