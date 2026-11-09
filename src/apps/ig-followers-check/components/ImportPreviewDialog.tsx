import { useEffect, useRef } from "react";
import { CircleAlert, FileArchive, FileJson, X } from "lucide-react";

import { Button } from "@ui/button";
import type {
  ExportPreview,
  FileKind,
  PreviewEntry,
} from "@ig-followers-check/lib/importer";

interface ImportPreviewDialogProps {
  preview: ExportPreview;
  onProceed: () => void;
  onCancel: () => void;
}

const kindLabels: Record<FileKind, string> = {
  followers: "Followers",
  following: "Following",
  pending: "Pending requests",
};

function formatBytes(bytes: number | undefined): string {
  if (bytes === undefined) return "—";
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }

  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unit]}`;
}

function EntryList({ entries }: { entries: PreviewEntry[] }) {
  return (
    <ul className="divide-y rounded-md border text-sm">
      {entries.map((entry) => (
        <li
          key={entry.path}
          className="flex items-start justify-between gap-3 px-3 py-2"
        >
          <span className="min-w-0 space-y-1">
            <span className="block font-mono text-xs break-all">
              {entry.path}
            </span>
            {entry.used && entry.kind && (
              <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                {kindLabels[entry.kind]}
              </span>
            )}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {formatBytes(entry.size)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ImportPreviewDialog({
  preview,
  onProceed,
  onCancel,
}: ImportPreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    return () => dialog.close();
  }, []);

  const canProceed = preview.problem === null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="import-preview-title"
      aria-describedby="import-preview-description"
      // Esc closes the dialog natively; treat that as cancel.
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) cancels.
        if (event.target === event.currentTarget) onCancel();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-xl border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/50"
    >
      <div className="flex max-h-[85dvh] flex-col">
        <header className="flex items-start justify-between gap-4 border-b px-5 py-4">
          <div className="space-y-1">
            <h2 id="import-preview-title" className="text-lg font-semibold">
              Review your export
            </h2>
            <p
              id="import-preview-description"
              className="text-sm text-muted-foreground"
            >
              These files were found in your selection. Highlighted files will
              be imported; nothing has been read or saved yet.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Cancel import"
            onClick={onCancel}
          >
            <X aria-hidden="true" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {preview.sources.map((source) => {
            const used = source.entries.filter((entry) => entry.used);
            const other = source.entries.filter((entry) => !entry.used);
            const Icon = source.type === "zip" ? FileArchive : FileJson;

            return (
              <section key={source.name} className="space-y-3">
                <h3 className="flex items-center gap-2 text-sm font-medium">
                  <Icon
                    className="size-4 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-all">{source.name}</span>
                  <span className="shrink-0 font-normal text-muted-foreground">
                    ({formatBytes(source.size)}
                    {source.type === "zip" &&
                      `, ${source.entries.length.toLocaleString()} ${
                        source.entries.length === 1 ? "file" : "files"
                      }`}
                    )
                  </span>
                </h3>

                {source.entries.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    This ZIP file is empty.
                  </p>
                ) : (
                  <>
                    {used.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          Will be imported ({used.length})
                        </p>
                        <EntryList entries={used} />
                      </div>
                    )}

                    {other.length > 0 && (
                      <details open={used.length === 0} className="space-y-2">
                        <summary className="cursor-pointer text-xs font-medium tracking-wide text-muted-foreground uppercase">
                          {used.length > 0 ? "Other files" : "Files"} (
                          {other.length.toLocaleString()}, not imported)
                        </summary>
                        <div className="mt-2">
                          <EntryList entries={other} />
                        </div>
                      </details>
                    )}
                  </>
                )}
              </section>
            );
          })}
        </div>

        <footer className="space-y-3 border-t px-5 py-4">
          {preview.problem && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
            >
              <CircleAlert
                className="mt-0.5 size-4 shrink-0"
                aria-hidden="true"
              />
              {preview.problem}
            </p>
          )}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" disabled={!canProceed} onClick={onProceed}>
              Proceed
            </Button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
