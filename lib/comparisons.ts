import { sites, type Site } from "@/lib/sites";

export type Matchup = { a: Site; b: Site; slug: string };

function tierRank(t?: string): number {
  return t === "S" ? 4 : t === "A" ? 3 : t === "B" ? 2 : t === "C" ? 1 : 0;
}

/** Derive a tier the same way SiteCard does when there's no override. */
export function tierOf(site: Site, rank: number): "S" | "A" | "B" | "C" {
  if (site.tier) return site.tier;
  if (rank <= 5) return "S";
  if (rank <= 10) return "A";
  if (rank <= 14) return "B";
  return "C";
}

/**
 * Curated head-to-head matchups: the comparisons people actually search.
 * We pair marquee top sites, sister sites, and closely-ranked rivals, and
 * canonicalize each pair so A-vs-B and B-vs-A resolve to one page.
 */
export function buildMatchups(): Matchup[] {
  const active = sites.filter((s) => !s.shutdownNotice && !s.comingSoon);
  const rankOf = new Map(active.map((s, i) => [s.slug, i]));
  const pairs = new Map<string, Matchup>();

  const add = (x: Site, y: Site) => {
    if (x.slug === y.slug) return;
    // Higher-ranked (lower index) goes first for a deterministic slug.
    const [a, b] =
      (rankOf.get(x.slug) ?? 0) <= (rankOf.get(y.slug) ?? 0) ? [x, y] : [y, x];
    const slug = `${a.slug}-vs-${b.slug}`;
    if (!pairs.has(slug)) pairs.set(slug, { a, b, slug });
  };

  // 1. Marquee: every pair among the top 8.
  const top8 = active.slice(0, 8);
  for (let i = 0; i < top8.length; i++)
    for (let j = i + 1; j < top8.length; j++) add(top8[i], top8[j]);

  // 2. Sister-site matchups (from relatedSites).
  for (const s of active) {
    for (const rel of s.relatedSites ?? []) {
      const r = active.find((x) => x.slug === rel);
      if (r) add(s, r);
    }
  }

  // 3. Closely-ranked rivals: each top-18 site vs its next two neighbors.
  const topN = Math.min(18, active.length);
  for (let i = 0; i < topN; i++) {
    if (active[i + 1]) add(active[i], active[i + 1]);
    if (active[i + 2]) add(active[i], active[i + 2]);
  }

  return [...pairs.values()];
}

export const matchups = buildMatchups();

export const matchupBySlug: Record<string, Matchup> = Object.fromEntries(
  matchups.map((m) => [m.slug, m])
);

/** Rank (1-based) of a site in the full ranking, for tier derivation. */
export function rankOfSite(slug: string): number {
  return sites.findIndex((s) => s.slug === slug) + 1;
}

export { tierRank };
