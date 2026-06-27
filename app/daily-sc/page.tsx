import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { DailySCTable, type DailyRow } from "@/components/DailySCTable";

const LAST_VERIFIED = "June 1, 2026";

export const metadata: Metadata = {
  title: `Free Daily SC Ranked by Monthly Value (2026) | ${siteConfig.name}`,
  description:
    "Every sweepstakes casino that gives you free Sweeps Coins just for logging in, ranked by what the daily habit is actually worth per month. No purchases, no writing — just sign in and collect. Re-verified monthly.",
  alternates: { canonical: `${siteConfig.url}/daily-sc` },
};

// Build the rows from the structured dailySC data, ranked by base rate.
// Tiebreak within equal amounts: scaling sites first, then sites with a
// "$0 balance" friction note last, then alphabetical.
function buildRows(): DailyRow[] {
  return sites
    .filter((s) => s.dailySC)
    .map((s) => ({
      slug: s.slug,
      name: s.name,
      homepageUrl: s.homepageUrl,
      amount: s.dailySC!.amount,
      display: s.dailySC!.display,
      claim: s.dailySC!.claim,
      note: s.dailySC!.note,
      scales: s.dailySC!.scales,
    }))
    .sort((a, b) => {
      if (b.amount !== a.amount) return b.amount - a.amount;
      if (a.scales !== b.scales) return a.scales ? -1 : 1;
      const aFriction = /\$0/.test(a.note ?? "");
      const bFriction = /\$0/.test(b.note ?? "");
      if (aFriction !== bFriction) return aFriction ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
}

const faqs = [
  {
    q: "Which sweepstakes casino gives the most free daily SC?",
    a: "Several sites give 1.0 SC per day just for logging in, including Chumba, LuckyLand, ReBet, Zula, SpinQuest, AceBet, and Dogg House. At roughly 1 SC = $1 redeemable, that's about $30 a month per site before any VIP or streak boosts.",
  },
  {
    q: "Do I have to buy anything to get daily SC?",
    a: "No. Every site on this page hands out free Sweeps Coins for simply logging in and clicking claim — no purchase required, ever. Sweepstakes casinos are legally required to offer a free way to collect SC.",
  },
  {
    q: "How is monthly value calculated?",
    a: "We take the base (non-VIP) daily login SC and multiply by 30, at 1 SC ≈ $1 redeemable. Streak and VIP boosts are noted on each row but are not counted in the headline number, so every site is compared at the rate a brand-new account actually gets.",
  },
  {
    q: "What does \"balance must be $0\" mean?",
    a: "A few sites (ReBet, Dogg House, AceBet) only release the daily SC once your Sweeps Coins balance hits zero. A common trick is to place a heavily favored pick or wash your balance down before claiming so the daily keeps stacking.",
  },
  {
    q: "How often is this list updated?",
    a: `We re-verify every figure on the first of each month. This list was last fully verified on ${LAST_VERIFIED}. Daily bonuses change often, so always confirm the current amount on the operator's site.`,
  },
];

export default function DailySCPage() {
  const rows = buildRows();
  const maxAmount = rows.reduce((m, r) => Math.max(m, r.amount), 0);
  const totalDaily = rows.reduce((sum, r) => sum + r.amount, 0);
  const monthlyTotal = Math.round(totalDaily * 30);

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
    <article className="container-x py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Back to rankings
      </Link>

      {/* Hero */}
      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Daily bonus index · 2026
        </p>
        <h1 className="mt-2 max-w-[18ch] text-3xl font-black leading-tight md:text-5xl">
          Free daily SC, ranked by <span className="text-accent">monthly value</span>
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          Every sweepstakes casino that hands out Sweeps Coins just for showing up — how much,
          how you claim it, and what the habit is worth per month. No purchases, no surveys, no
          writing. Just sign in and collect. Re-verified on the first of every month.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">
          LAST FULL VERIFICATION:{" "}
          <b className="text-text">{LAST_VERIFIED.toUpperCase()}</b>
        </span>
      </header>

      {/* Ledger */}
      <div className="mt-7 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
        <div className="bg-panel p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Claimable today, all sites
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-accent">
            {totalDaily.toFixed(1)} SC <span className="text-sm text-muted">/ day</span>
          </div>
        </div>
        <div className="bg-panel p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            If you claim daily
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-accent">
            ≈ ${monthlyTotal} <span className="text-sm text-muted">/ month</span>
          </div>
        </div>
        <div className="bg-panel p-5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
            Sites paying daily SC
          </div>
          <div className="mt-1 font-mono text-2xl font-semibold text-accent">
            {rows.length} <span className="text-sm text-muted">tracked</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">The daily SC table</h2>
        <p className="mb-4 mt-1 text-sm text-muted">
          Tap a column to sort. &ldquo;Monthly value&rdquo; assumes you claim every day and uses the
          base (non-VIP) rate, so every site is compared fairly.
        </p>
        <DailySCTable rows={rows} maxAmount={maxAmount} />
      </section>

      {/* Methodology */}
      <section className="mt-8">
        <div className="max-w-[70ch] border-l-[3px] border-accent py-1 pl-4 text-sm text-muted">
          <strong className="text-text">How we calculate monthly value:</strong> base daily login SC
          × 30, at 1 SC ≈ $1 redeemable. Streak and VIP multipliers are listed but not counted in the
          headline number, so every site is compared at the rate a brand-new account actually gets.
          This page covers login bonuses only — no mail-in or survey routes.
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Free daily SC FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-panel p-4"
            >
              <summary className="cursor-pointer list-none font-semibold text-text marker:hidden">
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
          Daily bonuses change often — always verify the current amount on the operator&apos;s own
          site. Sweepstakes casinos are entertainment first. Set a budget, take breaks, and never
          chase losses. 21+. If gambling stops being fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
