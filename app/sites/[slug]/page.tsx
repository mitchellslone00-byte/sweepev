import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { sites, getSite } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { AffiliateLink } from "@/components/AffiliateLink";

export function generateStaticParams() {
  return sites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) return {};
  return {
    title: `${site.name} Review, Bonus, Promo Code & Payouts`,
    description: `${site.name} review: ${site.tagline} Welcome offer: ${site.bonus}.`,
  };
}

export default async function SitePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) notFound();

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Service",
      name: site.name,
      description: site.tagline,
      url: site.homepageUrl,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: site.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: siteConfig.lastUpdated,
    reviewBody: `${site.tagline} Welcome offer: ${site.bonus}.`,
  };

  return (
    <article className="container-x py-8 md:py-14 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
      />

      <Link href="/" className="text-sm text-muted hover:text-text">← Back to rankings</Link>

      <header className="mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">{site.name} Review</h1>
        <p className="mt-2 text-sm sm:text-base text-muted">{site.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full bg-panel border border-border px-3 py-1">
            Rating: <span className="text-accent2">{site.rating.toFixed(1)} / 5</span>
          </span>
          <span className="rounded-full bg-panel border border-border px-3 py-1">{site.available}</span>
        </div>
        <p className="mt-2 text-xs text-muted">Last updated: {siteConfig.lastUpdated}</p>
      </header>

      <div className="mt-6 rounded-2xl border border-accent/40 bg-panel p-4 sm:p-5">
        <div className="text-xs uppercase tracking-widest text-accent">Welcome offer</div>
        <div className="mt-1 text-base sm:text-lg font-semibold">{site.bonus}</div>
        {site.promoCode && (
          <div className="mt-1 text-sm">
            Use code <span className="font-mono text-accent">{site.promoCode}</span> at signup.
          </div>
        )}
        <AffiliateLink
          slug={site.slug}
          name={site.name}
          source="review_top_cta"
          className="mt-4 block sm:inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-3 text-center"
        >
          Play at {site.name}
        </AffiliateLink>
      </div>

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-2">Highlights</h2>
        <ul className="grid gap-1 text-muted">
          {site.highlights.map((h) => (
            <li key={h} className="before:content-['✓'] before:text-accent before:mr-2">{h}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-panel p-4">
          <h3 className="font-semibold text-accent mb-2">Pros</h3>
          <ul className="space-y-1 text-muted">
            {site.pros.map((p) => <li key={p}>+ {p}</li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4">
          <h3 className="font-semibold text-accent2 mb-2">Cons</h3>
          <ul className="space-y-1 text-muted">
            {site.cons.map((c) => <li key={c}>− {c}</li>)}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-2">{site.name} Review</h2>

        {site.strategy ? (
          <>
            <div className="mt-2 rounded-xl border border-accent/40 bg-panel p-5">
              {site.strategy.edge.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted leading-relaxed mt-3 first:mt-0">{para}</p>
              ))}
            </div>


          </>
        ) : (
          <>
            <p className="text-muted">
              {site.name} runs the same general structure as most US sweepstakes
              casinos: a welcome offer to clear, a daily SC drop to collect, and
              a Sweeps Coin balance you can redeem after meeting the standard
              1× playthrough.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-panel p-5">
              <h3 className="text-lg font-semibold text-accent mb-2">
                Clearing your playthrough
              </h3>
              <p className="text-muted">
                {site.name} requires a 1× playthrough on Sweeps Coins before you
                can redeem them. The goal is to satisfy that requirement while
                giving back as little expected value as possible.
              </p>
              <ol className="list-decimal pl-6 mt-3 text-muted space-y-1">
                <li>
                  Cross-wash if it is available on the site. It consistently
                  delivers the highest return on redemption.
                </li>
                <li>
                  Otherwise, pick a high-RTP slot (97%+). Relax Gaming titles
                  like Epic Joker publish 96.5–97%+ versions.
                </li>
                <li>
                  Bet the lowest possible spin size. Minimum bet sticks closest
                  to the slot&apos;s posted RTP over a long session and keeps
                  variance low so you don&apos;t bust before clearing playthrough.
                </li>
                <li>
                  Spin until your wagered SC equals your balance, then redeem.
                </li>
              </ol>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-panel p-5">
              <h3 className="text-lg font-semibold text-accent mb-2">
                Spotting +EV packages
              </h3>
              <p className="text-muted">
                When a sale or reload offer drops, math out the SC-to-dollar
                ratio. If the bundled SC is worth more than the cash cost,
                it&apos;s worth buying and clearing playthrough. If not, skip
                it. Welcome offers and well-discounted reloads are the only
                purchases that consistently clear that bar.
              </p>
            </div>
          </>
        )}

        <p className="text-muted text-sm mt-6">
          Looking for site-specific guides? Use the{" "}
          <Link href="/" className="underline hover:text-text">
            Guides dropdown
          </Link>{" "}
          in the header to jump to any other operator&apos;s review page.
        </p>
      </section>

      <section className="mt-10 text-center">
        <AffiliateLink
          slug={site.slug}
          name={site.name}
          source="review_bottom_cta"
          className="inline-block rounded-lg bg-accent text-bg font-semibold px-6 py-3"
        >
          Claim {site.name} bonus
        </AffiliateLink>
      </section>
    </article>
  );
}
