import { CircleAlert, X } from "lucide-react";

import { Button } from "@ui/button";
import { cn } from "@lib/utils";

interface ErrorAlertProps {
  /**
   * A specific message the user can act on. When omitted, the generic
   * "Something Went Wrong" message is shown.
   */
  message?: string;
  /** Called when the user closes the alert. */
  onDismiss: () => void;
  className?: string;
}

/** Inline, dismissible error message. */
export function ErrorAlert({ message, onDismiss, className }: ErrorAlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/10 py-3 pr-2 pl-4 text-sm text-red-700 dark:text-red-300",
        className,
      )}
    >
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />

      <div className="min-w-0 flex-1 space-y-2 leading-6">
        {message ? (
          <p>{message}</p>
        ) : (
          <>
            <p className="font-semibold">Something Went Wrong</p>
            <p>An unexpected error occurred. Please try again.</p>
            <p>
              If the issue persists, please{" "}
              <a
                href="/contact-us/"
                className="font-medium underline underline-offset-4"
              >
                contact the developer
              </a>{" "}
              so we can investigate and resolve it.
            </p>
            <p>We apologize for the inconvenience.</p>
          </>
        )}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Dismiss error"
        onClick={onDismiss}
        className="-my-1 size-7 shrink-0 text-current hover:bg-red-500/15 hover:text-current"
      >
        <X aria-hidden="true" />
      </Button>
    </div>
  );
}
