/**
 * Level-progression table for sites built around a levelling system, where what
 * each tier unlocks is the thing readers are actually looking for. Rendered from
 * the `<<leveltable>>` marker in a review body.
 *
 * Two layouts off one data set: a real <table> from sm up, and stacked rows on
 * phones, where three columns would crush the unlock text to a word per line.
 */
export function LevelTable({
  rows,
  caption,
}: {
  rows: { level: number; name: string; unlocks: string }[];
  caption?: string;
}) {
  return (
    <figure className="mt-5">
      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="hidden sm:table-header-group">
            <tr className="bg-accent/[0.07]">
              <th scope="col" className="w-20 px-4 py-2.5 font-semibold">
                Level
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                Unlock
              </th>
              <th scope="col" className="px-4 py-2.5 font-semibold">
                What you get
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.level}
                className={`block border-t border-border first:border-t-0 sm:table-row sm:border-t ${
                  i % 2 ? "bg-accent/[0.03]" : ""
                }`}
              >
                <th
                  scope="row"
                  className="block px-4 pt-3 pb-0 text-left text-xs font-semibold uppercase tracking-wide text-accent sm:table-cell sm:py-2.5 sm:text-sm sm:normal-case sm:tracking-normal sm:text-text"
                >
                  Level {r.level}
                </th>
                <td className="block px-4 pt-1 font-semibold sm:table-cell sm:py-2.5">{r.name}</td>
                <td className="block px-4 pb-3 pt-0.5 text-muted sm:table-cell sm:py-2.5">{r.unlocks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-2 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
