import ripSitesData from "@/data/rip-sites.json";

/**
 * Card rip sites are a separate vertical from the sweepstakes casinos in
 * sites.json. None of the casino fields transfer: there is no playthrough, no
 * daily SC and no Sweeps Coins balance. What decides whether one of these is
 * worth using is the buyback (what percentage, and whether it pays cash or
 * store credit), whether odds are published, and whether you can ship the card
 * at all. So they get their own type rather than optional fields bolted onto
 * Site.
 */
export interface RipSite {
  slug: string;
  name: string;
  tagline: string;
  homepageUrl: string;
  /** Referral link. Null until we have one; the UI falls back to homepageUrl. */
  affiliateUrl: string | null;
  /** Referral code, where one has to be typed in rather than carried by the link. */
  promoCode?: string;
  /** Search listing title. Budget is 50 chars; the layout appends " · SweepEV". */
  seoTitle: string;
  metaDescription: string;
  rating: number;
  /** The signup hook, which is what people scan this list for. */
  signupOffer: string;
  packPrices: string;
  categories: string[];
  buyback: {
    rate: string;
    /** "cash" and "cash balance" are real; "site credit" and "coins" are not. */
    paidIn: string;
    note: string;
  };
  /**
   * Recurring reward for showing up, the way the casinos have a daily SC drop.
   * Null means we have checked and found none; undefined means not yet checked,
   * and the two render differently so an unknown is never shown as a "no".
   */
  dailyReward?: {
    /** Short form for the table, e.g. "Up to $20 on day 7". */
    display: string;
    /** "cash streak", "free pack", "spin" - what kind of reward it is. */
    kind: string;
    /**
     * True where the reward is locked behind buying a pack. It still shows in
     * the table, but not as free value, because a daily you have to pay to
     * unlock is a loyalty mechanic rather than a giveaway.
     */
    requiresPurchase?: boolean;
    note: string;
    /** Screenshot of the reward screen, rendered capped and centred. */
    image?: string;
    /** Describes what the screenshot shows, for the alt text. */
    imageAlt?: string;
  } | null;
  /**
   * Read from the operator's own terms, not from round-ups.
   *
   * `restrictedStates: []` means we read the terms and they name no state.
   * `null` means we could not reach them. The two render differently, so a site
   * we could not check is never shown as available everywhere.
   */
  eligibility: {
    restrictedStates: string[] | null;
    minAge: number | null;
    note: string;
    source: string;
  };
  shipping: { available: boolean; note: string };
  oddsPublished: boolean;
  platform: string;
  operator: string;
  /**
   * Long-form review body. Structured rather than the casino side's marker
   * string, because these pages are built from scratch and an array of
   * sections is easier to keep honest than parsing markers out of prose.
   *
   * Everything here must be specific to the site. The first cut of these pages
   * ran about 270 unique words each with 31% of the text shared between them,
   * which reads as templated and competes for nothing.
   */
  sections?: { heading: string; body: string[] }[];
  /**
   * Questions people actually search for this site, answered. Rendered visibly
   * and as FAQPage schema, so the questions must be real ones and the answers
   * must stand on their own.
   */
  faqs?: { q: string; a: string }[];
  pros: string[];
  cons: string[];
  verdict: string;
}

export const ripSites: RipSite[] = ripSitesData as RipSite[];

export function getRipSite(slug: string): RipSite | undefined {
  return ripSites.find((s) => s.slug === slug);
}

/**
 * Running order, best first. Position in the file is the ranking, the same way
 * sites.json works, so the order can reflect judgement that no single column
 * captures. Rating stays an independent score and will not always descend.
 */
export function rankedRipSites(): RipSite[] {
  return [...ripSites];
}

/**
 * A buyback is only worth the number attached to it if it pays something you
 * can actually spend elsewhere. Credit that only buys more packs is not a
 * payout, so the table flags it rather than printing the percentage alone.
 */
export function buybackIsCash(site: RipSite): boolean {
  return /cash/i.test(site.buyback.paidIn);
}

/** Rough body length, for spotting pages too thin to rank. */
export function bodyWordCount(site: RipSite): number {
  const parts = [
    site.tagline,
    site.verdict,
    site.buyback.note,
    site.shipping.note,
    site.dailyReward?.note ?? "",
    ...site.pros,
    ...site.cons,
    ...(site.sections ?? []).flatMap((s) => [s.heading, ...s.body]),
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

/** Sites with a confirmed recurring reward, best rated first. */
export function withDailyRewards(): RipSite[] {
  return rankedRipSites().filter((s) => s.dailyReward);
}

/** Where a referral link exists, send clicks through /go for tracking. */
export function ripOutboundUrl(site: RipSite): string {
  return site.affiliateUrl ? `/go/${site.slug}` : site.homepageUrl;
}
