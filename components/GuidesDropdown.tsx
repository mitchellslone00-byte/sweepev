"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const items = [
  { label: "General", href: "/guides" },
  { label: "CrownCoins", href: "/guides/crown-coins" },
  { label: "LuckyLand", href: "/guides/luckyland" },
  { label: "Sweet Sweeps", href: "/guides/sweet-sweeps" },
  { label: "LoneStar", href: "/guides/lonestar" },
  { label: "RealPrize", href: "/guides/realprize" },
  { label: "WOW Vegas", href: "/guides/wow-vegas" },
  { label: "ReBet", href: "/guides/rebet" },
  { label: "Dogg House", href: "/guides/dogghouse" },
];

export function GuidesDropdown() {
  const ref = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = ref.current;
      if (el && el.open && !el.contains(e.target as Node)) {
        el.open = false;
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="relative group">
      <summary className="cursor-pointer hover:text-text list-none [&::-webkit-details-marker]:hidden flex items-center gap-1 select-none">
        Guides <span className="text-[10px] transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-44 rounded-lg border border-border bg-panel shadow-xl p-1.5 z-50">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="block px-3 py-2 text-sm text-text hover:bg-panel2 rounded"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
