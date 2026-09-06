import { ImageResponse } from "next/og";
import { computeEV, evVerdict, type EVInputs } from "@/lib/calculators/ev";
import { decodeInputs } from "@/lib/calculators/ev-url";

/**
 * Share card for a specific calculation.
 *
 * This is a route handler rather than an opengraph-image file because those are generated
 * per route and never receive the query string, and the whole point here is that a shared
 * link previews the numbers it actually contains.
 *
 * The verdict and decoding come from the same pure functions the page uses, so the card can
 * never disagree with what someone sees after clicking through.
 */

export const runtime = "edge";

const DEFAULTS: EVInputs = {
  deposit: 20,
  bonus: 60,
  playthroughMultiplier: 1,
  rtp: 0.96,
  cashbackPct: 0,
  averageBet: 0.2,
  volatility: "medium",
  redemptionMin: 0,
};

const money = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString("en-US")}`;

const BG = "#0b0d12";
const PANEL = "#12161f";
const BORDER = "#222838";
const TEXT = "#e8ecf3";
const MUTED = "#9aa3b2";

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        background: PANEL,
        border: `1px solid ${BORDER}`,
        borderRadius: 20,
        padding: "26px 30px",
      }}
    >
      <div style={{ fontSize: 22, color: MUTED, letterSpacing: 1.5, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: value.length > 9 ? 38 : 60, fontWeight: 800, color, marginTop: 8 }}>
        {value}
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inputs = decodeInputs(searchParams, DEFAULTS);
  const out = computeEV(inputs);
  const verdict = evVerdict(inputs, out);

  const accent =
    verdict.tone === "good" ? "#22c55e" : verdict.tone === "marginal" ? "#facc15" : "#ef4444";

  const signed = (n: number) => `${n >= 0 ? "+" : "−"}${money(n)}`;
  const profit = signed(out.expectedValue);
  const range = `${signed(out.outcomes.worst)} to ${signed(out.outcomes.best)}`;

  const stats = out.meetsRedemptionMin
    ? [
        { label: "You redeem", value: money(out.realisticCashout), color: TEXT },
        { label: "Profit", value: profit, color: accent },
        { label: "Likely range", value: range, color: TEXT },
      ]
    : [
        { label: "Balance", value: money(out.realisticCashout), color: TEXT },
        { label: "Minimum", value: money(inputs.redemptionMin ?? 0), color: TEXT },
        { label: "Short by", value: money(out.redemptionShortfall), color: accent },
      ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BG,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: MUTED, letterSpacing: 2 }}>
            SWEEPEV · EV CALCULATOR
          </div>
          <div style={{ display: "flex", fontSize: 26, color: MUTED }}>
            {Math.round(inputs.rtp * 1000) / 10}% RTP · {inputs.playthroughMultiplier}× playthrough
          </div>
        </div>

        {/* Verdict + the offer it applies to */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", width: 10, height: 58, background: accent, borderRadius: 6 }} />
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 800,
                color: accent,
                marginLeft: 22,
              }}
            >
              {verdict.label}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 40, color: TEXT, marginTop: 22 }}>
            {money(inputs.deposit)} for {Math.round(inputs.bonus).toLocaleString("en-US")} SC
            {inputs.redemptionMin ? ` · ${Math.round(inputs.redemptionMin)} SC minimum` : ""}
          </div>
        </div>

        {/* The numbers */}
        <div style={{ display: "flex", width: "100%", gap: 20 }}>
          {stats.map((s) => (
            <Stat key={s.label} label={s.label} value={s.value} color={s.color} />
          ))}
        </div>

        <div style={{ display: "flex", fontSize: 24, color: MUTED }}>
          sweepev.com/tools/ev-calculator
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
