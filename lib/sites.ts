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
  /** Visible h1 on the review page. Falls back to "{name} Review". */
  reviewTitle?: string;
  /**
   * The <title> tag, tuned for a search listing rather than as a page heading.
   * Budget 50 characters: the layout template appends " · SweepEV".
   */
  seoTitle?: string;
  /** Custom meta description for the review page, for CTR-tuned search snippets. */
  metaDescription?: string;
  /** ISO 8601 date the review was first published (Review schema datePublished). Falls back to siteConfig.lastUpdatedISO. */
  publishedAt?: string;
  /** ISO 8601 date the review was last updated (Review schema dateModified). Falls back to siteConfig.lastUpdatedISO. */
  updatedAt?: string;
  /** Short path for where to redeem the promo code, shown in the offer box, e.g. "Get Coins → Redeem Code". */
  promoCodeHow?: string;
  restrictedStates?: string[];
  /**
   * Sites we have positively confirmed still serve states that ban the standard
   * dual-currency model. Banned-state pages list only these, so a site missing
   * restrictedStates data is never surfaced there by accident. The optional
   * per-state note explains how the product differs.
   */
  bannedStateAccess?: {
    note: string;
    states?: Record<string, string>;
    /** Optional deeper page per state, e.g. /states/indiana/crown-coins. */
    guides?: Record<string, string>;
  };
  bonusImage?: string;
  saleImage?: string;
  promoImage?: string;
  dailyBonusImage?: string;
  /** Wide lobby/interface screenshot, rendered full-width (not affected by compactImages). */
  interfaceImage?: string;
  /** Tall/portrait screenshot (e.g. a daily streak ladder), always rendered capped and centered. */
  dailyLadderImage?: string;
  /** Screenshot of the VIP / loyalty program, always rendered capped and centered. */
  vipImage?: string;
  /** Screenshot of the VIP tier table, always rendered capped and centered. */
  vipTiersImage?: string;
  /** Screenshot of the missions or quests panel, always rendered capped and centered. */
  missionsImage?: string;
  /** Screenshot of a seasonal game pass and its tier rewards, always rendered capped and centered. */
  gamePassImage?: string;
  /** Screenshot of the monthly challenge list and tier milestones, always rendered capped and centered. */
  monthlyChallengesImage?: string;
  /** Screenshot of a processed redemption receipt, always rendered capped and centered. */
  redemptionImage?: string;
  /** Overrides the generated alt for redemptionImage, for shots that are not a receipt. */
  redemptionImageAlt?: string;
  /** Redeemable bonus codes for free SC — shown as a bold callout on the review and a homepage banner. */
  bonusCodes?: { code: string; sc: number }[];
  /** Render bonus/daily images centered and capped (for lower-res screenshots) instead of full-width. */
  compactImages?: boolean;
  faqs?: { q: string; a: string }[];
  /** Optional tier override. Otherwise tier is derived from rank in SiteCard. */
  tier?: "S" | "A" | "B" | "C";
  /** When set, the site is announced but registration is not open yet. Renders a launch
   * banner, suppresses the rating and Review schema, and keeps it out of rankings and comparisons. */
  comingSoon?: { message: string; image?: string };
  /** When set, renders a prominent closure banner (review) and a "shutting down" overlay (ranking card). */
  shutdownNotice?: {
    /** Display date shown in the banner/overlay headline, e.g. "September 26th". */
    date: string;
    /** ISO date of the final day, e.g. "2026-10-28". Drives hasClosed(). */
    endsAt?: string;
    /** Full notice paragraph shown in the review-page banner. */
    message: string;
  };
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

/**
 * True once a closing site's final day has passed.
 *
 * Both previous closures sat on the site in future tense for weeks after the
 * fact, because taking them down was a thing someone had to remember. This
 * makes listings stop recommending a dead site on the next build instead.
 */
export function hasClosed(site: Site): boolean {
  const endsAt = site.shutdownNotice?.endsAt;
  if (!endsAt) return false;
  return new Date().toISOString().slice(0, 10) > endsAt;
}

/** Sites eligible for rankings and listings: open, launched, and not past their closing date. */
export const listableSites: Site[] = sites.filter(
  (s) => !hasClosed(s) && !s.comingSoon
);
export function getSite(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
