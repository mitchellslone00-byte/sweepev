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
  /** Optional tier override. Otherwise tier is derived from rank in SiteCard. */
  tier?: "S" | "A" | "B" | "C";
  relatedSites?: string[];
  statePages?: { label: string; href: string }[];
};

export const sites: Site[] = sitesData as Site[];

export function getSite(slug: string): Site | undefined {
  return sites.find((s) => s.slug === slug);
}
