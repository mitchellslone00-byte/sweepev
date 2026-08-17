import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { states, stateBySlug, statusCounts, type StateStatus } from "@/lib/states";
import { LegalityMap, LegalityLegend } from "@/components/LegalityMap";

const LAST_VERIFIED = "August 10, 2026";
// ISO form of LAST_VERIFIED, used for the Article dateModified schema. Bump both together.
const LAST_VERIFIED_ISO = "2026-08-10";
const PUBLISHED_ISO = "2026-08-10";

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
    q: "Is it illegal for me to play sweepstakes casinos?",
    a: "In the large majority of states, no — sweepstakes casinos are legal to play. Even in banned states, the laws and enforcement target operators, not individual players; the practical effect is simply that legitimate sites won't serve you there. This is general information rather than legal advice, so check your own state's rules if you're unsure.",
  },
  {
    q: "Why do some sweepstakes casinos work in my state and others don't?",
    a: "Each operator makes its own decision about which states to serve, based on its legal read and risk tolerance. In gray-area states especially, one site may accept you while another blocks the state entirely. That's why our per-state pages list the specific casinos available where you live, rather than a single yes-or-no.",
  },
  {
    q: "Will more states ban sweepstakes casinos?",
    a: "Probably — several more states had bills pending as of 2026. But the trend isn't strictly one-way: operators and industry groups are challenging some bans in court, and a few states have stalled or narrowed their legislation. Expect the map to keep shifting, which is exactly why we re-verify it regularly.",
  },
  {
    q: "How do I know if a specific casino is available in my state?",
    a: "The fastest way is our state pages — choose your state to see the exact list of casinos that accept players there. You can also check an operator's own terms and its restricted-states list before you sign up, since availability can change without much notice.",
  },
  {
    q: "How often is this map updated?",
    a: `Sweepstakes law is changing fast — several states passed bans or took enforcement action in 2025 and 2026. We re-verify this map regularly; it was last checked on ${LAST_VERIFIED}. This is general information, not legal advice — always confirm the current rules for your state on the operator's site.`,
  },
];

// Notable legal changes, most recent / upcoming first. `slug` links to a state page.
const CHANGELOG: { date: string; text: string; slug: string | null; upcoming?: boolean }[] = [
  {
    date: "Nov 1, 2026",
    text: "Oklahoma's ban (SB 1589) takes effect, carrying felony penalties for operators.",
    slug: "oklahoma",
    upcoming: true,
  },
  {
    date: "May 2026",
    text: "Indiana (HB 1052), Iowa (SF 2289), and Maine (LD 2007) enact sweeps-specific bans; Tennessee's attorney general sends a wave of cease-and-desist letters.",
    slug: null,
  },
  {
    date: "Jan 1, 2026",
    text: "California's AB 831 takes effect, making sweepstakes casinos illegal statewide.",
    slug: "california",
  },
  {
    date: "Dec 2025",
    text: "New York signs S 5935A, targeting operators along with their payment and marketing partners.",
    slug: "new-york",
  },
  {
    date: "May 2025",
    text: "Montana becomes the first state to pass a dedicated ban with SB 555.",
    slug: "montana",
  },
  {
    date: "2025",
    text: "Connecticut and New Jersey enact measures restricting the dual-currency model.",
    slug: null,
  },
];

