"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AffiliateLink } from "@/components/AffiliateLink";

export type FastRow = {
  slug: string;
  name: string;
  homepageUrl: string;
  fastestMethod: string;
  fastestTime: string;
  speedHours: number;
  min?: string | null;
  note?: string | null;
};

function logoUrl(homepageUrl: string): string {
  try {
    const domain = new URL(homepageUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  } catch {
    return "";
  }
}

function initials(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type SortKey = "speed" | "site";

export function FastPayoutsTable({ rows }: { rows: FastRow[] }) {
  const [sort, setSort] = useState<SortKey>("speed");
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const cmp = sort === "site" ? a.name.localeCompare(b.name) : a.speedHours - b.speedHours;
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, asc]);

  function toggle(key: SortKey) {
    if (sort === key) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(true); // speed defaults fastest-first; site defaults A→Z
    }
  }

  const arrow = (key: SortKey) => (sort === key ? (asc ? "▲" : "▼") : "");

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-panel">
      <table className="w-full min-w-[680px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">#</th>
            <th
              className="cursor-pointer select-none px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
              onClick={() => toggle("site")}
            >
              Site <span className="text-accent">{arrow("site")}</span>
            </th>
            <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">Fastest method</th>
            <th
              className="cursor-pointer select-none px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
              onClick={() => toggle("speed")}
            >
              Typical time <span className="text-accent">{arrow("speed")}</span>
            </th>
            <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">Min</th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={r.slug} className="border-b border-border last:border-0 hover:bg-accent/[0.03]">
              <td className="px-3 py-3 font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl(r.homepageUrl)}
                    alt=""
                    width={26}
                    height={26}
                    className="h-[26px] w-[26px] shrink-0 rounded-full border border-border bg-panel2 object-cover"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.display = "grid";
                    }}
                  />
                  <span
                    aria-hidden
                    style={{ display: "none" }}
                    className="h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-accent/20 text-[10px] font-black text-accent"
                  >
                    {initials(r.name)}
                  </span>
                  <Link
                    href={`/sites/${r.slug}`}
                    className="font-semibold text-text underline decoration-dotted decoration-accent/40 underline-offset-4 hover:text-accent"
                  >
                    {r.name}
                  </Link>
                </div>
              </td>
              <td className="px-3 py-3 text-muted">
                {r.fastestMethod}
                {r.note && (
                  <span className="mt-1 block w-fit rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
                    {r.note}
                  </span>
                )}
              </td>
              <td className="whitespace-nowrap px-3 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    r.speedHours < 1
                      ? "bg-accent/15 text-accent"
                      : "border border-border text-muted"
                  }`}
                >
                  {r.speedHours === 0 ? "⚡ " : ""}
                  {r.fastestTime}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-3 text-muted">{r.min ?? "—"}</td>
              <td className="px-3 py-3">
                <AffiliateLink
                  slug={r.slug}
                  name={r.name}
                  source="fast_payouts_table"
                  className="whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-bg hover:opacity-90"
                >
                  Claim
                </AffiliateLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
