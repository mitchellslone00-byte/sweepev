import type { Metadata } from "next";
import Link from "next/link";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { DailySCTable, type DailyRow } from "@/components/DailySCTable";

const LAST_VERIFIED = "July 1, 2026";

export const metadata: Metadata = {
  title: "Free Sweeps Coins Daily: Every Site's Free SC Ranked",
  description:
    "Get free Sweeps Coins every day just for logging in. We rank every sweepstakes casino that gives free SC daily by what it's actually worth per month — no purchase, no deposit, no writing. Just sign in and collect. Re-verified monthly.",
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
      vip: s.dailySC!.vip,
      discordLinks: s.dailySC!.discordLinks,
      tip: s.dailySC!.tip,
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

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Daily SC Sweepstakes Casinos Ranked by Monthly Value",
    description:
      "Sweepstakes casinos that give free Sweeps Coins for logging in, ranked by base monthly value.",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${r.name} — ${r.display} daily`,
      url: `${siteConfig.url}/sites/${r.slug}`,
    })),
  };

  return (
    <article className="container-x py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <Link href="/" className="text-sm text-muted hover:text-text">
        ← Back to rankings
      </Link>

      {/* Hero */}
      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Daily bonus index · 2026
        </p>
        <h1 className="mt-2 max-w-[20ch] text-3xl font-black leading-tight md:text-5xl">
          Free daily Sweeps Coins, ranked by <span className="text-accent">monthly value</span>
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          Every sweepstakes casino that hands out free Sweeps Coins (SC) just for showing up — how
          much, how you claim it, and what the habit is worth per month. No purchase, no deposit, no
          surveys, no writing. Just sign in and collect your free SC. Re-verified on the first of
          every month.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted">
          LAST FULL VERIFICATION:{" "}
          <b className="text-text">{LAST_VERIFIED.toUpperCase()}</b>
        </span>

        <a
          href="#discord-links"
          className="mt-4 flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
        >
          💬 Several of these sites drop extra free SC links — we post every one in our Discord
          <span aria-hidden>↓</span>
        </a>
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

      {/* Discord SC links callout */}
      <section id="discord-links" className="mt-6 scroll-mt-20">
        <div className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#5865F2]/15">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#5865F2]" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189z" />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-text">Several of these sites drop extra free SC links</h3>
              <p className="mt-1 max-w-[60ch] text-sm leading-relaxed text-muted">
                Sites like <span className="text-text">RealPrize</span> and{" "}
                <span className="text-text">LoneStar</span> hand out free Sweeps Coins links and spin
                drops almost daily — on top of the login bonuses above. We catch every one and post
                them in our Discord. One click, no purchase, no playthrough trick. It&apos;s the
                easiest free SC on this whole page.
              </p>
            </div>
          </div>
          <a
            href="https://discord.gg/A62yrjBPZN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#5865F2] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4752c4] sm:self-center"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor">
              <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189z" />
            </svg>
            Join the Discord
          </a>
        </div>
      </section>

      {/* Efficient farming blurb */}
      <section className="mt-6">
        <div className="rounded-2xl border border-border bg-panel p-5">
          <h3 className="font-bold text-text">Claiming 20+ dailies faster than you'd think</h3>
          <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-muted">
            A full list of daily claims sounds like a chore, but it isn&apos;t. Drop every claim
            page into a single browser bookmark folder, open the whole folder at once, and click
            through — you can rip through 40+ dailies in under 5 minutes. We break down the full
            routine (plus the mobile version) in our{" "}
            <Link
              href="/guides#daily-farming"
              className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
            >
              daily farming guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-8">
        <div className="max-w-[70ch] border-l-[3px] border-accent py-1 pl-4 text-sm text-muted">
          <strong className="text-text">How we calculate monthly value:</strong> base daily login SC
          × 30, at 1 SC ≈ $1 redeemable. Streak and VIP multipliers are listed but not counted in the
          headline number, so every site is compared at the rate a brand-new account actually gets.
          This page covers login bonuses only — no mail-in or survey routes.{" "}
          <span className="text-text">
            *Crown Coins and Modo are shown at Gold VIP, since their daily login is tier-based;
            the figure reflects the Gold-tier rate rather than a brand-new account.
          </span>
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
