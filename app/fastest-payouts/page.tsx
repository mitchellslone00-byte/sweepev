import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { FastPayoutsTable, type FastRow } from "@/components/FastPayoutsTable";

const LAST_VERIFIED = "August 9, 2026";
// ISO form of LAST_VERIFIED for the Article dateModified schema. Bump both together.
const LAST_VERIFIED_ISO = "2026-08-09";
const PUBLISHED_ISO = "2026-08-09";

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
    q: "How long do sweepstakes casino redemptions take on average?",
    a: "It ranges from instant to about five business days, depending entirely on the payout method. Crypto and gift cards are often instant to same-day, instant debit and Skrill are usually same-day to a couple of days, and ACH bank transfers typically take 1–5 business days. Paper checks are the slowest. The table above ranks each site by its single fastest option.",
  },
  {
    q: "Do I have to verify my account before I can cash out?",
    a: "Yes. Every legitimate sweepstakes casino requires KYC verification (ID, and usually address or bank documents) before it will release a redemption. You can often play and build a balance first, but you can't redeem until you're verified — so complete it early to avoid holding up your first payout.",
  },
  {
    q: "Is there a minimum amount to redeem Sweeps Coins?",
    a: "Almost always. Minimums are commonly 50 to 100 SC (roughly $50–$100 at 1 SC = $1), and they're listed in the 'Min' column of the table above. A few sites go lower for gift cards. You also have to clear the site's playthrough — usually 1x at the best sites — before Sweeps Coins are eligible to cash out.",
  },
  {
    q: "Why was my first redemption slower than expected?",
    a: "First redemptions are almost always the slowest, because the site is finalizing your identity verification and reviewing the account. Once you're an established, verified user, later cashouts through the same method are usually much faster.",
  },
  {
    q: "Are 'instant' payouts really instant?",
    a: "Usually, but with caveats. 'Instant' methods (crypto, gift cards, push-to-card debit) send funds right after the site approves your redemption — and approval is where any delay hides. Some sites also cap instant debit at redemptions under a threshold (often $500) and route larger amounts to slower rails. Your first one may also be slower while KYC finalizes.",
  },
  {
    q: "How often is this list updated?",
    a: `We re-verify these figures periodically; this list was last checked on ${LAST_VERIFIED}. Payout speeds and methods change, so always confirm the current terms on the operator's site.`,
  },
];

