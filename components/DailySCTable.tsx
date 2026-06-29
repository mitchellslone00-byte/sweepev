"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AffiliateLink } from "@/components/AffiliateLink";

export type DailyRow = {
  slug: string;
  name: string;
  homepageUrl: string;
  amount: number;
  display: string;
  claim: string;
  note: string | null;
  scales: boolean;
  vip?: boolean;
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

type SortKey = "value" | "site";

export function DailySCTable({ rows, maxAmount }: { rows: DailyRow[]; maxAmount: number }) {
  const [sort, setSort] = useState<SortKey>("value");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp: number;
      if (sort === "site") cmp = a.name.localeCompare(b.name);
      else cmp = a.amount - b.amount;
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, asc]);

  function toggle(key: SortKey) {
    if (sort === key) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(key === "site"); // site defaults A→Z, value defaults high→low
    }
  }

  const arrow = (key: SortKey) =>
    sort === key ? (asc ? "▲" : "▼") : "";

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-panel">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">#</th>
            <th
              className="cursor-pointer select-none px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
              onClick={() => toggle("site")}
            >
              Site <span className="text-accent">{arrow("site")}</span>
            </th>
            <th
              className="cursor-pointer select-none px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
              onClick={() => toggle("value")}
            >
              Daily SC <span className="text-accent">{arrow("value")}</span>
            </th>
            <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted">How you claim</th>
            <th
              className="cursor-pointer select-none px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted hover:text-text"
              onClick={() => toggle("value")}
            >
              Monthly value <span className="text-accent">{arrow("value")}</span>
            </th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => {
            const monthly = Math.round(r.amount * 30);
            const width = Math.max(8, Math.round((r.amount / maxAmount) * 100));
            return (
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
                <td className="whitespace-nowrap px-3 py-3 font-mono font-semibold text-accent">{r.display}</td>
                <td className="px-3 py-3 text-muted">
                  <span>{r.claim}</span>
                  {r.note && (
                    <span
                      className={`mt-1 block w-fit rounded border px-1.5 py-0.5 font-mono text-[10px] ${
                        r.vip || r.scales
                          ? "border-accent/40 text-accent"
                          : "border-border text-muted"
                      }`}
                    >
                      {r.vip ? "★ " : r.scales ? "▲ " : ""}
                      {r.note}
                    </span>
                  )}
                </td>
                <td className="px-3 py-3" style={{ minWidth: 170 }}>
                  <span className="font-mono text-sm">≈ ${monthly}/mo</span>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full border border-border bg-panel2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent/50 to-accent"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </td>
                <td className="px-3 py-3">
                  <AffiliateLink
                    slug={r.slug}
                    name={r.name}
                    source="daily_sc_table"
                    className="whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-bg hover:opacity-90"
                  >
                    Claim
                  </AffiliateLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
