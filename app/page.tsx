import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { statusCounts } from "@/lib/states";
import { CoinRain } from "@/components/CoinRain";
import { FeaturedSite } from "@/components/FeaturedSite";
import { SiteCard } from "@/components/SiteCard";
import { LegalityMap, LegalityLegend } from "@/components/LegalityMap";

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  const year = new Date().getFullYear();
  const legalCounts = statusCounts();
  const codeSite = sites.find((s) => s.bonusCodes && s.bonusCodes.length > 0 && !s.shutdownNotice);
  const codeSiteSc = codeSite?.bonusCodes?.reduce((a, c) => a + c.sc, 0) ?? 0;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Sweepstakes & Social Casino Sites of ${year}`,
    description:
      "Independent editorial ranking of US sweepstakes and social casinos by bonus value, redemption speed, game library, and trust.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: sites.length,
    itemListElement: sites.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteConfig.url}/sites/${s.slug}`,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-panel to-bg">
        <CoinRain />
        <div className="container-x py-8 sm:py-10 md:py-14 text-center relative z-10">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-widest text-accent border border-accent/40 rounded-full px-3 py-1">
            Updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <h1 className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-6xl font-black tracking-tight">
            Best Sweepstakes Casinos<br className="hidden md:block" /> of {year}
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            {siteConfig.tagline} We rank US sweepstakes &amp; social casinos on bonus value,
            redemption speed, game library, and trust, so you don&apos;t waste a coin.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-center gap-3">
            <a href="#rankings" className="rounded-lg bg-accent text-bg font-semibold px-6 py-3 text-center">
              See the rankings
            </a>
            <a href="#faq" className="rounded-lg border border-border bg-panel px-6 py-3 text-center">
              How Sweeps casinos work
            </a>
          </div>
        </div>
      </section>

      <section id="rankings" className="container-x py-10 md:py-16">
        <div className="flex items-end justify-between mb-5 md:mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Top Sweepstakes &amp; Social Casino Sites</h2>
          <span className="text-sm text-muted hidden md:block">Ranked by editorial score</span>
        </div>

        {codeSite && (
          <Link
            href={`/sites/${codeSite.slug}`}
            className="mb-4 flex flex-col gap-2 rounded-2xl border-2 border-accent/60 bg-accent/[0.08] p-4 transition-colors hover:bg-accent/[0.12] sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm sm:text-base">
              <span aria-hidden className="mr-1.5">🎟️</span>
              <span className="font-black text-accent">{codeSiteSc} free SC</span>{" "}
              <span className="text-text">in bonus codes at {codeSite.name}</span>{" "}
              <span className="text-muted">and enter them for free Sweeps Coins, no purchase.</span>
            </span>
            <span className="whitespace-nowrap rounded-lg bg-accent px-4 py-1.5 text-sm font-bold text-bg">
              Get the codes →
            </span>
          </Link>
        )}

        <div className="grid gap-2">
          {sites.map((site, i) =>
            i === 0 ? (
              <FeaturedSite key={site.slug} site={site} />
            ) : (
              <SiteCard key={site.slug} site={site} rank={i + 1} />
            )
          )}
        </div>

        {/* Tier legend */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="text-[10px] uppercase tracking-widest">Tiers:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-5 min-w-[1.6rem] items-center justify-center rounded border border-fuchsia-500/40 bg-fuchsia-500/15 text-fuchsia-200 text-[11px] font-bold">S</span>
            <span>Top 5</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-5 min-w-[1.6rem] items-center justify-center rounded border border-emerald-500/35 bg-emerald-500/15 text-emerald-200 text-[11px] font-bold">A</span>
            <span>#6–10</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-5 min-w-[1.6rem] items-center justify-center rounded border border-sky-500/30 bg-sky-500/10 text-sky-200 text-[11px] font-bold">B</span>
            <span>#11–14</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex h-5 min-w-[1.6rem] items-center justify-center rounded border border-amber-500/30 bg-amber-500/10 text-amber-200 text-[11px] font-bold">C</span>
            <span>#15+</span>
          </span>
        </div>
      </section>

      {/* Legality map teaser */}
      <section id="where-legal" className="container-x py-8">
        <div className="rounded-2xl border border-border bg-gradient-to-b from-panel to-bg p-5 sm:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-[52ch]">
              <h2 className="text-2xl md:text-3xl font-bold">Where are sweepstakes casinos legal?</h2>
              <p className="mt-2 text-muted leading-relaxed">
                The law is shifting fast. <span className="text-red-300 font-semibold">{legalCounts.banned} states</span>{" "}
                now ban or don&apos;t serve sweeps play, and{" "}
                <span className="text-amber-300 font-semibold">{legalCounts.iffy}</span> sit in a gray area.
                Check your state before you sign up.
              </p>
              <LegalityLegend />
              <Link
                href="/where-legal"
                className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
              >
                See the full legality map →
              </Link>
            </div>
            <div className="w-full md:max-w-sm">
              <LegalityMap />
            </div>
          </div>
        </div>
      </section>

      <section id="how-we-rank" className="container-x py-8">
        <h2 className="text-2xl font-bold mb-4">How we rank</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { t: "Bonus value", d: "Real Sweeps Coin value of the welcome offer and ongoing reloads." },
            { t: "Redemption speed", d: "How fast SC turns into cash, and the methods supported." },
            { t: "Game library", d: "Number and quality of slots, table games, and exclusives." },
            { t: "Trust & licensing", d: "Operator history, complaint rate, and state availability." },
          ].map((b) => (
            <div key={b.t} className="rounded-xl border border-border bg-panel p-4">
              <div className="font-semibold">{b.t}</div>
              <p className="text-sm text-muted mt-1">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="container-x py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently asked questions</h2>
        <div className="grid gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-border bg-panel p-4">
              <summary className="cursor-pointer font-semibold">{f.q}</summary>
              <p className="mt-2 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

const faqs = [
  {
    q: "What is a Sweepstakes casino?",
    a: "A Sweepstakes casino is a social gaming site that uses a dual-currency model: Gold Coins for fun-only play, and Sweeps Coins (or equivalent) that can be redeemed for real cash prizes. They operate under Sweepstakes law, which is why they're available in most US states without a gambling license.",
  },
  {
    q: "Are Sweepstakes casinos legal in the US?",
    a: "Yes. Sweeps casinos operate under Sweepstakes law and are legal in most US states. Availability varies by operator, so always check each site's terms for your state before signing up. It's worth noting that sweepstakes casinos have faced increasing scrutiny in recent years, and we've seen a growing number of operators shift toward card-based or token-based systems. These models operate under a different legal framework and have opened the door for players in states that traditionally restricted sweepstakes platforms.",
  },
  {
    q: "Do I have to pay to play?",
    a: "No. Every legitimate Sweeps casino offers a no-purchase-necessary path to obtain Sweeps Coins (the redeemable currency), usually via daily login bonuses, mail-in requests, or social-media promos.",
  },
  {
    q: "How do I get free Sweeps Coins?",
    a: "Common no-purchase methods: daily login bonuses, mail-in requests (a postcard with a specific format), social-media giveaways, and welcome SC granted on signup verification. Stack these across multiple sites and free SC adds up quickly. We also share free SC links, promotional drops, and limited-time offers regularly in our Discord community. Joining is one of the easiest ways to stay on top of freebies across every platform we cover.",
  },
  {
    q: "How do I redeem Sweeps Coins for cash?",
    a: "Once you meet the playthrough requirement (usually 1×), you can redeem Sweeps Coins for cash. Most sites support Skrill, PayPal, ACH bank transfer, or paper check. Minimum redemptions are typically $50–$100, and processing takes anywhere from a few hours (Skrill) to several business days (check). See each casino's review page for specifics.",
  },
  {
    q: "How do I maximize value across these sites?",
    a: "Always claim daily login bonuses, they add up fast. Stick to high-RTP slots (96%+) to clear playthrough efficiently. When available, cross-washing is even better. This involves using one game type to satisfy playthrough requirements on another, and it consistently produces higher returns than slot play alone. Use first-purchase offers, the SC value is often 5–10× ongoing offers. Verify your account early so redemptions aren't delayed later.",
  },
  {
    q: "How do I earn passive income from sweepstakes casinos?",
    a: "Stack 5–10 sites and run the same daily routine on each: claim every free Sweeps Coin (login bonus, mail-in, social, scavenger hunts), buy only +EV welcome offers and discounted reload packages where bundled SC exceeds the dollar cost, then cross-wash or play minimum bets on a 97%+ RTP slot to clear the 1× playthrough and redeem. Realistic returns range from $500–$5,000+ per month depending on how much time and effort you put in. This can get quite lucrative at scale. Stack it with a good cashback credit card on your purchases for an additional layer of value on top of everything else. It's repeatable, legal sweepstakes-prize income, and the ceiling is higher than most people expect.",
  },
  {
    q: "Why do you recommend these sites?",
    a: "Our rankings are based on bonus value, redemption reliability, game catalog, and operator trust. And only sites we've personally vetted make the list. Unlike many affiliate platforms that rank casinos purely based on commission rates, we turn down or downrank sites that don't meet our standards regardless of what they pay. If a site has redemption issues, shady terms, or a track record of treating players poorly, it won't appear here. We may earn a commission when you sign up through our links, but that has never influenced a single ranking.",
  },
];
