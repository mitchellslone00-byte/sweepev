import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";
import { AffiliateLink } from "@/components/AffiliateLink";
import { CopyCode } from "@/components/CopyCode";
import { PublicImg } from "@/components/PublicImg";
import { buybackIsCash, getRipSite, rankedRipSites, ripSites } from "@/lib/rip-sites";

export const dynamicParams = false;

export function generateStaticParams() {
  return ripSites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = getRipSite(slug);
  if (!site) return {};
  return {
    title: site.seoTitle,
    description: site.metaDescription,
    alternates: { canonical: `${siteConfig.url}/card-rips/${slug}` },
    ...ogMeta(`/card-rips/${slug}`, site.seoTitle, site.metaDescription),
  };
}

const LINK_CLS =
  "text-accent underline decoration-dotted underline-offset-4 hover:text-accent2";

export default async function RipSiteReview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = getRipSite(slug);
  if (!site) notFound();

  const all = rankedRipSites();
  const rank = all.findIndex((s) => s.slug === slug) + 1;
  const others = all.filter((s) => s.slug !== slug).slice(0, 3);
  const cash = buybackIsCash(site);
  // Only surface the daily in the offer block when it costs nothing to claim.
  // Triumph's is padlocked behind a purchase, so it does not belong there.
  const freeDaily = Boolean(site.dailyReward && !site.dailyReward.requiresPurchase);

  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: site.name,
      description: site.tagline,
      url: site.homepageUrl,
      applicationCategory: "GameApplication",
      operatingSystem: "Web",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: site.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: { "@type": "Person", name: "Jordan Thacker", url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    reviewBody: site.verdict,
  };

  const faqLd = site.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: site.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Card Rips", item: `${siteConfig.url}/card-rips` },
      {
        "@type": "ListItem",
        position: 3,
        name: site.name,
        item: `${siteConfig.url}/card-rips/${slug}`,
      },
    ],
  };

  const facts: [string, string][] = [
    ["Buyback", site.buyback.rate],
    ["Paid in", site.buyback.paidIn],
    ["Daily reward", site.dailyReward ? site.dailyReward.display : "None"],
    ["Pack prices", site.packPrices],
    ["Ships cards", site.shipping.available ? "Yes" : "No"],
    ["Odds published", site.oddsPublished ? "Yes" : "No"],
    ["Platform", site.platform],
    ["Operator", site.operator],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([reviewLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])]),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <nav className="font-mono text-xs text-muted">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/card-rips" className="hover:text-accent">Card Rips</Link>
          <span className="mx-2">/</span>
          <span className="text-text">{site.name}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black md:text-4xl">{site.name} Review</h1>
          <span className="rounded-full bg-accent/15 px-2.5 py-1 text-sm font-bold text-accent">
            {site.rating.toFixed(1)} / 5
          </span>
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
            #{rank} of {all.length}
          </span>
        </div>

        <p className="mt-3 text-muted leading-relaxed">{site.tagline}</p>

        {/* The offer block. Free value is the reason to sign up on any of these,
            so it leads, with the daily listed beside the signup offer only when
            it is genuinely free to claim. */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-accent/50 bg-gradient-to-b from-panel to-bg">
          <div className="border-b border-accent/20 bg-accent/[0.06] px-5 py-2.5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent">
              What you get free with our link
            </span>
          </div>

          <div className="p-5">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-accent">◆</span>
                <span>
                  <span className="block font-semibold text-text">{site.signupOffer}</span>
                  <span className="text-sm text-muted">On signup</span>
                </span>
              </li>
              {freeDaily && (
                <li className="flex gap-3">
                  <span aria-hidden className="mt-0.5 text-accent">◆</span>
                  <span>
                    <span className="block font-semibold text-text">
                      {site.dailyReward!.display}
                    </span>
                    <span className="text-sm text-muted">
                      Every day after, with no purchase needed
                    </span>
                  </span>
                </li>
              )}
              <li className="flex gap-3">
                <span aria-hidden className="mt-0.5 text-accent">◆</span>
                <span>
                  <span className="block font-semibold text-text">
                    {site.buyback.rate} buyback, paid in {site.buyback.paidIn}
                  </span>
                  <span className="text-sm text-muted">
                    {cash
                      ? "Sell cards back into a balance you can withdraw"
                      : "Check what this pays out in before you deposit"}
                  </span>
                </span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {site.affiliateUrl ? (
                <AffiliateLink
                  slug={site.slug}
                  name={site.name}
                  source="rip_review_top"
                  className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-bg hover:opacity-90"
                >
                  Claim the {site.name} offer →
                </AffiliateLink>
              ) : (
                <a
                  href={site.homepageUrl}
                  target="_blank"
                  rel="nofollow noopener"
                  className="rounded-lg border border-border px-6 py-3 text-sm font-bold text-muted hover:text-text"
                >
                  Visit {site.name}
                </a>
              )}
              {site.promoCode && <CopyCode code={site.promoCode} />}
            </div>

            {site.promoCode && (
              <p className="mt-3 text-xs text-muted">
                Enter code <strong className="text-text">{site.promoCode}</strong> at signup, or it
                will not attach to your account.
              </p>
            )}
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-border bg-panel p-5">
          <h2 className="text-lg font-bold">{site.name} at a glance</h2>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm md:grid-cols-4">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-0.5 text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {site.dailyReward && (
          <section className="mt-10">
            <h2 className="text-xl font-bold md:text-2xl">
              The daily reward
              {site.dailyReward.requiresPurchase && (
                <span className="ml-2 rounded border border-border px-1.5 py-0.5 align-middle font-mono text-[10px] font-normal text-muted">
                  needs purchase
                </span>
              )}
            </h2>
            <p className="mt-3 text-muted leading-relaxed">{site.dailyReward.note}</p>
            {site.dailyReward.image && (
              <div className="mt-4 flex justify-center">
                <PublicImg
                  src={site.dailyReward.image}
                  alt={site.dailyReward.imageAlt ?? `${site.name} daily reward screen`}
                  className="max-w-xs rounded-2xl border border-border shadow-lg"
                />
              </div>
            )}
          </section>
        )}

        {/* Per-site prose. Sites still awaiting one fall back to the summary. */}
        {site.sections?.map((sec) => (
          <section key={sec.heading} className="mt-10">
            <h2 className="text-xl font-bold md:text-2xl">{sec.heading}</h2>
            {sec.body.map((para, i) => (
              <p key={i} className="mt-3 text-muted leading-relaxed">
                {para}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="text-xl font-bold md:text-2xl">The buyback terms</h2>
          <p className="mt-3 text-muted leading-relaxed">{site.buyback.note}</p>
          {!site.sections && (
            <p className="mt-3 text-muted leading-relaxed">
              {cash
                ? `${site.name} pays its buyback into a balance you can withdraw rather than into store credit, which is the single most important term on any rip site.`
                : `${site.name} does not pay its buyback as withdrawable cash, so weigh the headline rate against the sites that do.`}
            </p>
          )}
        </section>


        <section className="mt-10">
          <h2 className="text-xl font-bold md:text-2xl">Shipping and getting the card</h2>
          <p className="mt-3 text-muted leading-relaxed">{site.shipping.note}</p>
          {!site.shipping.available && (
            <p className="mt-3 text-muted leading-relaxed">
              Worth being blunt about this: if what you want is the card itself, {site.name} is the
              wrong place. The only route out is converting it, so treat it as a way to play rather
              than a way to collect.
            </p>
          )}
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-panel p-5">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-accent">Pros</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {site.pros.map((t) => (
                <li key={t} className="before:mr-2 before:text-accent before:content-['+']">{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-panel p-5">
            <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted">Cons</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {site.cons.map((t) => (
                <li key={t} className="before:mr-2 before:content-['−']">{t}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-accent/40 bg-panel p-5">
          <h2 className="text-xl font-bold text-accent">Our verdict on {site.name}</h2>
          <p className="mt-3 text-muted leading-relaxed">{site.verdict}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {site.affiliateUrl ? (
              <AffiliateLink
                slug={site.slug}
                name={site.name}
                source="rip_review_verdict"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-bg hover:opacity-90"
              >
                Get the {site.name} offer
              </AffiliateLink>
            ) : (
              <a
                href={site.homepageUrl}
                target="_blank"
                rel="nofollow noopener"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-bold text-muted hover:text-text"
              >
                Visit {site.name}
              </a>
            )}
            <Link href="/card-rips" className={LINK_CLS}>
              Compare all {all.length} card rip sites
            </Link>
          </div>
        </section>

        {site.faqs && site.faqs.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold md:text-2xl">{site.name} FAQ</h2>
            <div className="mt-4 space-y-3">
              {site.faqs.map((f) => (
                <div key={f.q} className="rounded-2xl border border-border bg-panel p-4">
                  <h3 className="font-semibold text-text">{f.q}</h3>
                  <p className="mt-2 text-muted leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-bold md:text-2xl">Other card rip sites</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="rounded-xl border border-border bg-panel p-3">
                <Link
                  href={`/card-rips/${o.slug}`}
                  className="font-semibold text-text hover:text-accent"
                >
                  {o.name}
                </Link>
                <p className="mt-1.5 text-xs text-muted">{o.buyback.rate} buyback</p>
                <p className="mt-0.5 text-xs text-muted">
                  {o.dailyReward ? o.dailyReward.display : "No daily reward"}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-10 text-xs text-muted leading-relaxed">
          Card rips involve risk and packs are not a positive-expectation purchase. Figures are
          checked against operator terms and user reports but change often, so confirm current terms
          before depositing. 18+ or 19+ depending on the operator.
        </p>
      </div>
    </>
  );
}