export default function FastestPayoutsPage() {
  const rows = buildRows();
  const instantRows = rows.filter((r) => r.speedHours < 1);
  const instantCount = instantRows.length;
  const instantTop = instantRows.slice(0, 8);

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

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Fastest Payouts", item: `${siteConfig.url}/fastest-payouts` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Fastest Paying Sweepstakes Casinos: Instant Redemptions (2026)",
    description:
      "Sweepstakes casinos ranked by real redemption speed — the fastest method, typical time, and minimum for each.",
    author: { "@type": "Person", name: "Jordan Thacker" },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    datePublished: PUBLISHED_ISO,
    dateModified: LAST_VERIFIED_ISO,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/fastest-payouts` },
  };

  return (
    <article className="container-x py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden>›</span>
        <span className="text-text">Fastest Payouts</span>
      </nav>

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
        <p className="mt-3 text-sm text-muted">
          By <span className="font-medium text-text">Jordan Thacker</span> · Last verified {LAST_VERIFIED}
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
          <strong className="text-text">How we verify:</strong> we track each operator&apos;s live
          redemption methods, minimums, and real processing times — from our own cashouts and from the
          community — and re-check them regularly; this list was last verified on{" "}
          <span className="text-text">{LAST_VERIFIED}</span>.{" "}
          <strong className="text-text">How we rank speed:</strong> each site is ranked by its single
          fastest available redemption method for a verified account. Crypto and gift cards are usually
          instant; debit and Skrill follow; ACH is slowest. Real times vary with your KYC status and
          site volume, and a first redemption is often slower than later ones — always confirm current
          terms on the operator&apos;s site.
        </div>
      </section>

      {/* Instant payers */}
      {instantTop.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Which sweepstakes casinos pay instantly?</h2>
          <p className="mt-2 max-w-[72ch] text-muted leading-relaxed">
            As of {LAST_VERIFIED}, {instantCount} of the {rows.length} sites we track pay effectively
            instantly or within the hour. The current fastest:
          </p>
          <ol className="mt-4 space-y-2">
            {instantTop.map((r, i) => (
              <li
                key={r.slug}
                className="flex items-center gap-3 rounded-xl border border-border bg-panel p-4"
              >
                <span className="font-mono text-sm text-muted">{i + 1}</span>
                <Link
                  href={`/sites/${r.slug}`}
                  className="font-semibold text-text underline decoration-dotted decoration-accent/40 underline-offset-4 hover:text-accent"
                >
                  {r.name}
                </Link>
                <span className="ml-auto text-right text-sm leading-tight">
                  <span className="font-semibold text-accent">{r.fastestTime}</span>
                  <span className="block text-xs text-muted">{r.fastestMethod}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* How redemptions work */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">How sweepstakes redemptions work</h2>
        <p>
          Cashing out Sweeps Coins isn&apos;t quite like withdrawing from a bank — a few things have to line
          up first. You need to clear the site&apos;s <strong className="text-text">playthrough</strong>{" "}
          (wager your SC, usually just 1x at the best sites), your account has to be{" "}
          <strong className="text-text">verified</strong> (KYC — ID and often address or bank documents),
          and your balance has to meet the <strong className="text-text">minimum redemption</strong>,
          typically 50 to 100 SC. Once those are met you request a redemption, the site approves it — this
          is where most of the wait happens — and the money is sent through your chosen method.
        </p>
        <p>
          The &ldquo;typical time&rdquo; in the table measures that whole approval-plus-transfer window for a
          verified account using the site&apos;s single fastest method. Building the balance in the first
          place is easy and free: stack{" "}
          <Link href="/daily-sc" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            free daily Sweeps Coins
          </Link>{" "}
          across sites, then cash out from whichever pays quickest.
        </p>
      </section>

      {/* Methods explained */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">Redemption methods, fastest to slowest</h2>
        <p>Not every payout rail moves at the same speed. Here&apos;s how the common ones stack up:</p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Crypto (USDC and similar):</strong> usually the fastest — often
            instant or within minutes of approval.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Gift cards:</strong> frequently instant to same-day, since
            there&apos;s no bank in the loop.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Instant debit (push-to-card):</strong> near-instant where
            supported, though many sites cap it at redemptions under a threshold (often $500).
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Skrill / PayPal:</strong> fast — often same day to a couple of
            days.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">ACH / online banking:</strong> the workhorse, but slower —
            typically 1 to 5 business days.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Paper check:</strong> the slowest by far, sometimes a week or
            more. Avoid it if anything else is offered.
          </li>
        </ul>
        <p>
          Each site is ranked by its single fastest available method, so pick that option at checkout to hit
          the times shown in the table.
        </p>
      </section>

      {/* What affects speed */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">What affects how fast you get paid</h2>
        <p>Even at a fast site, your real payout time comes down to a handful of factors:</p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Payment method</strong> — the single biggest factor, as above.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">KYC status</strong> — an unverified account can&apos;t redeem at
            all, and your first cashout is often held while verification finishes.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">First vs. repeat redemptions</strong> — the first is almost
            always slowest; later ones speed up once you&apos;re an established, verified user.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Redemption size</strong> — some sites process instant debit only
            under a threshold and route larger amounts to slower rails.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Site volume</strong> — busy promo periods and weekends can add a
            day.
          </li>
        </ul>
      </section>

      {/* How to get paid faster */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">How to get paid faster</h2>
        <p>A few habits shave days off your cashouts:</p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Verify your account <strong className="text-text">before</strong> you build a balance, not after
            you request a redemption.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Choose the fastest method the site offers — crypto or gift card over ACH or check.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Keep redemptions under the instant-debit threshold where one applies, and split larger cashouts
            if it means faster rails.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Redeem on weekdays — approvals slow down on weekends and holidays.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            Clear the playthrough cleanly first so nothing flags your account for review.
          </li>
        </ul>
        <p>
          For the lowest-friction bankroll, pair fast payouts with our{" "}
          <Link href="/daily-sc" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            free daily SC list
          </Link>{" "}
          and make sure the site is available in your state on our{" "}
          <Link href="/where-legal" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            legality map
          </Link>{" "}
          before you start.
        </p>
      </section>

      {/* Why is my redemption delayed */}
      <section className="mt-10 max-w-[72ch] space-y-4 text-muted leading-relaxed">
        <h2 className="text-2xl font-bold text-text">Why is my redemption delayed?</h2>
        <p>
          If your cashout is stuck on &ldquo;pending&rdquo; longer than you expected, it&apos;s almost
          always one of a few things:
        </p>
        <ul className="space-y-2">
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">Your KYC isn&apos;t finished.</strong> A redemption won&apos;t
            release until your identity verification is fully approved — ID, and often address or bank
            documents. If yours is still &ldquo;under review,&rdquo; that&apos;s usually the holdup. Finish
            it and respond to any document requests.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">You haven&apos;t cleared the playthrough.</strong> Sweeps Coins
            have to be wagered (usually 1x at the best sites) before they&apos;re eligible to redeem. If
            part of your balance is still unplayed, only the cleared portion can be cashed out.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">It&apos;s the weekend or a holiday.</strong> Most sites approve
            redemptions on business days, so a Friday-night request can sit until Monday — and bank rails
            (ACH) don&apos;t move on weekends either.
          </li>
          <li className="before:mr-2 before:text-accent2 before:content-['◆']">
            <strong className="text-text">It&apos;s your first redemption.</strong> The first one is almost
            always the slowest while the account is reviewed; later cashouts speed up.
          </li>
        </ul>
        <p>
          Work through those first — nine times out of ten it&apos;s KYC or the weekend. If you&apos;ve
          verified your account, cleared the playthrough, waited a couple of business days, and it still
          hasn&apos;t landed,{" "}
          <Link href="/support" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">
            send us an email
          </Link>{" "}
          and we&apos;ll help you figure out what&apos;s going on.
        </p>
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

      {/* Keep exploring */}
      <section className="mt-10 rounded-2xl border border-border bg-panel/60 p-5">
        <p className="mb-3 text-sm font-semibold text-text">Keep exploring</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            All casino rankings →
          </Link>
          <Link href="/daily-sc" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            Free daily SC →
          </Link>
          <Link href="/where-legal" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            Where it&apos;s legal →
          </Link>
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
