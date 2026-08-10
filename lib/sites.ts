import sitesData from "@/data/sites.json";

export type Site = {
  slug: string;
  name: string;
  tagline: string;
  rating: number;
  bonus: string;
  promoCode: string;
  homepageUrl: string;
  affiliateUrl: string;
  available: string;
  highlights: string[];
  pros: string[];
  cons: string[];
  strategy?: {
    edge: string;
    washingGames?: string[];
    washingNotes?: string;
    guideUrl?: string;
  };
  /** Custom page title for metadata and h1, used when the default "{name} Review" isn't enough. */
  reviewTitle?: string;
  restrictedStates?: string[];
  bonusImage?: string;
  saleImage?: string;
  promoImage?: string;
  dailyBonusImage?: string;
  /** Render bonus/daily images centered and capped (for lower-res screenshots) instead of full-width. */
  compactImages?: boolean;
  faqs?: { q: string; a: string }[];
  /** Optional tier override. Otherwise tier is derived from rank in SiteCard. */
  tier?: "S" | "A" | "B" | "C";
  relatedSites?: string[];
  statePages?: { label: string; href: string }[];
  /** Fastest redemption info for the Fastest Payouts page. speedHours = sort key (0 = instant). */
  redemption?: {
    fastestMethod: string;
    fastestTime: string;
    speedHours: number;
    min?: string | null;
    note?: string | null;
  };
  /** Daily login SC for the Free Daily SC page. amount = base (non-VIP) rate used for ranking/monthly calc. */
  dailySC?: {
    amount: number;
    display: string;
    claim: string;
    note: string | null;
    scales: boolean;
    /** True when the amount shown is a representative VIP-tier rate, not the base rate. */
    vip?: boolean;
    /** True when the site also drops free SC links we post in the Discord (extra on top of the login SC). */
    discordLinks?: boolean;
    /** Optional longer explanation shown in a hover/tap tooltip on the claim note. */
    tip?: string;
  };
};

export const sites: Site[] = sitesData as Site[];

export function getSite(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
