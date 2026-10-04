import Link from "next/link";
import { getSite } from "@/lib/sites";
import { AffiliateLink } from "./AffiliateLink";

interface StateSiteCardProps {
  /** Site slug in data/sites.json. */
  slug: string;
  /** Full state name, e.g. "California". Must match the names in restrictedStates. */
  state: string;
  /** Postal abbreviation for the availability pill, e.g. "CA". */
  stateAbbr: string;
  /** One-line positioning for this site, in this state. */
  blurb: string;
  /** Short selling points. */
  bullets: string[];
  /** Analytics source, one per surface, e.g. "state_california". */
  source: string;
  /** Renders the "Top Pick" eyebrow. */
  topPick?: boolean;
  /** First card in a list gets a slightly larger top margin, matching the old markup. */
  first?: boolean;
}

/**
 * A recommended-site card on a hand-written state page.
 *
 * The point of this component is that availability is read from the data rather
 * than written into the page. A site that lists this state in restrictedStates,
 * or that is shutting down or not yet open, renders nothing at all. That stops a
 * state page from recommending somewhere its readers cannot actually play, which
 * is easy to miss when the page and the data are edited months apart.
 *
 * The outbound link also goes through AffiliateLink, so these cards get the same
 * /go redirect, rel="nofollow sponsored" and click tracking as every other
 * affiliate link on the site.
 */
export function StateSiteCard({
  slug,
  state,
  stateAbbr,
  blurb,
  bullets,
  source,
  topPick = false,
  first = false,
}: StateSiteCardProps) {
  const site = getSite(slug);
  if (!site) return null;
  if ((site.restrictedStates ?? []).includes(state)) return null;
  if (site.shutdownNotice || site.comingSoon) return null;

  return (
    <div
      className={`${first ? "mt-5" : "mt-4"} rounded-2xl border border-accent/40 bg-panel p-5`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {topPick && (
            <div className="text-xs uppercase tracking-widest text-accent mb-1">Top Pick</div>
          )}
          <h3 className="text-xl font-bold">{site.name}</h3>
          <p className="mt-1 text-sm text-muted">{blurb}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold px-3 py-1">
          Available in {stateAbbr}
        </span>
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-muted">
        {bullets.map((b) => (
          <li key={b} className="before:content-['✓'] before:text-accent before:mr-2">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-3">
        <AffiliateLink
          slug={site.slug}
          name={site.name}
          source={source}
          className="inline-block rounded-lg bg-accent text-bg font-semibold px-5 py-2.5 text-sm hover:opacity-90"
        >
          Sign Up for {site.name}
        </AffiliateLink>
        <Link
          href={`/sites/${site.slug}`}
          className="inline-block rounded-lg border border-border px-5 py-2.5 text-sm text-muted hover:text-text"
        >
          Read the Review
        </Link>
      </div>
    </div>
  );
}
