import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";
import type { Site } from "@/lib/sites";
import { AffiliateLink } from "@/components/AffiliateLink";
import { matchups, matchupBySlug, tierOf, rankOfSite } from "@/lib/comparisons";

export const dynamicParams = false;

export function generateStaticParams() {
  return matchups.map((m) => ({ matchup: m.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ matchup: string }> }
): Promise<Metadata> {
  const { matchup } = await params;
  const m = matchupBySlug[matchup];
  if (!m) return {};
  const year = new Date().getFullYear();
  // Long dual-name pairs blow past the ~600px desktop SERP title cap with the full
  // "Which Is Better in {year}?" phrasing, so fall back to a compact "(year)" form.
  const longTitle = `${m.a.name} vs ${m.b.name}: Which Is Better in ${year}?`;
  const title = longTitle.length > 60 ? `${m.a.name} vs ${m.b.name} (${year})` : longTitle;
  const description = `${m.a.name} vs ${m.b.name} compared side by side. Welcome bonuses, free daily SC, payout speed, game libraries, and which sweepstakes casino comes out on top.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/compare/${matchup}` },
    ...ogMeta(`/compare/${matchup}`, title, description),
  };
}

function dailyAmount(s: Site) {
  return s.dailySC?.amount ?? -1;
}
function speed(s: Site) {
  return s.redemption?.speedHours ?? 999;
}
function restrictedCount(s: Site) {
  return s.restrictedStates?.length ?? 0;
}

function Win({ side, active }: { side: "a" | "b"; active: "a" | "b" | "tie" }) {
  if (active !== side) return null;
  return <span className="ml-1.5 text-emerald-400" aria-label="winner">✓</span>;
}

