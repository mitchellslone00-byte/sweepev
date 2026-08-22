import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { GUIDE_SLUGS } from "@/lib/guides";
import { AffiliateLink } from "@/components/AffiliateLink";

// Reject any slug not in GUIDE_SLUGS (returns 404 instead of auto-building one).
export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  if (!GUIDE_SLUGS.includes(slug)) return {};
  const site = getSite(slug);
  if (!site || !site.strategy) return {};
  return {
    title: `${site.name} Strategy Guide`,
    description: `${site.name} strategy guide. How to clear playthrough, find +EV packages, and get the most value out of the daily SC drops.`,
    alternates: {
      canonical: `${siteConfig.url}/guides/${slug}`,
    },
  };
}

export default async function SiteGuidePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!GUIDE_SLUGS.includes(slug)) notFound();
  const site = getSite(slug);
  if (!site || !site.strategy) notFound();

  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <Link href={`/sites/${site.slug}`} className="text-sm text-muted hover:text-text">
        ← Back to the {site.name} review
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">
          {site.name} Strategy Guide
        </h1>
        <p className="mt-2 text-muted">
          How to actually play {site.name} for value. The review covers what the
          site is and why it ranks where it does. This guide covers how to get
          the most out of it day-to-day.
        </p>
        <p className="mt-2 text-xs text-muted">Last updated: {siteConfig.lastUpdated}</p>
      </header>

      <section className="mt-8 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The {site.name} edge
        </h2>
        <p className="mt-3 text-muted leading-relaxed">{site.strategy.edge}</p>
      </section>

      {site.strategy.washingGames && site.strategy.washingGames.length > 0 && (
        <section className="mt-4 rounded-2xl border border-border bg-panel p-5">
          <h2 className="text-xl md:text-2xl font-bold text-accent">
            Best games to clear playthrough
          </h2>
          <ul className="mt-3 space-y-1.5 text-muted leading-relaxed">
            {site.strategy.washingGames.map((g) => (
              <li key={g} className="before:content-['◆'] before:text-accent2 before:mr-2">
                {g}
              </li>
            ))}
          </ul>
        </section>
      )}

      {site.strategy.washingNotes && (
        <section className="mt-4 rounded-2xl border border-border bg-panel p-5">
          <h2 className="text-xl md:text-2xl font-bold text-accent">
            Cross-washing notes
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            {site.strategy.washingNotes}
          </p>
        </section>
      )}

      <section className="mt-4 rounded-2xl border border-border bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The day-to-day play
        </h2>
        <ol className="mt-3 list-decimal pl-6 text-muted space-y-1.5 leading-relaxed">
          <li>
            Verify your account (ID + address) the day you sign up so SC
            redemptions land cleanly later.
          </li>
          <li>
            Claim every daily SC drop, login bonus, and free-spin link
            {site.strategy.washingNotes ? " (especially the Discord-shared ones)" : ""}.
          </li>
          <li>
            Buy the welcome offer, then math out any sale or reload offer
            before purchasing. If the bundled SC value beats the cash cost,
            it&apos;s worth buying and washing.
          </li>
          <li>
            Cross-wash if available, otherwise pick a 97%+ RTP slot at the
            lowest possible spin size. Play until your wagered SC equals your
            balance (1× playthrough), then redeem.
          </li>
        </ol>
      </section>

      <section className="mt-6 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          New to playthrough strategy? Read the{" "}
          <Link href="/guides" className="underline hover:text-text">
            general Sweeps strategy guide
          </Link>{" "}
          for the basics that apply to every site.
        </p>
      </section>

      <section className="mt-8 text-center">
        <AffiliateLink
          slug={site.slug}
          name={site.name}
          source="guide_bottom_cta"
          className="inline-block rounded-lg bg-accent text-bg font-semibold px-6 py-3"
        >
          Claim {site.name} bonus
        </AffiliateLink>
      </section>
    </article>
  );
}
