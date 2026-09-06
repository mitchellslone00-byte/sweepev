import Link from "next/link";

/**
 * One-line trust answer near the top of a review, targeting the "is <site> legit" query
 * with a direct yes before the detail further down the page.
 *
 * A left rule rather than a box: reviews already carry an "Is X legit?" <h2> lower down,
 * and a second bordered callout up here competed with the offer it sits under. Matches the
 * "How we verify" treatment on /where-legal.
 */
export function LegitCallout({ name, rating }: { name: string; rating: number }) {
  return (
    <p className="mt-5 border-l-[3px] border-emerald-500/70 py-1 pl-4 text-sm leading-relaxed text-muted">
      <span className="font-semibold text-text">Is {name} legit?</span>{" "}
      <span className="font-semibold text-emerald-400">Yes.</span> We personally test and vet
      every casino before listing it, confirming redemptions actually pay, and {name} scores{" "}
      <span className="font-semibold text-text">{rating.toFixed(1)}/5</span> in our testing. Sites
      that fail get downranked or left off, whatever they pay us.{" "}
      <Link
        href="/#how-we-rank"
        className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
      >
        How we rank
      </Link>
    </p>
  );
}
