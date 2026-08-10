import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { states, statusCounts, type StateStatus } from "@/lib/states";
import { LegalityMap, LegalityLegend } from "@/components/LegalityMap";

const LAST_VERIFIED = "August 10, 2026";

export const metadata: Metadata = {
  title: "Where Are Sweepstakes Casinos Legal? 2026 State-by-State Map",
  description:
    "An interactive map of sweepstakes casino legality in all 50 US states — available, gray-area, and banned states, with the law behind each. Re-verified regularly for 2026.",
  alternates: { canonical: `${siteConfig.url}/where-legal` },
};

const faqs = [
  {
    q: "Are sweepstakes casinos legal in the US?",
    a: "In most states, yes. Sweepstakes casinos operate under sweepstakes and promotional law rather than a gambling license, so they're available in the majority of US states. A growing number of states have passed bans or taken enforcement action since 2025, which is why availability now varies widely by state.",
  },
  {
    q: "Which states have banned sweepstakes casinos?",
    a: "As of the last update, sweepstakes play is banned or not served in California, Connecticut, Idaho, Indiana, Iowa, Maine, Michigan, Montana, Nevada, New Jersey, New York, Oklahoma, and Washington. Some of these have new sweeps-specific laws; others block operators under long-standing gambling statutes. Effective dates vary, so always confirm current status.",
  },
  {
    q: "What does a 'gray area' state mean?",
    a: "Gray-area (amber) states have no clean, settled answer: there may be pending ban legislation, attorney-general cease-and-desist letters, or broad gambling laws that lead some operators to restrict access even without a sweeps-specific ban. Availability in these states can change quickly and differs from one operator to the next.",
  },
  {
    q: "Can I still play if my state is banned?",
    a: "If sweepstakes play is banned in your state, legitimate operators will block sign-ups and Sweeps Coins redemptions there, and attempting to get around that (for example with a VPN) violates their terms and can void winnings. Free Gold Coin play may still be offered in some restricted states, but with no cash redemption.",
  },
  {
    q: "How often is this map updated?",
    a: `Sweepstakes law is changing fast — several states passed bans or took enforcement action in 2025 and 2026. We re-verify this map regularly; it was last checked on ${LAST_VERIFIED}. This is general information, not legal advice — always confirm the current rules for your state on the operator's site.`,
  },
];

const SECTIONS: { status: StateStatus; title: string; blurb: string; accent: string }[] = [
  {
    status: "available",
    title: "Available",
    blurb: "Sweepstakes play is offered and redeemable.",
    accent: "text-emerald-300",
  },
  {
    status: "iffy",
    title: "Gray area",
    blurb: "Contested, pending, or operator-restricted — confirm before playing.",
    accent: "text-amber-300",
  },
  {
    status: "banned",
    title: "Banned / not served",
    blurb: "Blocked by law or not served by operators.",
    accent: "text-red-300",
  },
];

export default function WhereLegalPage() {
  const counts = statusCounts();

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
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Back to rankings
      </Link>

      {/* Hero */}
      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Legality index · 2026</p>
        <h1 className="mt-2 max-w-[22ch] text-3xl font-black leading-tight md:text-5xl">
          Where are <span className="text-accent">sweepstakes casinos</span> legal?
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          Sweepstakes casino law is shifting fast — a wave of states passed bans or launched enforcement in
          2025 and 2026. This is the current state-by-state picture: where sweeps play is available, where
          it&apos;s a gray area, and where it&apos;s banned or simply not served. Hover any state for the detail.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">
          LAST VERIFIED: <b className="text-text">{LAST_VERIFIED.toUpperCase()}</b>
        </span>
      </header>

      {/* Count ledger */}
      <div className="mt-7 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
        <div className="bg-panel p-4 text-center">
          <div className="font-mono text-2xl font-semibold text-emerald-300">{counts.available}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">Available</div>
        </div>
        <div className="bg-panel p-4 text-center">
          <div className="font-mono text-2xl font-semibold text-amber-300">{counts.iffy}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">Gray area</div>
        </div>
        <div className="bg-panel p-4 text-center">
          <div className="font-mono text-2xl font-semibold text-red-300">{counts.banned}</div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">Banned</div>
        </div>
      </div>

      {/* Map */}
      <section className="mt-8 rounded-2xl border border-border bg-panel p-5 sm:p-7">
        <LegalityMap labels />
        <div className="mt-6 flex flex-col items-center gap-2">
          <LegalityLegend />
          <p className="text-xs text-muted">Tap a state to see the best casinos available there.</p>
        </div>
      </section>

      {/* State lists */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Every state, sorted by status</h2>
        <div className="mt-5 space-y-6">
          {SECTIONS.map((sec) => {
            const list = states
              .filter((s) => s.status === sec.status && s.code !== "DC")
              .sort((a, b) => a.name.localeCompare(b.name));
            return (
              <div key={sec.status} className="rounded-2xl border border-border bg-panel p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-lg font-bold ${sec.accent}`}>{sec.title}</h3>
                  <span className="font-mono text-xs text-muted">{list.length} states</span>
                </div>
                <p className="mt-1 text-sm text-muted">{sec.blurb}</p>
                <ul className="mt-4 space-y-2">
                  {list.map((s) => (
                    <li key={s.code} className="text-sm leading-snug">
                      <Link
                        href={`/states/${s.slug}`}
                        className="font-semibold text-text underline decoration-dotted decoration-border underline-offset-4 hover:text-accent hover:decoration-accent/50"
                      >
                        {s.name}
                      </Link>
                      {s.note && <span className="text-muted"> — {s.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Legality FAQ</h2>
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

      {/* Disclaimer */}
      <section className="mt-8 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          This map is general information, not legal advice, and sweepstakes law changes frequently. Effective
          dates and enforcement vary, and availability can differ by operator even within the same state —
          always confirm the current terms for your state on the operator&apos;s own site. 21+. If gambling
          stops being fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
