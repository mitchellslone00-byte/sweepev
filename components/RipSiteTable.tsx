"use client";

import { useMemo, useState } from "react";
import { AffiliateLink } from "@/components/AffiliateLink";

export type RipRow = {
  slug: string;
  name: string;
  homepageUrl: string;
  hasReferral: boolean;
  rating: number;
  signupOffer: string;
  buybackRate: string;
  buybackPaidIn: string;
  buybackIsCash: boolean;
  shipsCards: boolean;
  oddsPublished: boolean;
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

type SortKey = "rating" | "site";

export function RipSiteTable({ rows }: { rows: RipRow[] }) {
  const [sort, setSort] = useState<SortKey>("rating");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const cmp = sort === "site" ? a.name.localeCompare(b.name) : a.rating - b.rating;
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort, asc]);

  function toggle(key: SortKey) {
    if (sort === key) setAsc((v) => !v);
    // Rating reads best-first, name reads A to Z.
    else {
      setSort(key);
      setAsc(key === "site");
    }
  }

  const arrow = (key: SortKey) => (sort === key ? (asc ? "▲" : "▼") : "");
  const th =
    "px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted";

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-panel">
      <table className="w-full min-w-[820px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className={th}>#</th>
            <th
              className={`${th} cursor-pointer select-none hover:text-text`}
              onClick={() => toggle("site")}
            >
              Site <span className="text-accent">{arrow("site")}</span>
            </th>
            <th className={th}>Signup offer</th>
            <th
              className={`${th} cursor-pointer select-none hover:text-text`}
              onClick={() => toggle("rating")}
            >
              Buyback <span className="text-accent">{arrow("rating")}</span>
            </th>
            <th className={th}>Ships</th>
            <th className={th}>Odds</th>
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr
              key={r.slug}
              className="border-b border-border last:border-0 hover:bg-accent/[0.03]"
            >
              <td className="px-3 py-3 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </td>
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
                  <a
                    href={`#${r.slug}`}
                    className="font-semibold text-text underline decoration-dotted decoration-accent/40 underline-offset-4 hover:text-accent"
                  >
                    {r.name}
                  </a>
                </div>
              </td>
              <td className="px-3 py-3 text-muted">{r.signupOffer}</td>
              <td className="whitespace-nowrap px-3 py-3">
                <span className="font-semibold text-text">{r.buybackRate}</span>
                {/* Cash and credit are not the same thing, so the table says which. */}
                <span
                  className={`mt-1 block w-fit rounded px-1.5 py-0.5 font-mono text-[10px] ${
                    r.buybackIsCash
                      ? "bg-accent/15 text-accent"
                      : "border border-border text-muted"
                  }`}
                >
                  {r.buybackPaidIn}
                </span>
              </td>
              <td className="px-3 py-3 text-muted">{r.shipsCards ? "Yes" : "No"}</td>
              <td className="px-3 py-3 text-muted">{r.oddsPublished ? "Yes" : "No"}</td>
              <td className="px-3 py-3">
                {r.hasReferral ? (
                  <AffiliateLink
                    slug={r.slug}
                    name={r.name}
                    source="card_rips_table"
                    className="whitespace-nowrap rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-bg hover:opacity-90"
                  >
                    Claim
                  </AffiliateLink>
                ) : (
                  <a
                    href={r.homepageUrl}
                    target="_blank"
                    rel="nofollow noopener"
                    className="whitespace-nowrap rounded-lg border border-border px-3 py-1.5 text-xs font-bold text-muted hover:text-text"
                  >
                    Visit
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
