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
  dailyBonusImage?: string;
  faqs?: { q: string; a: string }[];
  /** Optional tier override. Otherwise tier is derived from rank in SiteCard. */
  tier?: "S" | "A" | "B" | "C";
  relatedSites?: string[];
  statePages?: { label: string; href: string }[];
};

export const sites: Site[] = sitesData as Site[];

export function getSite(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
