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
  shipping: { available: boolean; note: string };
  oddsPublished: boolean;
  platform: string;
  operator: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

export const ripSites: RipSite[] = ripSitesData as RipSite[];

export function getRipSite(slug: string): RipSite | undefined {
  return ripSites.find((s) => s.slug === slug);
}

/** Best first. Ties broken by name so the order is stable between builds. */
export function rankedRipSites(): RipSite[] {
  return [...ripSites].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
}

/**
 * A buyback is only worth the number attached to it if it pays something you
 * can actually spend elsewhere. Credit that only buys more packs is not a
 * payout, so the table flags it rather than printing the percentage alone.
 */
export function buybackIsCash(site: RipSite): boolean {
  return /cash/i.test(site.buyback.paidIn);
}

/** Where a referral link exists, send clicks through /go for tracking. */
export function ripOutboundUrl(site: RipSite): string {
  return site.affiliateUrl ? `/go/${site.slug}` : site.homepageUrl;
}