// Authoritative references we monitor for legal status.
const SOURCES: { name: string; detail: string; url: string }[] = [
  {
    name: "Venable LLP — States Escalate Crackdown on Sweepstakes Casinos",
    detail: "Law-firm analysis of 2025–2026 state bans and enforcement.",
    url: "https://www.venable.com/insights/publications/2026/05/states-escalate-crackdown-on-sweepstakes-casinos",
  },
  {
    name: "VegasInsider — Legal States for Sweepstakes Casinos",
    detail: "State-by-state legality breakdown, updated for 2026.",
    url: "https://www.vegasinsider.com/sweepstakes-casinos/legal-states/",
  },
  {
    name: "Lines.com — Sweepstakes Casinos by State",
    detail: "Independent legality tracker and map.",
    url: "https://www.lines.com/sweepstakes-casinos/states",
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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Where Legal", item: `${siteConfig.url}/where-legal` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Where Are Sweepstakes Casinos Legal? 2026 State-by-State Map",
    description:
      "An interactive map of sweepstakes casino legality in all 50 US states — available, gray-area, and banned states, with the law behind each.",
    author: { "@type": "Person", name: "Jordan Thacker" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: PUBLISHED_ISO,
    dateModified: LAST_VERIFIED_ISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/where-legal` },
  };

  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-text">Where Legal</span>
      </nav>

      {/* Hero */}
      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Legality index · 2026</p>
        <h1 className="mt-2 max-w-[22ch] text-3xl font-black leading-tight md:text-5xl">
          Where are <span className="text-accent">sweepstakes casinos</span> legal?
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          Sweepstakes casino law is shifting fast — a wave of states passed bans or launched enforcement in
          2025 and 2026. This is the current state-by-state picture: where sweeps play is available, where
          it&apos;s a gray area, and where it&apos;s banned or simply not served. Hover any state for the
          detail, or tap it to see the best casinos you can actually play there.
        </p>
        <p className="mt-3 text-sm text-muted">
          By <span className="font-medium text-text">Jordan Thacker</span> · Last verified {LAST_VERIFIED}
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

      {/* How they stay legal */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">How sweepstakes casinos stay legal</h2>
        <p>
          Sweepstakes casinos don&apos;t hold a traditional gambling license — and that&apos;s by design.
          They operate under the same promotional sweepstakes laws that let a fast-food chain run a
          &ldquo;no purchase necessary&rdquo; prize giveaway. The key is the{" "}
          <strong className="text-text">dual-currency model</strong>: you play with Gold Coins, which are
          just for entertainment and can be bought, and you win prizes with{" "}
          <strong className="text-text">Sweeps Coins</strong>, which can&apos;t be purchased directly and
          must always be obtainable through a free method — a daily login bonus, a mail-in request, or an
          online{" "}
          <Link href="/guides/amoe" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            AMOE
          </Link>{" "}
          entry.
        </p>
        <p>
          Because there&apos;s always a no-purchase path to the redeemable currency, the games legally
          count as a sweepstakes rather than gambling — which is why they&apos;ve historically been
          available across most of the US without a gambling license. That legal footing is exactly
          what&apos;s now being tested: as the industry has grown into a multi-billion-dollar business, a
          number of states have decided the model looks too much like unlicensed online gambling and have
          moved to ban or restrict it.
        </p>
      </section>

      {/* Why states are banning */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">Why are states banning sweepstakes casinos?</h2>
        <p>The wave of bans in 2025 and 2026 comes down to a few overlapping pressures:</p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Regulators arguing the dual-currency model is de facto online gambling that sidesteps
            licensing, taxes, and consumer protections.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Lobbying from licensed commercial and tribal casinos, which view sweeps sites as untaxed
            competition.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Consumer-protection concerns around redemptions, responsible-gaming safeguards, and marketing.
          </li>
        </ul>
        <p>
          Some states passed dedicated sweeps-specific laws (California&apos;s AB 831, New York&apos;s
          S 5935A, and Montana&apos;s SB 555 among them), while others rely on attorneys general sending
          cease-and-desist letters or on long-standing gambling statutes to push operators out. The result
          is a patchwork that changes month to month — a state that&apos;s fine today can flip to a gray
          area or an outright ban after a single bill or enforcement action.
        </p>
      </section>

      {/* Recent changes */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Recent sweepstakes legality changes</h2>
        <p className="mt-2 max-w-[72ch] text-sm text-muted">
          The most significant state-level moves we&apos;re tracking, newest first:
        </p>
        <ol className="mt-4 space-y-3">
          {CHANGELOG.map((c, i) => {
            const st = c.slug ? stateBySlug[c.slug] : null;
            return (
              <li key={i} className="flex gap-4 rounded-xl border border-border bg-panel p-4">
                <div className="w-24 shrink-0 font-mono text-xs">
                  <span className={c.upcoming ? "text-amber-300" : "text-accent"}>{c.date}</span>
                  {c.upcoming && (
                    <span className="mt-1 block text-[10px] uppercase tracking-wider text-amber-300/80">
                      Upcoming
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {c.text}
                  {st && (
                    <>
                      {" "}
                      <Link
                        href={`/states/${st.slug}`}
                        className="whitespace-nowrap font-semibold text-accent underline underline-offset-2 hover:opacity-80"
                      >
                        {st.name} status →
                      </Link>
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {/* What each status means */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Available, gray area, or banned: what each means for you</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-4 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-emerald-300">🟢 Available.</span> Sweepstakes and social
            casinos operate openly, and you can sign up, verify, and redeem Sweeps Coins for cash prizes as
            normal. Most US states still fall here.
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-amber-300">🟠 Gray area.</span> There&apos;s no clean
            answer — the state may have a ban bill pending, an attorney general sending warnings, or broad
            gambling laws that make some operators pull out while others stay. You may still be able to
            play, but availability is inconsistent between sites and can change fast, so confirm you can
            register and redeem before depositing.
          </div>
          <div className="rounded-xl border border-red-500/30 bg-red-500/[0.06] p-4 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-red-300">🔴 Banned / not served.</span> Either a law
            specifically prohibits the dual-currency model, or operators block the state under existing
            gambling statutes. Legitimate sites won&apos;t let you sign up or redeem, and free Gold Coin
            play (where offered) carries no cash prizes.
          </div>
        </div>
      </section>

      {/* What to do if banned */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">
          What to do if sweepstakes casinos are banned in your state
        </h2>
        <p>
          If your state is red, the honest answer is that there&apos;s no safe way to play for real
          prizes — and we don&apos;t recommend trying to work around a block. A few things worth knowing:
        </p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Don&apos;t use a VPN.</strong> Spoofing your location violates
            every operator&apos;s terms and is grounds to void your winnings and close your account, so any
            Sweeps Coins you build are at risk.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Free-to-play may still exist.</strong> Some platforms still offer
            Gold Coin games for entertainment in restricted states, but purely for fun, with no redemption.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Watch for changes.</strong> Sweepstakes law is moving in both
            directions — states can add restrictions, and legal challenges can roll them back. We re-verify
            this map regularly, so check back for your state&apos;s current status.
          </li>
        </ul>
        <p>
          For everyone else, the quickest next step is to open your state and see exactly which casinos
          accept players there — tap your state on the map above, find it in the lists, or jump straight to
          our <Link href="/states/texas" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">per-state guides</Link>.
          You can also stack free Sweeps Coins with our{" "}
          <Link href="/daily-sc" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            free daily SC list
          </Link>{" "}
          and cash out fastest using our{" "}
          <Link href="/fastest-payouts" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            fastest payouts rankings
          </Link>
          .
        </p>
      </section>

      {/* Card-based casinos */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">
          Card-based casinos: an emerging alternative in banned states
        </h2>
        <p>
          As more states move against the traditional sweepstakes model, a new type of platform has
          started to fill the gap: <strong className="text-text">card-based casinos</strong> (sometimes
          called cash-based or token-based sites). Instead of the Gold Coins / Sweeps Coins dual-currency
          setup, these run on a different mechanism — typically loading value onto a prepaid card or token
          system — which operates under a separate legal framework from sweepstakes law.
        </p>
        <p>
          The practical upside is availability. Because they aren&apos;t structured as sweepstakes, several
          card-based platforms have been able to accept players in states that have banned or restricted
          the classic sweeps model. For someone in a prohibited state, that can make them the closest thing
          to a legitimate replacement — real games and real cash prizes, without the sweepstakes structure
          that triggered the bans in the first place.
        </p>
        <p>
          It&apos;s still early days. The card-based model is new and evolving, the law around it is being
          tested much like sweepstakes was, and availability varies by operator and state. But it&apos;s
          one of the more promising developments for players who&apos;ve been shut out by the recent wave of
          bans — and it&apos;s a space we&apos;re watching closely and will add to this map as it matures.
        </p>
      </section>

      {/* How we verify */}
      <section className="mt-8">
        <div className="max-w-[72ch] border-l-[3px] border-accent py-1 pl-4 text-sm text-muted">
          <strong className="text-text">How we verify this map:</strong> we track state legislation,
          attorney-general actions, and each major operator&apos;s live availability, and we re-check the
          status of all 50 states regularly — this map was last verified on{" "}
          <span className="text-text">{LAST_VERIFIED}</span>. Because effective dates and enforcement vary,
          and availability can differ by operator even within the same state, treat this as general
          information and always confirm the current terms for your state on the operator&apos;s own site.
        </div>
      </section>

      {/* State lists */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Every state, sorted by status</h2>
        <p className="mt-2 max-w-[72ch] text-sm text-muted">
          Prefer a list to the map? Here&apos;s all 50 states grouped by status — tap any state to see the
          casinos available there.
        </p>
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

      {/* Sources */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold">Sources &amp; further reading</h2>
        <p className="mt-2 max-w-[72ch] text-sm text-muted">
          We cross-check legislation and enforcement against legal analyses and independent trackers.
          Primary references:
        </p>
        <ul className="mt-4 space-y-3">
          {SOURCES.map((s) => (
            <li key={s.url} className="rounded-xl border border-border bg-panel p-4">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
              >
                {s.name} <span aria-hidden>↗</span>
              </a>
              <p className="mt-1 text-sm text-muted">{s.detail}</p>
            </li>
          ))}
        </ul>
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
