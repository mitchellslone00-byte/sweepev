import type { Site } from "@/lib/sites";

export type RecTag =
  | "Low Wagering"
  | "High RTP"
  | "Best Cashback"
  | "Beginner Friendly"
  | "Low Variance"
  | "Daily SC"
  | "Live Dealer"
  | "Strong Welcome";

export interface Recommendation {
  slug: string;
  name: string;
  bonus: string;
  affiliateUrl: string;
  tagline: string;
  rating: number;
  tags: RecTag[];
}

function bonusContains(site: Site, needle: string): boolean {
  return site.bonus.toLowerCase().includes(needle.toLowerCase());
}

function highlightsMention(site: Site, needle: string): boolean {
  return site.highlights.some((h) =>
    h.toLowerCase().includes(needle.toLowerCase())
  );
}

export function tagsFor(site: Site): RecTag[] {
  const tags: RecTag[] = [];

  // Low Wagering: every sweepstakes site we list runs 1x playthrough; tag the
  // ones with cleanly small welcome buys as the easiest entry points.
  if (bonusContains(site, "$10 for") || bonusContains(site, "$1 for")) {
    tags.push("Low Wagering");
  }

  // High RTP: any site flagging specific high-RTP washing games.
  if (
    site.strategy?.washingGames?.some((g) =>
      /97%|96\.5%|high-?9|high-?9\d|high-90/i.test(g)
    )
  ) {
    tags.push("High RTP");
  }

  // Daily SC: highlight or strategy mentions a recurring SC drop.
  if (
    highlightsMention(site, "daily sweeps") ||
    highlightsMention(site, "daily sc") ||
    highlightsMention(site, "daily login")
  ) {
    tags.push("Daily SC");
  }

  // Live dealer.
  if (
    highlightsMention(site, "live dealer") ||
    highlightsMention(site, "live game") ||
    site.strategy?.washingNotes?.toLowerCase().includes("live dealer")
  ) {
    tags.push("Live Dealer");
  }

  // Beginner Friendly: anything rated 4.6+ with a small welcome buy.
  if (site.rating >= 4.6 && (bonusContains(site, "$10 for") || bonusContains(site, "$20 for"))) {
    tags.push("Beginner Friendly");
  }

  // Low Variance: anything where we explicitly call out low-variance washing.
  if (
    site.strategy?.washingGames?.some((g) =>
      /low[- ]volatility|low[- ]variance|consistent/i.test(g)
    )
  ) {
    tags.push("Low Variance");
  }

  // Strong Welcome: $200-for-300, $20-for-75, etc.
  if (
    bonusContains(site, "$200 for 300") ||
    bonusContains(site, "$210 for 300") ||
    bonusContains(site, "$20 for 75") ||
    bonusContains(site, "$100 for 200")
  ) {
    tags.push("Strong Welcome");
  }

  // Cashback recovery isn't tracked per-site yet; reserved for future expansion.
  return tags;
}

export function buildRecommendations(sites: Site[]): Recommendation[] {
  return sites.map((s) => ({
    slug: s.slug,
    name: s.name,
    bonus: s.bonus,
    affiliateUrl: s.affiliateUrl,
    tagline: s.tagline,
    rating: s.rating,
    tags: tagsFor(s),
  }));
}

export const ALL_TAGS: RecTag[] = [
  "Low Wagering",
  "High RTP",
  "Best Cashback",
  "Beginner Friendly",
  "Low Variance",
  "Daily SC",
  "Live Dealer",
  "Strong Welcome",
];
