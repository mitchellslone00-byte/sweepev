import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import fs from "node:fs";
import path from "node:path";
import { sites } from "@/lib/sites";
import type { Site } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { states, stateBySlug, statusCounts, STATUS_LABEL, type StateInfo } from "@/lib/states";
import { SiteCard } from "@/components/SiteCard";

export const dynamicParams = false;

export function generateStaticParams() {
  // Some states have their own hand-written pages (e.g. app/states/texas/page.tsx),
  // which take precedence over this dynamic route. Skip those so builds don't
  // emit conflicting paths; every other state is generated from this template.
  const statesDir = path.join(process.cwd(), "app", "states");
  const bespoke = new Set(
    fs
      .readdirSync(statesDir, { withFileTypes: true })
      .filter(
        (e) =>
          e.isDirectory() &&
          !e.name.startsWith("[") &&
          fs.existsSync(path.join(statesDir, e.name, "page.tsx"))
      )
      .map((e) => e.name)
  );
  return states.filter((s) => !bespoke.has(s.slug)).map((s) => ({ state: s.slug }));
}

function availableSites(state: StateInfo) {
  // A site is available unless it lists this state as restricted, and we don't
  // recommend sites that are winding down operations.
  return sites.filter(
    (s) => !s.shutdownNotice && !(s.restrictedStates ?? []).includes(state.name)
  );
}

function restrictedSites(state: StateInfo) {
  return sites.filter((s) => !s.shutdownNotice && (s.restrictedStates ?? []).includes(state.name));
}

export async function generateMetadata(
  { params }: { params: Promise<{ state: string }> }
): Promise<Metadata> {
  const { state: slug } = await params;
  const state = stateBySlug[slug];
  if (!state) return {};
  const year = new Date().getFullYear();
  const banned = state.status === "banned";
  const count = availableSites(state).length;
  return {
    title: banned
      ? `Are Sweepstakes Casinos Legal in ${state.name}? (${year})`
      : `${count} Best Sweepstakes Casinos in ${state.name} (${year})`,
    description: banned
      ? `Is sweepstakes casino play legal in ${state.name}? Here's the ${year} status, what it means for ${state.name} players, free-play options, and where sweeps casinos are still available.`
      : `The ${count} best sweepstakes & social casinos for ${state.name} players in ${year}, ranked by bonus value, payout speed, and trust. Plus the fastest payouts, best free Sweeps Coins, and how to start.`,
    alternates: { canonical: `${siteConfig.url}/states/${slug}` },
  };
}

const STATUS_PILL: Record<string, string> = {
  available: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200",
  iffy: "border-amber-500/40 bg-amber-500/15 text-amber-200",
  banned: "border-red-500/40 bg-red-500/15 text-red-200",
};

function QuickPick({
  label,
  site,
  detail,
}: {
  label: string;
  site: Site;
  detail: string;
}) {
  return (
    <Link
      href={`/sites/${site.slug}`}
      className="block rounded-xl border border-border bg-panel p-4 transition-colors hover:border-accent/40"
    >
      <div className="text-[10px] font-semibold uppercase tracking-wider text-accent2">{label}</div>
      <div className="mt-1 font-bold text-text">{site.name}</div>
      <div className="mt-0.5 text-xs text-muted">{detail}</div>
    </Link>
  );
}

