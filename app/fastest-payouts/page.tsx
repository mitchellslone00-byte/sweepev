import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { FastPayoutsTable, type FastRow } from "@/components/FastPayoutsTable";

const LAST_VERIFIED = "August 9, 2026";

export const metadata: Metadata = {
  title: "Fastest Paying Sweepstakes Casinos: Instant Redemptions (2026)",
  description:
    "Which sweepstakes casinos pay out the fastest — ranked by real redemption speed. Instant crypto, gift card, and debit cashouts, the fastest method for each site, and redemption minimums. Re-verified monthly.",
  alternates: { canonical: `${siteConfig.url}/fastest-payouts` },
};

function buildRows(): FastRow[] {
  return sites
    .filter((s) => s.redemption)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      homepageUrl: s.homepageUrl,
      fastestMethod: s.redemption!.fastestMethod,
      fastestTime: s.redemption!.fastestTime,
      speedHours: s.redemption!.speedHours,
      min: s.redemption!.min,
      note: s.redemption!.note,
    }))
    .sort((a, b) => a.speedHours - b.speedHours || a.name.localeCompare(b.name));
}

const faqs = [
  {
    q: "Which sweepstakes casino pays out the fastest?",
    a: "Several pay effectively instantly. Legacy Casino pays instantly, Sweet Sweeps is near-instant via USDC crypto, and Modo is instant with a small fee. ReBet, Dogg House, and SpinQuest pay instantly via debit for redemptions under $500, and Legendz pays to a debit card within about an hour.",
  },
  {
    q: "What's the fastest redemption method?",
    a: "Crypto (like USDC) and gift cards are usually the quickest, often instant. Instant debit and Skrill are next. ACH bank transfers are the slowest, typically 1-5 business days. This page ranks each site by its single fastest available method.",
  },
  {
    q: "Why do redemption times vary so much?",
    a: "Speed depends on the payout method, whether your KYC verification is complete, and how busy the site is. A first redemption is often slower than later ones. The times here reflect the fastest realistic method for a verified account.",
  },
  {
    q: "How often is this list updated?",
    a: `We re-verify these figures periodically; this list was last checked on ${LAST_VERIFIED}. Payout speeds and methods change, so always confirm the current terms on the operator's site.`,
  },
];

export default function FastestPayoutsPage() {
  const rows = buildRows();
  const instantCount = rows.filter((r) => r.speedHours < 1).length;

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
    name: "Fastest Paying Sweepstakes Casinos",
    description: "Sweepstakes casinos ranked by real redemption speed.",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${r.name} — ${r.fastestTime}`,
      url: `${siteConfig.url}/sites/${r.slug}`,
    })),
  };

  return (
    <article className="container-x py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Back to rankings
      </Link>

      {/* Hero */}
      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Payout speed index · 2026</p>
        <h1 className="mt-2 max-w-[20ch] text-3xl font-black leading-tight md:text-5xl">
          Fastest paying <span className="text-accent">sweepstakes casinos</span>
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          When you win, you want your cash fast. These are the sweepstakes casinos with the quickest
          redemptions — ranked by their real fastest method, from instant crypto and gift cards to
          same-hour debit cashouts. Each row shows the fastest realistic option for a verified account.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">
          LAST VERIFIED: <b className="text-text">{LAST_VERIFIED.toUpperCase()}</b>
        </span>
      </header>

      {/* Ledger */}
      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        <div className="bg-panel p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">Instant / same-hour payouts</div>
          <div className="mt-1 font-mono text-2xl font-semibold text-accent">
            {instantCount} <span className="text-sm text-muted">sites</span>
          </div>
        </div>
        <div className="bg-panel p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">Sites ranked</div>
          <div className="mt-1 font-mono text-2xl font-semibold text-accent">
            {rows.length} <span className="text-sm text-muted">and growing</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">The fastest payouts table</h2>
        <p className="mb-4 mt-1 text-sm text-muted">
          Tap a column to sort. &ldquo;Typical time&rdquo; is each site&apos;s single fastest method for a
          verified account.
        </p>
        <FastPayoutsTable rows={rows} />
      </section>

      {/* Methodology */}
      <section className="mt-8">
        <div className="max-w-[70ch] border-l-[3px] border-accent py-1 pl-4 text-sm text-muted">
          <strong className="text-text">How we rank speed:</strong> each site is ranked by its single
          fastest available redemption method for a verified account. Crypto and gift cards are usually
          instant; debit and Skrill follow; ACH is slowest. Real times vary with your KYC status and
          site volume, and a first redemption is often slower than later ones — always confirm current
          terms on the operator&apos;s site.
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Fast payout FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-panel p-4">
              <summary className="cursor-pointer list-none font-semibold text-text">
                <span className="text-accent">▸ </span>
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Responsible play */}
      <section className="mt-8 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          Payout speeds and methods change often — always verify current terms on the operator&apos;s own
          site. 21+. If gambling stops being fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
