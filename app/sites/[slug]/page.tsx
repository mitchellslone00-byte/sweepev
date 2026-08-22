import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { sites, getSite } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { AffiliateLink } from "@/components/AffiliateLink";
import { CopyCode } from "@/components/CopyCode";

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
    title: site.reviewTitle ?? `${site.name} Review, Bonus, Promo Code & Payouts`,
    description: `${site.name} review: ${site.tagline} Welcome offer: ${site.bonus}.`,
    alternates: {
      canonical: `${siteConfig.url}/sites/${slug}`,
    },
  };
}

export default async function SitePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const site = getSite(slug);
  if (!site) notFound();

  // Nearest-ranked other reviews (excludes self, sister sites, and closing sites)
  // to cross-link every review to ~6 relevant peers.
  const idx = sites.findIndex((s) => s.slug === site.slug);
  const moreReviews = sites
    .filter(
      (s) =>
        s.slug !== site.slug &&
        !s.shutdownNotice &&
        !(site.relatedSites ?? []).includes(s.slug)
    )
    .map((s) => ({ s, dist: Math.abs(sites.indexOf(s) - idx) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 6)
    .map((x) => x.s);

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
    author: {
      "@type": "Person",
      name: "Jordan Thacker",
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

      {site.shutdownNotice && (
        <div className="mt-4 rounded-2xl border-2 border-red-500/60 bg-red-500/10 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-red-500">
            <span aria-hidden className="text-base">⚠️</span> Shutting Down. {site.shutdownNotice.date}
          </div>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-text">{site.shutdownNotice.message}</p>
        </div>
      )}

      <header className="mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">{site.reviewTitle ?? `${site.name} Review`}</h1>
        <p className="mt-2 text-sm sm:text-base text-muted">{site.tagline}</p>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted">
          <span>By <span className="text-text font-medium">Jordan Thacker</span></span>
          <span>·</span>
          <span>Last updated: {siteConfig.lastUpdated}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="rounded-full bg-panel border border-border px-3 py-1">
            Rating: <span className="text-accent2">{site.rating.toFixed(1)} / 5</span>
          </span>
          {site.available && <span className="rounded-full bg-panel border border-border px-3 py-1">{site.available}</span>}
        </div>
      </header>

      <div className="mt-6 rounded-2xl border border-accent/40 bg-panel p-4 sm:p-5">
        <div className="text-xs uppercase tracking-widest text-accent">Welcome offer / Promo Code</div>
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

      {site.bonusCodes && site.bonusCodes.length > 0 && (
        <div className="mt-4 rounded-2xl border-2 border-accent/60 bg-accent/[0.08] p-4 sm:p-5">
          <div className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wide text-accent">
            <span aria-hidden className="text-lg">🎟️</span>
            {site.bonusCodes.reduce((a, c) => a + c.sc, 0)} SC in free bonus codes
          </div>
          <p className="mt-1 text-sm text-muted">
            Enter these in the {site.name} promo area for free Sweeps Coins. No purchase needed:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {site.bonusCodes.map((c) => (
              <CopyCode key={c.code} code={c.code} sc={c.sc} />
            ))}
          </div>
        </div>
      )}

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

      {(site.restrictedStates || site.strategy?.washingGames) && (
        <section className="mt-4 grid md:grid-cols-2 gap-4">
          {site.strategy?.washingGames && (
            <div className="rounded-xl border border-border bg-panel p-4">
              <h3 className="font-semibold text-accent mb-2">Best EV+ Games</h3>
              <ul className="space-y-1 text-sm text-muted">
                {site.strategy.washingGames.map((g) => <li key={g}>+ {g}</li>)}
              </ul>
            </div>
          )}
          {site.restrictedStates && (
            <div className="rounded-xl border border-border bg-panel p-4">
              <h3 className="font-semibold text-accent2 mb-2">Restricted States</h3>
              <p className="text-sm text-muted leading-relaxed">{site.restrictedStates.join(", ")}</p>
            </div>
          )}
        </section>
      )}

      {site.dailySC && (
        <Link
          href="/daily-sc"
          className="mt-4 flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/[0.05] p-4 text-sm transition-colors hover:bg-accent/10"
        >
          <span aria-hidden className="text-base">💰</span>
          <span className="text-muted">
            <span className="font-semibold text-text">{site.name} gives {site.dailySC.display} in free SC daily</span>{" "}
            just for logging in. See how it ranks on our{" "}
            <span className="font-semibold text-accent">Free Daily SC list</span>.
          </span>
          <span aria-hidden className="ml-auto text-accent">→</span>
        </Link>
      )}

      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-2">{site.name} Review</h2>

        {site.strategy ? (
          <>
            {(() => {
              const guideUrl = site.strategy!.guideUrl;
              const parts = site.strategy!.edge.split("\n\n");
              const sections: { heading: string | null; paras: string[] }[] = [{ heading: null, paras: [] }];
              for (const part of parts) {
                const m = part.match(/^<<section:(.+)>>$/);
                if (m) {
                  sections.push({ heading: m[1], paras: [] });
                } else {
                  sections[sections.length - 1].paras.push(part);
                }
              }
              return sections.filter(s => s.paras.length > 0).map((section, si) => (
                <div key={si} className="mt-4 rounded-xl border border-accent/40 bg-panel p-5">
                  {section.heading && (
                    <h3 className="text-lg font-bold text-accent mb-3">{section.heading}</h3>
                  )}
                  {section.paras.map((para, pi) =>
                    para === "<<guide>>" && guideUrl ? (
                      <p key={pi} className="text-muted leading-relaxed mt-3">
                        For a full breakdown on how to farm each VIP tier efficiently and how to effectively do the chases, see our{" "}
                        <Link href={guideUrl} className="text-accent underline underline-offset-2 hover:opacity-80">
                          {site.name} VIP &amp; Strategy Guide
                        </Link>.
                      </p>
                    ) : para === "<<bonusimage>>" && site.bonusImage ? (
                      <div key={pi} className={`mt-4${site.compactImages ? " flex justify-center" : ""}`}>
                        <img
                          src={site.bonusImage}
                          alt={`${site.name} welcome offer packages`}
                          className={`rounded-2xl w-full border border-border shadow-lg${site.compactImages ? " max-w-lg" : ""}`}
                        />
                      </div>
                    ) : para === "<<saleimage>>" && site.saleImage ? (
                      <div key={pi} className="mt-4 flex justify-center">
                        <img
                          src={site.saleImage}
                          alt={`${site.name} current sale package`}
                          className="rounded-2xl border border-border shadow-lg max-w-[260px] w-full"
                        />
                      </div>
                    ) : para === "<<promoimage>>" && site.promoImage ? (
                      <div key={pi} className="mt-4 flex justify-center">
                        <img
                          src={site.promoImage}
                          alt={`${site.name} free spins promotion`}
                          className="rounded-2xl border border-border shadow-lg max-w-[260px] w-full"
                        />
                      </div>
                    ) : para === "<<discord>>" ? (
                      <div key={pi} className="mt-3">
                        <a
                          href="https://discord.gg/A62yrjBPZN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm font-medium px-4 py-1.5 transition-colors"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
                            <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189z"/>
                          </svg>
                          Join the Discord
                        </a>
                      </div>
                    ) : para === "<<amoeguide>>" ? (
                      <div key={pi} className="mt-3">
                        <Link
                          href="/guides/amoe"
                          className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/[0.06] px-3.5 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                        >
                          📮 Read the AMOE guide
                          <span aria-hidden>→</span>
                        </Link>
                      </div>
                    ) : para === "<<dailybonusimage>>" && site.dailyBonusImage ? (
                      <div key={pi} className={`mt-4${site.compactImages ? " flex justify-center" : ""}`}>
                        <img
                          src={site.dailyBonusImage}
                          alt={`${site.name} daily login bonus`}
                          className={`rounded-2xl w-full border border-border shadow-lg${site.compactImages ? " max-w-lg" : ""}`}
                        />
                      </div>
                    ) : para === "<<interfaceimage>>" && site.interfaceImage ? (
                      <div key={pi} className="mt-4">
                        <img
                          src={site.interfaceImage}
                          alt={`${site.name} lobby and game library`}
                          className="rounded-2xl w-full border border-border shadow-lg"
                        />
                      </div>
                    ) : (
                      <p key={pi} className="text-muted leading-relaxed mt-3 first:mt-0">{para}</p>
                    )
                  )}
                </div>
              ));
            })()}
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

      {site.relatedSites && site.relatedSites.length > 0 && (() => {
        const related = site.relatedSites!.map(slug => sites.find(s => s.slug === slug)).filter(Boolean);
        return related.length > 0 ? (
          <section className="mt-6 rounded-2xl border border-border bg-panel/60 p-5">
            <p className="text-sm font-semibold text-text mb-3">Sister Sites</p>
            <div className="flex flex-wrap gap-2">
              {related.map(r => (
                <Link
                  key={r!.slug}
                  href={`/sites/${r!.slug}`}
                  className="rounded-lg border border-border bg-panel px-4 py-2 text-sm text-muted hover:text-text hover:border-accent/40 transition-colors"
                >
                  {r!.name} →
                </Link>
              ))}
            </div>
          </section>
        ) : null;
      })()}

      {site.statePages && site.statePages.length > 0 && (
        <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5">
          <p className="text-sm font-semibold text-text mb-3">State Guides</p>
          <div className="flex flex-wrap gap-2">
            {site.statePages.map(sp => (
              <Link
                key={sp.href}
                href={sp.href}
                className="rounded-lg border border-border bg-panel px-4 py-2 text-sm text-muted hover:text-text hover:border-accent/40 transition-colors"
              >
                {sp.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {site.faqs && site.faqs.length > 0 && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: site.faqs.map(f => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {site.faqs.map((faq) => (
                <div key={faq.q} className="rounded-xl border border-border bg-panel p-4">
                  <p className="font-semibold text-text">{faq.q}</p>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* More reviews. Cross-links to peer sites */}
      {moreReviews.length > 0 && (
        <section className="mt-8 rounded-2xl border border-border bg-panel/60 p-5">
          <p className="mb-3 text-sm font-semibold text-text">More sweepstakes casino reviews</p>
          <div className="flex flex-wrap gap-2">
            {moreReviews.map((r) => (
              <Link
                key={r.slug}
                href={`/sites/${r.slug}`}
                className="rounded-lg border border-border bg-panel px-4 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-text"
              >
                {r.name} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Keep exploring. Hub links */}
      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5">
        <p className="mb-3 text-sm font-semibold text-text">Keep exploring</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/"
            className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text"
          >
            All casino rankings →
          </Link>
          <Link
            href="/daily-sc"
            className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text"
          >
            Free daily SC →
          </Link>
          <Link
            href="/fastest-payouts"
            className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text"
          >
            Fastest payouts →
          </Link>
          <Link
            href="/where-legal"
            className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text"
          >
            Where it&apos;s legal →
          </Link>
        </div>
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
