import { getSite } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";
import { StateSiteCard } from "./StateSiteCard";

export type StateSiteEntry = {
  /** Site slug in data/sites.json. */
  slug: string;
  /** One-line positioning for this site, in this state. */
  blurb: string;
  /** Short selling points. */
  bullets: string[];
  /** Renders the "Top Pick" eyebrow on the first card. */
  topPick?: boolean;
};

/**
 * The recommended-sites list on a hand-written state page.
 *
 * This owns both outputs: the cards a reader sees and the ItemList structured
 * data describing them. They are built from the same filtered array, so a site
 * that is dropped for listing this state in restrictedStates cannot survive in
 * the markup, which would otherwise advertise a ranked list containing a site
 * the page does not show.
 */
export function StateSiteList({
  entries,
  state,
  stateAbbr,
  source,
}: {
  entries: StateSiteEntry[];
  state: string;
  stateAbbr: string;
  source: string;
}) {
  const live = entries.filter((e) => {
    const site = getSite(e.slug);
    if (!site) return false;
    if (site.shutdownNotice || site.comingSoon) return false;
    return !(site.restrictedStates ?? []).includes(state);
  });

  if (!live.length) return null;

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Sweepstakes Casinos in ${state}`,
    numberOfItems: live.length,
    itemListElement: live.map((e, i) => {
      const site = getSite(e.slug)!;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: site.name,
        url: `${siteConfig.url}/sites/${site.slug}`,
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      {live.map((e, i) => (
        <StateSiteCard
          key={e.slug}
          slug={e.slug}
          state={state}
          stateAbbr={stateAbbr}
          blurb={e.blurb}
          bullets={e.bullets}
          source={source}
          topPick={e.topPick}
          first={i === 0}
        />
      ))}
    </>
  );
}
