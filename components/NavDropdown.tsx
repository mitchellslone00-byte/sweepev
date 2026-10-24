"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export type NavItem = { label: string; href: string };

/**
 * A nav dropdown built on <details>, so it still works without JS and the links
 * stay in the DOM for crawlers. The effects only handle the niceties: closing on
 * an outside click or on Escape.
 *
 * Generic because the bar now carries more than one of these. Keeping the item
 * lists in Header means both menus are defined in the same place as the links
 * beside them, rather than drifting apart in separate files.
 */
export function NavDropdown({ label, items }: { label: string; items: NavItem[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const el = ref.current;
      if (el && el.open && !el.contains(e.target as Node)) el.open = false;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && ref.current?.open) ref.current.open = false;
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <details ref={ref} className="group relative">
      <summary className="flex cursor-pointer list-none select-none items-center gap-1 hover:text-text [&::-webkit-details-marker]:hidden">
        {label}{" "}
        <span className="text-[10px] transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-border bg-panel p-1.5 shadow-xl sm:left-0 sm:right-auto">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={close}
            className="block rounded px-3 py-2 text-sm text-text hover:bg-panel2"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
