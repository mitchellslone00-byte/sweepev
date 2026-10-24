import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";
import { AffiliateLink } from "@/components/AffiliateLink";
import { CopyCode } from "@/components/CopyCode";
import { RipSiteTable, type RipRow } from "@/components/RipSiteTable";
import { buybackIsCash, rankedRipSites } from "@/lib/rip-sites";

const LAST_VERIFIED = "October 24, 2026";
// ISO form of LAST_VERIFIED for the Article dateModified schema. Bump both together.
const LAST_VERIFIED_ISO = "2026-10-24";
const PUBLISHED_ISO = "2026-10-24";

// Renders with the layout's " · SweepEV" suffix, so the budget here is 50.
const TITLE = "Best Card Rip Sites 2026: Free Packs + Buybacks";
const DESCRIPTION =
  "Card rip sites ranked by what matters: the buyback rate, and whether it pays cash or store credit. Free pack offers, published odds, and which ones ship.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${siteConfig.url}/card-rips` },
  ...ogMeta("/card-rips", TITLE, DESCRIPTION),
};

const LINK_CLS =
  "text-accent underline decoration-dotted underline-offset-4 hover:text-accent2";

const faqs = [
  {
    q: "What is a card rip site?",
    a: "You buy a digital pack, open it, and there is a real trading card inside. From there you either have the card shipped to you, leave it in the site's vault, or sell it straight back to the operator for its market value. The packs are real sealed product in most cases; the ripping is just done on your phone instead of at a kitchen table.",
  },
  {
    q: "Which card rip site has the best buyback?",
    a: "Rips by Triumph, at 100% of fair market value, and it is reported to pay out as cash rather than site credit. Crown Rips also advertises 100%, credited to a withdrawable cash balance. Most of the rest sit at 90%, and some do not publish a rate at all.",
  },
  {
    q: "What is the difference between a cash buyback and a credit buyback?",
    a: "Everything. A cash buyback puts money in a balance you can withdraw and spend anywhere. A credit buyback gives you store credit that can only buy more packs, which means the money never actually leaves the site. A 90% credit buyback is worth far less than a 90% cash one, and the sites rarely make the distinction obvious.",
  },
  {
    q: "Do card rip sites give free packs when you sign up?",
    a: "Several do. Rips by Triumph, Tilt Rips and Pullz all hand new accounts a free pack with a referral code, and Crown Rips gives a free $1 welcome pack. A few others attach their offer to a first purchase instead, which is not the same thing, so check which kind you are being offered.",
  },
  {
    q: "Are card rip sites legal in California, New York and Texas?",
    a: "Generally yes, because you are buying a product rather than entering a sweepstakes. That is why these have picked up so quickly in states where sweepstakes casinos are blocked. Individual operators still set their own state and age rules, so check the terms before depositing.",
  },
  {
    q: "Are card rips a good deal?",
    a: "Buying packs usually is not. The expected value of a pack sits below what you pay for it, which is how these businesses make money, and no buyback rate changes that. The free packs are a different story: a free pack with a cash buyback is free value, and that is the part worth taking.",
  },
  {
    q: "Can you actually get your money out?",
    a: "On most of these, yes, but it is the thing to test first. Complete identity verification early, rip the free pack, sell it back, and withdraw a small amount before you deposit anything meaningful. If a withdrawal does not clear cleanly, you have learned that for the price of nothing.",
  },
  {
    q: "How often is this list updated?",
    a: `We re-check these figures periodically; this list was last reviewed on ${LAST_VERIFIED}. Buyback rates and signup offers in this category change quickly, so always confirm current terms on the operator's site.`,
  },
];

