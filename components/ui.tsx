import { useEffect, useState } from "react";

export function Eyebrow({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow">
      {dot && <span className="eyebrow-dot" />}
      <span>{children}</span>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="a-pill">{children}</span>;
}

type CopyState = "idle" | "copied" | "error";

export function CopyEmailButton({
  email,
  label,
  successMessage,
  errorMessage,
}: {
  email: string;
  label: string;
  successMessage: string;
  errorMessage: string;
}) {
  const [state, setState] = useState<CopyState>("idle");

  useEffect(() => {
    if (state !== "copied") return;
    const resetTimer = window.setTimeout(() => setState("idle"), 3000);
    return () => window.clearTimeout(resetTimer);
  }, [state]);

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  const status = state === "copied" ? successMessage : state === "error" ? errorMessage : "";

  return (
    <div className={`copy-email${state !== "idle" ? ` is-${state}` : ""}`}>
      <button type="button" className="copy-email-button" onClick={copyEmail}>
        {label}
      </button>
      <span className="copy-email-status" aria-live="polite" aria-atomic="true">
        {status}
      </span>
    </div>
  );
}
