import Link from "next/link";
import type { Site } from "@/lib/sites";
import { AffiliateLink } from "@/components/AffiliateLink";

function logoUrl(homepageUrl: string): string {
  try {
    const domain = new URL(homepageUrl).hostname.replace(/^www\./, "");
    return `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;
  } catch {
    return "";
  }
}

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  return (
    <span className="flex items-center gap-0.5 text-accent2 leading-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm">
          {i < full ? "★" : "☆"}
        </span>
      ))}
    </span>
  );
}

export function FeaturedSite({ site }: { site: Site }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-panel via-panel to-panel2 p-3.5 sm:p-5 md:p-5 shadow-lg shadow-accent/5">
        {/* Subtle accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest">
          <span className="rounded-full bg-accent text-bg font-bold px-2 py-0.5">
            #1 Pick
          </span>
          <span className="text-accent">Editor&apos;s top choice</span>
        </div>

        <div className="relative mt-3 sm:mt-4 md:mt-3 flex flex-col md:flex-row md:items-center md:gap-5">
          {/* Left: logo + name + tagline + stars */}
          <div className="flex items-center gap-3 md:flex-1 md:min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl(site.homepageUrl)}
              alt=""
              loading="lazy"
              width={56}
              height={56}
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-12 md:w-12 shrink-0 rounded-xl bg-panel2 border border-border object-contain p-1.5"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-2xl md:text-xl font-black tracking-tight truncate">
                <AffiliateLink
                  slug={site.slug}
                  name={site.name}
                  source="featured_name"
                  className="hover:text-accent transition-colors"
                >
                  {site.name}
                </AffiliateLink>
              </h2>
              <p className="hidden sm:block mt-0.5 text-xs md:text-sm text-muted line-clamp-1">
                {site.tagline}
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                <Stars value={site.rating} />
                <span className="text-xs text-muted tabular-nums">
                  {site.rating.toFixed(1)} / 5
                </span>
              </div>
            </div>
          </div>

          {/* Right: offer + CTAs */}
          <div className="mt-3 md:mt-0 md:w-[220px] md:shrink-0">
            <div className="rounded-xl border border-accent/40 bg-panel2 p-3">
              <div className="text-[10px] uppercase tracking-widest text-accent2 font-semibold">
                Welcome offer
              </div>
              <div className="mt-1 text-sm font-bold leading-snug">
                {site.bonus}
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-1.5">
              <AffiliateLink
                slug={site.slug}
                name={site.name}
                source="featured_claim"
                className="rounded-lg bg-accent text-bg font-bold px-3 py-2 text-sm text-center hover:opacity-90"
              >
                Claim Bonus
              </AffiliateLink>
              <Link
                href={`/sites/${site.slug}`}
                className="rounded-lg border border-border bg-panel2 px-3 py-2 text-sm text-center hover:border-accent transition-colors"
              >
                Review guide
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