export default async function StatePage(
  { params }: { params: Promise<{ state: string }> }
) {
  const { state: slug } = await params;
  const state = stateBySlug[slug];
  if (!state) notFound();

  const year = new Date().getFullYear();
  const available = availableSites(state);
  const restricted = restrictedSites(state);
  const showList = state.status !== "banned";
  const count = available.length;
  const counts = statusCounts();

  const topPick = available[0] ?? null;
  const fastestPick =
    available
      .filter((s) => s.redemption)
      .sort((a, b) => a.redemption!.speedHours - b.redemption!.speedHours)[0] ?? null;
  const bestDailyPick =
    available
      .filter((s) => s.dailySC)
      .sort((a, b) => b.dailySC!.amount - a.dailySC!.amount)[0] ?? null;
  const topNames = available.slice(0, 4).map((s) => s.name);

  const introParas: string[] =
    state.status === "available"
      ? [
          `Looking for the best sweepstakes casinos in ${state.name}? You're in the right place. Sweepstakes and social casinos are available to ${state.name} residents, and below we rank the ${count} sites that currently accept ${state.name} players. Scored on bonus value, redemption speed, game library, and trust. Every site here runs the dual-currency model: free Gold Coins for casual play, and Sweeps Coins you can redeem for real cash prizes.`,
          `New to sweeps in ${state.name}? The short version: sign up free, claim your welcome Sweeps Coins, clear the low playthrough on a high-RTP game, and redeem. You never have to spend a cent. Daily login bonuses and free AMOE entries keep topping up your Sweeps Coins. Below you'll find the top-rated sites for ${state.name}, plus the fastest payouts and the best free SC.`,
        ]
      : state.status === "iffy"
      ? [
          `Can you play sweepstakes casinos in ${state.name}? Right now it's a gray area.${
            state.note ? " " + state.note : ""
          } The ${count} sites listed below currently accept ${state.name} players, but the situation is fluid. Operators can pull out or re-enter with little notice, so always confirm you can register and redeem before you deposit.`,
          `We rank ${state.name}'s available sweeps and social casinos by bonus value, payout speed, game selection, and trust. All of them use the dual-currency model. Free Gold Coins plus redeemable Sweeps Coins. And you can build a balance with no purchase through daily bonuses and AMOE. Here's the current picture for ${state.name}.`,
        ]
      : [
          `Are sweepstakes casinos legal in ${state.name}? Not right now.${
            state.note ? " " + state.note : ""
          } That means the major operators block sign-ups from ${state.name} and won't process Sweeps Coins redemptions for ${state.name} residents.`,
          `You can still play free Gold Coin games on some platforms purely for entertainment, but there's no cash redemption available in ${state.name}. Below is what the ban means for ${state.name} players and where sweepstakes play is still legal.`,
        ];

  const faqs: { q: string; a: string }[] = [
    {
      q: `Are sweepstakes casinos legal in ${state.name}?`,
      a:
        state.status === "available"
          ? `Yes. Sweepstakes casinos operate legally in ${state.name} under sweepstakes and promotional law rather than a gambling license, and the operators listed here accept ${state.name} players with full Sweeps Coins redemptions.`
          : state.status === "iffy"
          ? `It's a gray area.${state.note ? " " + state.note : ""} Some operators still serve ${state.name} while others hold back, and the rules can change quickly. Confirm current availability on each site before you sign up.`
          : `Not currently.${state.note ? " " + state.note : ""} Sweeps Coins play and redemptions aren't offered to ${state.name} residents, though free-to-play Gold Coin games may still be available on some sites.`,
    },
  ];
  if (showList && count > 0) {
    faqs.push({
      q: `Which sweepstakes casino is best in ${state.name}?`,
      a: `Our current top picks for ${state.name} are ${topNames.join(", ")}. ${
        topPick ? `${topPick.name} tops the list with ${topPick.bonus}. ` : ""
      }See the full ranked list above for bonuses, payout speeds, and full reviews.`,
    });
    if (fastestPick?.redemption) {
      faqs.push({
        q: `What's the fastest-paying sweepstakes casino in ${state.name}?`,
        a: `Among sites available in ${state.name}, ${fastestPick.name} is one of the fastest. ${fastestPick.redemption.fastestTime.toLowerCase()} via ${fastestPick.redemption.fastestMethod.toLowerCase()}. Compare all of them on our Fastest Payouts page.`,
      });
    }
    faqs.push({
      q: `How do I get free Sweeps Coins in ${state.name}?`,
      a: `The best no-purchase routes are daily login bonuses and AMOE (a free postcard or online entry). Stack them across several sites and the free Sweeps Coins add up fast. See our Free Daily SC list and AMOE guide for the full routine.`,
    });
    faqs.push({
      q: `Do I have to pay taxes on sweepstakes winnings in ${state.name}?`,
      a: `Generally, sweepstakes prizes are treated as taxable income in the US, so you may owe federal tax and, depending on ${state.name} rules, state tax on redemptions. We're not tax advisors. Keep records of your redemptions and consult a professional.`,
    });
    faqs.push({
      q: `How old do I have to be to play in ${state.name}?`,
      a: `Most sweepstakes casinos require you to be at least 18, and some require 21+. Always check the specific operator's terms for ${state.name} before signing up.`,
    });
  } else {
    faqs.push({
      q: `Can I use a VPN to play sweepstakes casinos from ${state.name}?`,
      a: `No. Using a VPN to get around a state block violates the operators' terms and can void any winnings and get your account closed. If sweepstakes play isn't offered in ${state.name}, we don't recommend trying to work around it.`,
    });
    faqs.push({
      q: `Can I still play for free in ${state.name}?`,
      a: `Some platforms still offer free Gold Coin play in ${state.name} for entertainment, but with no Sweeps Coins and no cash redemptions. Always confirm what's allowed in your state on the operator's own site.`,
    });
    faqs.push({
      q: `Will sweepstakes casinos come back to ${state.name}?`,
      a: `It's hard to say. Sweepstakes law is changing constantly across the US. Keep an eye on our legality map for the latest status in ${state.name} and every other state.`,
    });
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const itemListLd =
    showList && count > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Best Sweepstakes Casinos in ${state.name}`,
          numberOfItems: count,
          itemListElement: available.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${siteConfig.url}/sites/${s.slug}`,
          })),
        }
      : null;

  return (
    <article className="container-x py-8 md:py-14 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {itemListLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      )}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">
          Home
        </Link>
        <span aria-hidden>›</span>
        <Link href="/where-legal" className="hover:text-text">
          Legality map
        </Link>
        <span aria-hidden>›</span>
        <span className="text-text">{state.name}</span>
      </nav>

      {/* Header */}
      <header className="mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          {state.status === "banned"
            ? `Are Sweepstakes Casinos Legal in ${state.name}?`
            : `Best Sweepstakes Casinos in ${state.name} (${year})`}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className={`rounded-full border px-3 py-1 font-semibold ${STATUS_PILL[state.status]}`}>
            {STATUS_LABEL[state.status]} in {state.name}
          </span>
          {showList && (
            <span className="rounded-full border border-border bg-panel px-3 py-1">
              {count} sites available
            </span>
          )}
          <span className="rounded-full border border-border bg-panel px-3 py-1">Updated {year}</span>
        </div>
        <div className="mt-4 space-y-3 text-muted leading-relaxed">
          {introParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </header>

      {/* Quick picks */}
      {showList && count > 0 && (topPick || fastestPick || bestDailyPick) && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-bold">
            Quick picks for {state.name}
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {topPick && (
              <QuickPick label="Top rated" site={topPick} detail={topPick.bonus} />
            )}
            {fastestPick?.redemption && (
              <QuickPick
                label="Fastest payout"
                site={fastestPick}
                detail={`${fastestPick.redemption.fastestTime} · ${fastestPick.redemption.fastestMethod}`}
              />
            )}
            {bestDailyPick?.dailySC && (
              <QuickPick
                label="Best free daily SC"
                site={bestDailyPick}
                detail={`${bestDailyPick.dailySC.display} every day`}
              />
            )}
          </div>
        </section>
      )}

      {/* Casino list or banned notice */}
      {showList ? (
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl md:text-2xl font-bold">
              The {count} best sweeps casinos in {state.name}
            </h2>
            <span className="hidden text-sm text-muted md:block">Ranked by editorial score</span>
          </div>
          {count > 0 ? (
            <div className="grid gap-2">
              {available.map((site, i) => (
                <SiteCard key={site.slug} site={site} rank={i + 1} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-border bg-panel p-5 text-muted">
              We don&apos;t currently list any operators confirmed for {state.name}. Check the{" "}
              <Link href="/where-legal" className="text-accent underline">
                legality map
              </Link>{" "}
              for the latest.
            </p>
          )}
        </section>
      ) : (
        <section className="mt-8 rounded-2xl border-2 border-red-500/50 bg-red-500/10 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-red-300">What the ban means for {state.name} players</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text">
            <li className="before:mr-2 before:text-red-300 before:content-['•']">
              You can&apos;t buy Gold Coin packages or redeem Sweeps Coins for cash as a {state.name} resident.
            </li>
            <li className="before:mr-2 before:text-red-300 before:content-['•']">
              Some sites still offer free Gold Coin play for fun, but with no cash prizes.
            </li>
            <li className="before:mr-2 before:text-red-300 before:content-['•']">
              Don&apos;t try to bypass the block with a VPN. It violates operator terms and can void winnings.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-text">
            Sweepstakes play is still available in {counts.available} states. See where on our{" "}
            <Link href="/where-legal" className="text-accent underline underline-offset-2">
              interactive legality map
            </Link>
            , or read how the free{" "}
            <Link href="/guides/amoe" className="text-accent underline underline-offset-2">
              AMOE
            </Link>{" "}
            method works.
          </p>
        </section>
      )}

      {/* How to start */}
      {showList && count > 0 && (
        <section className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold">How to start playing in {state.name}</h2>
          <ol className="mt-4 space-y-3 text-muted leading-relaxed">
            <li className="rounded-xl border border-border bg-panel p-4">
              <span className="font-semibold text-text">1. Pick a site and sign up free.</span> Choose one of the
              top-rated {state.name} casinos above and create a free account. No purchase required to get started.
            </li>
            <li className="rounded-xl border border-border bg-panel p-4">
              <span className="font-semibold text-text">2. Claim your welcome Sweeps Coins.</span> Grab the no-purchase
              signup bonus, then look at the first-purchase offer only if the SC value beats the dollar cost.
            </li>
            <li className="rounded-xl border border-border bg-panel p-4">
              <span className="font-semibold text-text">3. Verify your account early.</span> Complete KYC (ID and
              address) up front so your first redemption isn&apos;t held up later.
            </li>
            <li className="rounded-xl border border-border bg-panel p-4">
              <span className="font-semibold text-text">4. Clear the playthrough efficiently.</span> Most sites use a
              1x playthrough. Cross-wash where you can, or play minimum bets on a 97%+ RTP slot to give back as little
              as possible.
            </li>
            <li className="rounded-xl border border-border bg-panel p-4">
              <span className="font-semibold text-text">5. Redeem, then repeat daily.</span> Cash out your Sweeps Coins,
              then keep stacking free SC with daily logins and AMOE across every {state.name} site you play.
            </li>
          </ol>
        </section>
      )}

      {/* Free SC */}
      {showList && count > 0 && (
        <section className="mt-10 rounded-2xl border border-accent/40 bg-panel p-5 sm:p-6">
          <h2 className="text-xl font-bold text-accent">Free Sweeps Coins in {state.name}</h2>
          <p className="mt-2 text-muted leading-relaxed">
            You never have to spend money to play. The two best no-purchase routes work the same in {state.name} as
            everywhere else:
          </p>
          <ul className="mt-3 space-y-2 text-muted leading-relaxed">
            <li className="before:mr-2 before:text-accent2 before:content-['◆']">
              <Link href="/daily-sc" className="font-semibold text-accent underline underline-offset-2">
                Daily login bonuses
              </Link>{" "}
             . Many sites hand out free Sweeps Coins just for logging in each day. See which pay the most.
            </li>
            <li className="before:mr-2 before:text-accent2 before:content-['◆']">
              <Link href="/guides/amoe" className="font-semibold text-accent underline underline-offset-2">
                AMOE
              </Link>{" "}
             . A free postcard or quick online entry that gets you Sweeps Coins with no purchase, available to{" "}
              {state.name} players.
            </li>
          </ul>
        </section>
      )}

      {/* Sites not available */}
      {showList && restricted.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">Sites not available in {state.name}</h2>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            A few operators we cover don&apos;t currently accept {state.name} players. They&apos;re excluded from the
            ranking above:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {restricted.map((s) => (
              <Link
                key={s.slug}
                href={`/sites/${s.slug}`}
                className="rounded-lg border border-border bg-panel px-3 py-1.5 text-sm text-muted hover:text-text hover:border-accent/40"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Legality context */}
      <section className="mt-10 rounded-2xl border border-border bg-panel/60 p-5">
        <h2 className="text-lg font-bold">Sweepstakes law in {state.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {state.note ??
            `Sweepstakes and social casinos operate in ${state.name} under sweepstakes and promotional law rather than a gambling license, which is why they're available without a state gambling license.`}{" "}
          Sweepstakes rules are changing quickly across the US. {counts.banned} states have now banned or blocked play,
          {" "}
          {counts.iffy} sit in a gray area, and {counts.available} still allow it. See the full state-by-state picture
          on our{" "}
          <Link href="/where-legal" className="text-accent underline underline-offset-2">
            legality map
          </Link>
          . This is general information, not legal advice.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Sweepstakes casinos in {state.name}: FAQ</h2>
        <div className="space-y-3">
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

      {/* Related links */}
      <section className="mt-10 rounded-2xl border border-border bg-panel/60 p-5">
        <h2 className="text-sm font-semibold text-text">Keep exploring</h2>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Link href="/" className="rounded-lg border border-border bg-panel px-3 py-1.5 text-muted hover:text-text hover:border-accent/40">
            All casino rankings →
          </Link>
          <Link href="/fastest-payouts" className="rounded-lg border border-border bg-panel px-3 py-1.5 text-muted hover:text-text hover:border-accent/40">
            Fastest payouts →
          </Link>
          <Link href="/daily-sc" className="rounded-lg border border-border bg-panel px-3 py-1.5 text-muted hover:text-text hover:border-accent/40">
            Free daily SC →
          </Link>
          <Link href="/where-legal" className="rounded-lg border border-border bg-panel px-3 py-1.5 text-muted hover:text-text hover:border-accent/40">
            Legality map →
          </Link>
        </div>
      </section>

      {/* Responsible play */}
      <section className="mt-8 text-sm text-muted">
        <p>
          21+. Availability and terms change. Always confirm the current rules for {state.name} on the operator&apos;s
          own site. If gambling stops being fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