export default function CardRipsPage() {
  const sites = rankedRipSites();

  const rows: RipRow[] = sites.map((s) => ({
    slug: s.slug,
    name: s.name,
    homepageUrl: s.homepageUrl,
    hasReferral: Boolean(s.affiliateUrl),
    rating: s.rating,
    signupOffer: s.signupOffer,
    buybackRate: s.buyback.rate,
    buybackPaidIn: s.buyback.paidIn,
    buybackIsCash: buybackIsCash(s),
    shipsCards: s.shipping.available,
    oddsPublished: s.oddsPublished,
  }));

  const cashBuyback = sites.filter(buybackIsCash).length;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Card Rip Sites",
    description: "Card rip sites ranked by buyback rate, payout type and odds transparency.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: sites.length,
    itemListElement: sites.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.name}. ${s.buyback.rate} buyback`,
      url: `${siteConfig.url}/card-rips#${s.slug}`,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Card Rips", item: `${siteConfig.url}/card-rips` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    author: { "@type": "Person", name: "Jordan Thacker" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: PUBLISHED_ISO,
    dateModified: LAST_VERIFIED_ISO,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, itemListLd, breadcrumbLd, articleLd]) }}
      />

      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav className="font-mono text-xs text-muted">
          <Link href="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text">Card Rips</span>
        </nav>

        <h1 className="mt-4 text-3xl font-black md:text-4xl">Best Card Rip Sites</h1>
        <p className="mt-3 max-w-3xl text-muted leading-relaxed">
          Open a digital pack, get a real trading card, then ship it or sell it straight back. The
          category has exploded this year, and because you are buying a product rather than entering a
          sweepstakes, most of these work in states where sweepstakes casinos do not.
        </p>
        <p className="mt-3 max-w-3xl text-muted leading-relaxed">
          We rank them on the number that decides whether one is worth using:{" "}
          <strong className="text-text">the buyback</strong>, and specifically whether it pays you in
          cash or in store credit you can only spend on more packs. Of the {sites.length} sites here,
          only <strong className="text-text">{cashBuyback}</strong> pay into a balance you can actually
          withdraw.
        </p>
        <p className="mt-2 font-mono text-xs text-muted">Last reviewed {LAST_VERIFIED}</p>

        <section className="mt-8">
          <RipSiteTable rows={rows} />
          <p className="mt-3 text-xs text-muted">
            Tap a column heading to re-sort. The badge under each buyback rate says what you are paid
            in, which matters as much as the percentage.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-accent/40 bg-panel p-5">
          <h2 className="text-xl font-bold text-accent md:text-2xl">
            Read the buyback before anything else
          </h2>
          <p className="mt-3 text-muted leading-relaxed">
            Every one of these sites leads with its pack prices and its biggest pulls. Almost none of
            them lead with the buyback, which is the only term that determines what happens to your
            money after the novelty wears off.
          </p>
          <p className="mt-3 text-muted leading-relaxed">
            There are three things to check, in this order:
          </p>
          <ul className="mt-3 space-y-2 text-muted leading-relaxed">
            <li className="before:mr-2 before:text-accent2 before:content-['◆']">
              <strong className="text-text">Cash or credit?</strong> A 90% buyback paid in store credit
              is not a 90% buyback. The money cannot leave the site; all you can do is buy more packs
              with it. Treat credit-only buybacks as a discount on your next purchase, not as a payout.
            </li>
            <li className="before:mr-2 before:text-accent2 before:content-['◆']">
              <strong className="text-text">What percentage, and of whose valuation?</strong> 100%
              sounds like you break even, but it is 100% of the operator&apos;s valuation of the card
              you pulled, not 100% of what the pack cost you. Those are very different numbers.
            </li>
            <li className="before:mr-2 before:text-accent2 before:content-['◆']">
              <strong className="text-text">How long do you have to decide?</strong> Several of these
              auto-sell anything you leave in the vault. Crown Rips does it after 3 days, Packz after
              72 hours. If you wanted to ship that card, you needed to say so.
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold md:text-2xl">Where the free value actually is</h2>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            Buying packs is not a good deal, and we are not going to pretend otherwise. The expected
            value of a pack sits below its price, which is exactly how these operators make money. No
            buyback rate changes that arithmetic.
          </p>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            The free packs are different. A free pack with a cash buyback costs you nothing and pays out
            whatever you pull, which makes signing up worth doing on its own terms even if you never
            deposit. Four of the sites below hand new accounts a genuinely free pack. Take those, sell
            them back, withdraw, and you have tested the whole pipeline for nothing.
          </p>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            If you do decide to buy, run the numbers first with our{" "}
            <Link href="/tools/ev-calculator" className={LINK_CLS}>EV calculator</Link>, the same way
            you would with a{" "}
            <Link href="/" className={LINK_CLS}>sweepstakes casino</Link> purchase offer.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold md:text-2xl">
            Card rips in states where sweepstakes casinos are blocked
          </h2>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            This is the reason the category has grown so fast. Card rip sites sell you a product, so
            they are not operating the dual-currency sweepstakes model that states have been legislating
            against. Players in{" "}
            <Link href="/states/california" className={LINK_CLS}>California</Link>,{" "}
            <Link href="/states/new-york" className={LINK_CLS}>New York</Link> and{" "}
            <Link href="/states/indiana" className={LINK_CLS}>Indiana</Link>, where most sweepstakes
            casinos have withdrawn, can generally use these.
          </p>
          <p className="mt-3 max-w-3xl text-muted leading-relaxed">
            Generally, not universally. Each operator sets its own eligibility, and at least one on this
            list cannot ship to 13 states. Check the terms for your state before depositing, and see our{" "}
            <Link href="/where-legal" className={LINK_CLS}>where sweepstakes casinos are legal</Link>{" "}
            page for how the rules differ by state.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold md:text-2xl">Every site, in detail</h2>
          <div className="mt-5 space-y-5">
            {sites.map((s, i) => (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24 rounded-2xl border border-border bg-panel p-5"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-bold text-text">{s.name}</h3>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent">
                    {s.rating.toFixed(1)}
                  </span>
                  {!buybackIsCash(s) && (
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted">
                      buyback not paid in cash
                    </span>
                  )}
                </div>

                <p className="mt-2 text-muted leading-relaxed">{s.tagline}</p>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-4">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Buyback</dt>
                    <dd className="text-text">{s.buyback.rate}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Paid in</dt>
                    <dd className="text-text">{s.buyback.paidIn}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Packs</dt>
                    <dd className="text-text">{s.packPrices}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">Platform</dt>
                    <dd className="text-text">{s.platform}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-muted leading-relaxed">{s.buyback.note}</p>
                <p className="mt-2 text-sm text-muted leading-relaxed">{s.shipping.note}</p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent">Pros</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {s.pros.map((t) => (
                        <li key={t} className="before:mr-2 before:text-accent before:content-['+']">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">Cons</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {s.cons.map((t) => (
                        <li key={t} className="before:mr-2 before:content-['−']">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="mt-4 text-sm text-muted leading-relaxed">
                  <strong className="text-text">Our take.</strong> {s.verdict}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {s.affiliateUrl ? (
                    <AffiliateLink
                      slug={s.slug}
                      name={s.name}
                      source="card_rips_detail"
                      className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-bg hover:opacity-90"
                    >
                      Get the {s.name} offer
                    </AffiliateLink>
                  ) : (
                    <a
                      href={s.homepageUrl}
                      target="_blank"
                      rel="nofollow noopener"
                      className="rounded-lg border border-border px-4 py-2 text-sm font-bold text-muted hover:text-text"
                    >
                      Visit {s.name}
                    </a>
                  )}
                  {s.promoCode && <CopyCode code={s.promoCode} />}
                  <span className="font-mono text-xs text-muted">{s.operator}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold md:text-2xl">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-panel p-4">
                <h3 className="font-semibold text-text">{f.q}</h3>
                <p className="mt-2 text-muted leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-10 text-xs text-muted leading-relaxed">
          Card rips involve risk and the packs are not a positive-expectation purchase. Figures here are
          checked against operator terms and user reports but change often, so confirm current terms
          before depositing. 18+ or 19+ depending on the operator.
        </p>
      </div>
    </>
  );
}
