import { stateByCode, STATUS_LABEL, type StateStatus } from "@/lib/states";
import { US_VIEWBOX, US_PATHS, US_CENTROIDS } from "@/lib/us-geo";
import { MapTooltip } from "@/components/MapTooltip";

const FILL: Record<StateStatus, string> = {
  available: "#10b981", // emerald-500
  iffy: "#f59e0b", // amber-500
  banned: "#ef4444", // red-500
};

// Small Northeast states + DC get labels placed to the right with leader lines.
const EXTERNAL: [string, number][] = [
  ["NH", 120],
  ["VT", 142],
  ["MA", 164],
  ["RI", 186],
  ["CT", 208],
  ["NJ", 230],
  ["DE", 252],
  ["MD", 274],
  ["DC", 296],
];
const EXTERNAL_SET = new Set(EXTERNAL.map(([c]) => c));
const LABEL_X = 1250;
// Widened viewBox (extra room on the right) used only when labels are shown.
const LABELED_VIEWBOX = "192 9 1180 746";

export function LegalityMap({ labels = false }: { labels?: boolean }) {
  return (
    <MapTooltip>
      <svg
        viewBox={labels ? LABELED_VIEWBOX : US_VIEWBOX}
        className="h-auto w-full"
        role="img"
        aria-label="Map of US sweepstakes casino legality by state"
      >
        {Object.entries(US_PATHS).map(([code, d]) => {
          const s = stateByCode[code];
          const status: StateStatus = s?.status ?? "available";
          return (
            <path
              key={code}
              d={d}
              className="us-state"
              style={{ fill: FILL[status] }}
              data-code={code}
              data-slug={s?.slug ?? ""}
              data-name={s?.name ?? code}
              data-status={s ? STATUS_LABEL[s.status] : ""}
              data-note={s?.note ?? ""}
            />
          );
        })}

        {labels && (
          <>
            {/* Internal labels — non-interactive; clicks fall through to the state */}
            <g pointerEvents="none">
              {Object.entries(US_CENTROIDS).map(([code, [cx, cy]]) =>
                EXTERNAL_SET.has(code) ? null : (
                  <text
                    key={code}
                    x={cx}
                    y={cy}
                    className="us-label"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {code}
                  </text>
                )
              )}
            </g>
            {/* External labels with leader lines — interactive so tiny states are clickable */}
            {EXTERNAL.map(([code, ly]) => {
              const c = US_CENTROIDS[code];
              const s = stateByCode[code];
              if (!c) return null;
              return (
                <g key={code}>
                  <line
                    x1={c[0]}
                    y1={c[1]}
                    x2={LABEL_X - 5}
                    y2={ly}
                    className="us-leader"
                    pointerEvents="none"
                  />
                  <text
                    x={LABEL_X}
                    y={ly}
                    className="us-label us-label--ext us-label--link"
                    textAnchor="start"
                    dominantBaseline="central"
                    data-code={code}
                    data-slug={s?.slug ?? ""}
                    data-name={s?.name ?? code}
                    data-status={s ? STATUS_LABEL[s.status] : ""}
                    data-note={s?.note ?? ""}
                  >
                    {code}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>
    </MapTooltip>
  );
}

export function LegalityLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-emerald-500" />
        Available
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-amber-500" />
        Gray area
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-3 w-3 rounded-sm bg-red-500" />
        Banned / not served
      </span>
    </div>
  );
}
