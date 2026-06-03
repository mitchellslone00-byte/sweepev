import Link from "next/link";
import type { Site } from "@/lib/sites";
import { AffiliateLink } from "@/components/AffiliateLink";

type Tier = "S" | "A" | "B" | "C";

function tierFor(rank: number, override?: Tier): Tier {
  if (override) return override;
  if (rank <= 5) return "S";
  if (rank <= 10) return "A";
  if (rank <= 14) return "B";
  return "C";
}

function logoUrl(homepageUrl: string): string {
  try {
    const domain = new URL(homepageUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  } catch {
    return "";
  }
}

function TierPill({ tier }: { tier: Tier }) {
  const cls =
    tier === "S"
      ? "border-fuchsia-500/40 bg-fuchsia-500/15 text-fuchsia-200"
      : tier === "A"
      ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-200"
      : tier === "B"
      ? "border-sky-500/30 bg-sky-500/10 text-sky-200"
      : "border-amber-500/30 bg-amber-500/10 text-amber-200";

  return (
    <span
      className={`inline-flex h-6 min-w-[2.25rem] items-center justify-center rounded-lg border px-2 text-xs font-bold shrink-0 ${cls}`}
    >
      {tier}
    </span>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 && value - full < 1;
  return (
    <span className="flex items-center gap-0.5 text-accent2 leading-none">
      {Array.from({ length: 5 }).map((_, i) => {
        const ch = i < full ? "★" : i === full && half ? "☆" : "☆";
        return <span key={i} className="text-xs sm:text-sm">{ch}</span>;
      })}
    </span>
  );
}

export function SiteCard({ site, rank }: { site: Site; rank: number }) {
  const tier = tierFor(rank, site.tier);

  return (
    <div className="rounded-xl border border-border bg-panel hover:bg-panel2 transition-colors overflow-hidden">
      {/* MOBILE, header row + offer + actions */}
      <div className="md:hidden px-3 py-3 space-y-2">
        {/* Header: rank + logo + name + tier  |  stars + rating */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-muted tabular-nums shrink-0 leading-none">{rank}.</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl(site.homepageUrl)}
            alt=""
            loading="lazy"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 rounded-md bg-panel2 border border-border object-contain p-0.5"
          />
          <AffiliateLink
            slug={site.slug}
            name={site.name}
            source="card_name_mobile"
            className="min-w-0 flex-1 flex items-center gap-2 group"
          >
            <span className="text-sm font-bold text-text group-hover:text-accent transition-colors truncate">
              {site.name}
            </span>
            <TierPill tier={tier} />
          </AffiliateLink>
          <div className="flex items-center gap-1 shrink-0">
            <Stars value={site.rating} />
            <span className="text-[11px] text-muted tabular-nums leading-none">{site.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Offer */}
        <div className="text-xs leading-snug pl-5">
          <span className="text-[10px] uppercase tracking-widest text-accent2 font-semibold mr-1.5">Offer</span>
          <span className="text-text font-medium">{site.bonus}</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <AffiliateLink
            slug={site.slug}
            name={site.name}
            source="card_claim_mobile"
            className="rounded-md bg-accent text-bg font-semibold px-3 py-2 text-xs text-center hover:opacity-90"
          >
            Claim Bonus
          </AffiliateLink>
          <Link
            href={`/sites/${site.slug}`}
            className="rounded-md border border-border bg-panel2 px-3 py-2 text-xs text-center hover:border-accent"
          >
            Review Guide
          </Link>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-12 items-center gap-x-2 px-4 py-3">
        <div className="col-span-5 flex items-center gap-3 min-w-0">
          <div className="w-8 shrink-0 text-base font-black text-muted tabular-nums text-center">
            {rank}.
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl(site.homepageUrl)}
            alt=""
            loading="lazy"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-md bg-panel2 border border-border object-contain p-1"
          />
          <AffiliateLink
            slug={site.slug}
            name={site.name}
            source="card_name_desktop"
            className="min-w-0 flex-1 group"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-base font-bold text-text group-hover:text-accent transition-colors truncate">
                {site.name}
              </span>
              <span className="text-[11px] text-muted">{site.available}</span>
            </div>
            <p className="text-xs text-muted mt-0.5 line-clamp-1">{site.tagline}</p>
          </AffiliateLink>
          <TierPill tier={tier} />
        </div>

        <div className="col-span-2 flex justify-center items-center gap-1">
          <Stars value={site.rating} />
          <span className="text-xs text-muted tabular-nums ml-1">{site.rating.toFixed(1)}</span>
        </div>

        <div className="col-span-3 text-sm leading-tight">
          <div className="text-[10px] uppercase tracking-widest text-accent2 font-semibold">Offer</div>
          <div className="font-medium text-text line-clamp-2">{site.bonus}</div>
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <AffiliateLink
            slug={site.slug}
            name={site.name}
            source="card_claim_desktop"
            className="rounded-lg bg-accent text-bg font-semibold px-3 py-2 text-sm text-center hover:opacity-90"
          >
            Claim Bonus
          </AffiliateLink>
          <Link
            href={`/sites/${site.slug}`}
            className="rounded-lg border border-border bg-panel2 px-3 py-2 text-sm text-center hover:border-accent"
          >
            Review Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