export default async function ComparePage(
  { params }: { params: Promise<{ matchup: string }> }
) {
  const { matchup } = await params;
  const m = matchupBySlug[matchup];
  if (!m) notFound();

  const { a, b } = m;
  const year = new Date().getFullYear();
  const aTier = tierOf(a, rankOfSite(a.slug));
  const bTier = tierOf(b, rankOfSite(b.slug));

  const ratingWin = a.rating > b.rating ? "a" : b.rating > a.rating ? "b" : "tie";
  const dailyWin =
    dailyAmount(a) > dailyAmount(b) ? "a" : dailyAmount(b) > dailyAmount(a) ? "b" : "tie";
  const payWin = speed(a) < speed(b) ? "a" : speed(b) < speed(a) ? "b" : "tie";
  const availWin =
    restrictedCount(a) < restrictedCount(b) ? "a" : restrictedCount(b) < restrictedCount(a) ? "b" : "tie";
  const overall = ratingWin;
  const winner = overall === "a" ? a : overall === "b" ? b : null;
  const loser = overall === "a" ? b : overall === "b" ? a : null;

  const dailyText = (s: Site) => (s.dailySC ? `${s.dailySC.display} daily` : "No daily SC");
  const payText = (s: Site) => (s.redemption ? s.redemption.fastestTime : "Not listed");
  const minText = (s: Site) => s.redemption?.min ?? "Varies";
  const availText = (s: Site) => {
    const c = restrictedCount(s);
    return c === 0 ? "Most US states" : `Blocked in ${c} states`;
  };

  const intro =
    overall === "tie"
      ? `${a.name} and ${b.name} are closely matched sweepstakes casinos, and the right pick really comes down to what you care about most. Below we put them head to head on the things that matter: welcome bonus, free daily Sweeps Coins, payout speed, and state availability.`
      : `${winner!.name} edges out ${loser!.name} in our head-to-head, mostly on the strength of its overall rating (${winner!.rating.toFixed(1)} vs ${loser!.rating.toFixed(1)}). That said, the two trade wins across bonuses, daily SC, and payout speed, so the better choice for you depends on what you value. Here is the full side-by-side.`;

  const faqs = [
    {
      q: `Is ${a.name} or ${b.name} better?`,
      a:
        overall === "tie"
          ? `They are very close. ${a.name} and ${b.name} carry the same overall rating in our review, so it comes down to preference. Pick ${a.name} or ${b.name} based on which one wins the categories you care about most in the table above, or just play both.`
          : `We give the edge to ${winner!.name}, which scores ${winner!.rating.toFixed(1)} out of 5 to ${loser!.name}'s ${loser!.rating.toFixed(1)}. But they trade wins across bonuses, daily SC, and payout speed, so ${loser!.name} may still be the better fit depending on what matters to you.`,
    },
    {
      q: `Which has the bigger welcome bonus, ${a.name} or ${b.name}?`,
      a: `${a.name} offers ${a.bonus}. ${b.name} offers ${b.bonus}. Compare the Sweeps Coins value against the cost before you buy, since a bigger headline number is not always the better deal.`,
    },
    {
      q: `Which pays out faster, ${a.name} or ${b.name}?`,
      a:
        payWin === "tie"
          ? `Both list similar redemption speeds (${payText(a)}). Real times depend on your payment method and whether your account is verified.`
          : `${(payWin === "a" ? a : b).name} is the faster of the two, with redemptions listed at ${payText(payWin === "a" ? a : b)} versus ${payText(payWin === "a" ? b : a)} for ${(payWin === "a" ? b : a).name}. See our fastest payouts page for the full ranking.`,
    },
    {
      q: `Can I play both ${a.name} and ${b.name}?`,
      a: `Yes, and you probably should. Signing up at both doubles your free daily Sweeps Coins and welcome bonuses at no extra cost, as long as both are available in your state. Stacking multiple sites is the whole strategy behind a free sweepstakes bankroll.`,
    },
  ];

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
      { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: `${siteConfig.url}/compare/${matchup}` },
    ],
  };

  const rows: { label: string; a: string; b: string; win: "a" | "b" | "tie" }[] = [
    { label: "Our rating", a: `${a.rating.toFixed(1)} / 5`, b: `${b.rating.toFixed(1)} / 5`, win: ratingWin },
    { label: "Tier", a: aTier, b: bTier, win: "tie" },
    { label: "Welcome offer", a: a.bonus, b: b.bonus, win: "tie" },
    { label: "Free daily SC", a: dailyText(a), b: dailyText(b), win: dailyWin },
    { label: "Fastest payout", a: payText(a), b: payText(b), win: payWin },
    { label: "Redemption min", a: minText(a), b: minText(b), win: "tie" },
    { label: "Availability", a: availText(a), b: availText(b), win: availWin },
  ];

  return (
    <article className="container-x py-8 md:py-14 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">Home</Link>
        <span aria-hidden>›</span>
        <Link href="/compare" className="hover:text-text">Compare</Link>
        <span aria-hidden>›</span>
        <span className="text-text">{a.name} vs {b.name}</span>
      </nav>

      <header className="mt-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
          {a.name} vs {b.name}
        </h1>
        <p className="mt-1 text-sm text-muted">Which sweepstakes casino is better in {year}?</p>
        <p className="mt-4 text-muted leading-relaxed">{intro}</p>
      </header>

      {/* Comparison table */}
      <section className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted"> </th>
              <th className="px-3 py-3 font-bold text-text">{a.name}</th>
              <th className="px-3 py-3 font-bold text-text">{b.name}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-border last:border-0 align-top">
                <td className="px-3 py-3 font-mono text-[11px] uppercase tracking-wider text-muted whitespace-nowrap">
                  {r.label}
                </td>
                <td className={`px-3 py-3 ${r.win === "a" ? "font-semibold text-text" : "text-muted"}`}>
                  {r.a}
                  <Win side="a" active={r.win} />
                </td>
                <td className={`px-3 py-3 ${r.win === "b" ? "font-semibold text-text" : "text-muted"}`}>
                  {r.b}
                  <Win side="b" active={r.win} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Verdict */}
      <section className="mt-8 rounded-2xl border-2 border-accent/50 bg-accent/[0.06] p-5">
        <h2 className="text-lg font-bold text-accent">The verdict</h2>
        <p className="mt-2 text-muted leading-relaxed">
          {overall === "tie" ? (
            <>
              It is essentially a tie. {a.name} and {b.name} both earn a {a.rating.toFixed(1)} from us, so
              go with whichever wins the categories you care about, or run both to stack the free SC.
            </>
          ) : (
            <>
              Overall, <span className="font-semibold text-text">{winner!.name}</span> is our pick, but it
              is close. {winner!.name} takes the higher rating, while {loser!.name} still wins on some
              categories in the table above. If you can, play both to get the most free Sweeps Coins.
            </>
          )}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <AffiliateLink slug={a.slug} name={a.name} source="compare_cta" className="rounded-lg bg-accent px-4 py-2 text-sm font-bold text-bg hover:opacity-90">
            Play {a.name}
          </AffiliateLink>
          <AffiliateLink slug={b.slug} name={b.name} source="compare_cta" className="rounded-lg border border-accent/50 px-4 py-2 text-sm font-bold text-accent hover:bg-accent/10">
            Play {b.name}
          </AffiliateLink>
        </div>
      </section>

      {/* Why each */}
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {[a, b].map((s) => (
          <div key={s.slug} className="rounded-xl border border-border bg-panel p-5">
            <h3 className="font-bold text-text">Why choose {s.name}</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {s.pros.slice(0, 5).map((pr) => (
                <li key={pr} className="before:mr-2 before:text-accent before:content-['+']">{pr}</li>
              ))}
            </ul>
            <Link
              href={`/sites/${s.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-2 hover:opacity-80"
            >
              Read the full {s.name} review →
            </Link>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">{a.name} vs {b.name}: FAQ</h2>
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

      {/* Keep exploring */}
      <section className="mt-10 rounded-2xl border border-border bg-panel/60 p-5">
        <p className="mb-3 text-sm font-semibold text-text">Keep exploring</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/compare" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            All comparisons →
          </Link>
          <Link href="/" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            Full rankings →
          </Link>
          <Link href="/daily-sc" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            Free daily SC →
          </Link>
          <Link href="/fastest-payouts" className="rounded-lg border border-border bg-panel px-4 py-2 text-muted transition-colors hover:border-accent/40 hover:text-text">
            Fastest payouts →
          </Link>
        </div>
      </section>
    </article>
  );
}
