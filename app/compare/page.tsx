import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ogMeta } from "@/lib/seo";
import { matchups } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Sweepstakes Casino Comparisons: Head-to-Head Matchups",
  description:
    "Side-by-side sweepstakes casino comparisons. Bonuses, free daily SC, payout speed, and which site wins in every head-to-head matchup.",
  alternates: { canonical: `${siteConfig.url}/compare` },
  ...ogMeta(
    "/compare",
    "Sweepstakes Casino Comparisons: Head-to-Head Matchups",
    "Side-by-side sweepstakes casino comparisons. Bonuses, free daily SC, payout speed, and which site wins in every head-to-head matchup."
  ),
};

export default function CompareIndexPage() {
  // Group matchups by the higher-ranked site for a scannable index.
  const groups = new Map<string, { name: string; items: typeof matchups }>();
  for (const m of matchups) {
    const g = groups.get(m.a.slug) ?? { name: m.a.name, items: [] };
    g.items.push(m);
    groups.set(m.a.slug, g);
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Compare", item: `${siteConfig.url}/compare` },
    ],
  };

  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <nav className="flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-text">Home</Link>
        <span aria-hidden>›</span>
        <span className="text-text">Compare</span>
      </nav>

      <header className="mt-4">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">Head-to-head · 2026</p>
        <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">
          Sweepstakes casino <span className="text-accent">comparisons</span>
        </h1>
        <p className="mt-3 max-w-[62ch] text-muted leading-relaxed">
          Trying to decide between two sites? These head-to-head matchups put the top sweepstakes casinos
          side by side on the things that matter: welcome bonus, free daily Sweeps Coins, payout speed, and
          state availability. Pick a matchup below to see who wins.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {[...groups.values()].map((g) => (
          <section key={g.name}>
            <h2 className="text-sm font-semibold text-text">{g.name} vs…</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {g.items.map((m) => (
                <Link
                  key={m.slug}
                  href={`/compare/${m.slug}`}
                  className="rounded-lg border border-border bg-panel px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-text"
                >
                  vs {m.b.name} →
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
