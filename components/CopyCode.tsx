"use client";

import { useState } from "react";

export function CopyCode({ code, sc }: { code: string; sc: number }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable. No-op
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title="Click to copy"
      aria-label={`Copy code ${code}`}
      className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-panel px-3 py-1.5 transition-colors hover:border-accent"
    >
      <code className="font-mono text-sm font-bold text-text">{code}</code>
      <span className="rounded bg-accent/15 px-1.5 py-0.5 text-xs font-bold text-accent">{sc} SC</span>
      <span className={`text-xs ${copied ? "text-accent" : "text-muted"}`} aria-hidden>
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
