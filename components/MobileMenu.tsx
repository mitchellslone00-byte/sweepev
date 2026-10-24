"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CARD_RIPS, DAILY_SC, DISCORD_URL, GUIDES, RANKINGS, STANDALONE } from "@/lib/nav";

// Mirrors the desktop grouping, but as sections rather than dropdowns: there is
// room to show everything at once here, and a menu inside a menu is worse.
const TOP = [{ label: "Home", href: "/" }, CARD_RIPS, DAILY_SC, ...STANDALONE];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => setOpen(false);

  const section = (title: string, items: typeof GUIDES) => (
    <div className="mt-1 border-t border-border pt-1">
      <div className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
        {title}
      </div>
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          onClick={close}
          className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-panel2 hover:text-text"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );

  return (
    <div className="relative md:hidden" ref={ref}>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-panel text-text"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-border bg-panel p-2 shadow-xl">
          {TOP.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-panel2"
            >
              {l.label}
            </Link>
          ))}

          {section("Rankings", RANKINGS)}
          {section("Guides", GUIDES)}

          <div className="mt-1 border-t border-border pt-1">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="block rounded-lg px-3 py-2 text-sm text-text hover:bg-panel2"
            >
              Discord
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
