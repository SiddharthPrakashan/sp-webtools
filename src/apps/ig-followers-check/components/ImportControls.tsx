import { useRef } from "react";
import { FileUp, LoaderCircle, Trash2 } from "lucide-react";

import { Button } from "@ui/button";

interface ImportControlsProps {
  importing: boolean;
  hasRecords: boolean;
  onImport: (files: File[]) => void;
  onClear: () => void;
}

export function ImportControls({
  importing,
  hasRecords,
  onImport,
  onClear,
}: ImportControlsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        ref={inputRef}
        id="ig-export-file"
        type="file"
        accept=".zip,.json,application/zip,application/json"
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        disabled={importing}
        onChange={(event) => {
          const files = Array.from(event.currentTarget.files ?? []);
          // Reset so the same file can be picked again, and drop the reference.
          event.currentTarget.value = "";
          if (files.length > 0) onImport(files);
        }}
      />

      <Button
        type="button"
        size="lg"
        disabled={importing}
        onClick={() => inputRef.current?.click()}
      >
        {importing ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <FileUp aria-hidden="true" />
        )}
        {importing
          ? "Importing…"
          : hasRecords
            ? "Import a new export"
            : "Select Instagram export"}
      </Button>

      {hasRecords && (
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={importing}
          onClick={onClear}
        >
          <Trash2 aria-hidden="true" />
          Clear data
        </Button>
      )}
    </div>
  );
}
