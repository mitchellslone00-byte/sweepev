"use client";

import { useEffect, useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import Link from "next/link";
import {
  computeEV,
  type EVInputs,
  type EVOutputs,
  type Volatility,
  type RiskRating,
  evVerdict,
} from "@/lib/calculators/ev";
import { decodeInputs, buildQuery, hasInputs } from "@/lib/calculators/ev-url";
import { type Recommendation } from "@/lib/calculators/recommendations";

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

// Slightly different defaults for Scenario B so the comparison demonstrates impact.
const DEFAULTS_B: EVInputs = {
  ...DEFAULTS,
  rtp: 0.94,
  averageBet: 0.5,
  volatility: "high",
};

function fmtMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

function fmtPct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(1)}%`;
}

function riskColor(r: RiskRating): string {
  if (r === "low") return "border-emerald-500/40 bg-emerald-500/15 text-emerald-200";
  if (r === "moderate") return "border-amber-500/40 bg-amber-500/15 text-amber-200";
  return "border-rose-500/40 bg-rose-500/15 text-rose-200";
}

function evColor(ev: number): string {
  if (ev > 0.5) return "text-emerald-300";
  if (ev < -0.5) return "text-rose-300";
  return "text-text";
}

interface InputRowProps {
  label: string;
  tooltip?: string;
  prefix?: string;
  suffix?: string;
  value: number;
  step?: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

function InputRow({
  label,
  tooltip,
  prefix,
  suffix,
  value,
  step = 1,
  min = 0,
  max,
  onChange,
}: InputRowProps) {
  // Track the raw text the user typed so empty / intermediate states ("", "1.", "0.0") survive re-renders.
  const [raw, setRaw] = useState<string>(() => String(value));

  // Sync the display text when the value changes from outside (e.g. Reset button).
  // Skip if the current text already represents the same numeric value, or if the user has intentionally cleared the field.
  useEffect(() => {
    const parsed = parseFloat(raw);
    const sameValue = Number.isFinite(parsed) && parsed === value;
    const intentionallyEmpty = raw === "" && value === 0;
    if (!sameValue && !intentionallyEmpty) {
      setRaw(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted font-semibold">
        {label}
        {tooltip && (
          <span
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-border text-[10px] cursor-help"
            title={tooltip}
            aria-label={tooltip}
          >
            ?
          </span>
        )}
      </span>
      <div className="mt-1 flex items-center rounded-lg border border-border bg-panel2 focus-within:border-accent transition-colors">
        {prefix && <span className="pl-2 sm:pl-3 text-sm text-muted">{prefix}</span>}
        <input
          type="number"
          value={raw}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const next = e.target.value;
            setRaw(next);
            const n = parseFloat(next);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className="flex-1 min-w-0 bg-transparent px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base outline-none tabular-nums"
        />
        {suffix && <span className="pr-2 sm:pr-3 text-sm text-muted">{suffix}</span>}
      </div>
    </label>
  );
}

function ResultCell({
  label,
  value,
  tooltip,
  emphasis,
  valueClassName,
}: {
  label: string;
  value: string;
  tooltip?: string;
  emphasis?: boolean;
  valueClassName?: string;
}) {
  return (
    <div
      className={`rounded-lg border ${
        emphasis ? "border-accent/40 bg-panel2" : "border-border bg-panel"
      } px-3 py-2 sm:px-4 sm:py-3`}
    >
      <div
        className="text-[10px] uppercase tracking-widest text-muted font-semibold flex items-center gap-1 sm:gap-1.5"
        title={tooltip}
      >
        <span className="truncate">{label}</span>
        {tooltip && (
          <span
            className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-border text-[9px] cursor-help shrink-0"
            aria-label={tooltip}
          >
            ?
          </span>
        )}
      </div>
      <div
        className={`mt-0.5 sm:mt-1 font-bold tabular-nums tracking-tight transition-colors duration-200 ${
          emphasis ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
        } ${valueClassName ?? "text-text"}`}
      >
        {value}
      </div>
    </div>
  );
}

interface ScenarioProps {
  label?: string;
  inputs: EVInputs;
  onChange: (inputs: EVInputs) => void;
  out: EVOutputs;
  onReset: () => void;
}

function Scenario({ label, inputs, onChange, out, onReset }: ScenarioProps) {
  const update = <K extends keyof EVInputs>(key: K, value: EVInputs[K]) =>
    onChange({ ...inputs, [key]: value });

  return (
    <section className="grid gap-3 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* INPUTS */}
      <div className="rounded-2xl border border-border bg-panel p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold">
            {label ? `${label} · Inputs` : "Inputs"}
          </h2>
        </div>
        <p className="text-xs text-muted mt-1 hidden sm:block">
          Adjust any value. Results update instantly.
        </p>

        <div className="mt-3 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-4">
          <InputRow
            label="Bundle price"
            tooltip="What the package costs you. This money is spent, unlike a casino deposit that stays in your balance."
            prefix="$"
            value={inputs.deposit}
            step={5}
            onChange={(v) => update("deposit", v)}
          />
          <InputRow
            label="Sweeps Coins you get"
            tooltip="Sweeps Coins the bundle gives you. This is the only part with redeemable value; the Gold Coins do not count. Redeems at 1 SC to $1."
            suffix=" SC"
            value={inputs.bonus}
            step={5}
            onChange={(v) => update("bonus", v)}
          />
          <InputRow
            label="Playthrough multiplier"
            tooltip="How many times the bonus / SC bundle must be wagered before redeeming. A 50 SC bundle with a 2× playthrough means 100 SC must be wagered. Sweepstakes typically run 1×; online casino bonuses commonly 20×–40×."
            suffix="×"
            value={inputs.playthroughMultiplier}
            step={1}
            min={0}
            onChange={(v) => update("playthroughMultiplier", v)}
          />
          <InputRow
            label="Redemption minimum"
            tooltip="The balance the site requires before it lets you cash out. A bonus you cannot physically reach the minimum on is not worth taking, whatever the EV says. Leave at 0 to ignore."
            prefix="$"
            value={inputs.redemptionMin ?? 0}
            step={10}
            min={0}
            onChange={(v) => update("redemptionMin", v)}
          />
          <InputRow
            label="RTP"
            tooltip="Return to Player of the game you'll clear playthrough on, from its paytable. Higher RTP means less of your Sweeps Coins burns off on the way to a redemption. Most slots run 94-97%."
            suffix="%"
            value={Math.round(inputs.rtp * 1000) / 10}
            step={0.1}
            min={50}
            max={100}
            onChange={(v) => update("rtp", Math.max(0, Math.min(1, v / 100)))}
          />
          <InputRow
            label="Cashback"
            tooltip="Percentage of net losses recovered through cashback or rakeback."
            suffix="%"
            value={Math.round(inputs.cashbackPct * 1000) / 10}
            step={0.5}
            min={0}
            max={100}
            onChange={(v) =>
              update("cashbackPct", Math.max(0, Math.min(1, v / 100)))
            }
          />
          <InputRow
            label="Average bet"
            tooltip="Average bet per spin. Smaller bets mean lower variance, so your result lands closer to the average."
            prefix="$"
            value={inputs.averageBet}
            step={0.05}
            min={0.01}
            onChange={(v) => update("averageBet", v)}
          />
          <label className="block col-span-2">
            <span className="text-xs uppercase tracking-widest text-muted font-semibold">
              Volatility
            </span>
            <div className="mt-1 grid grid-cols-3 gap-1 rounded-lg border border-border bg-panel2 p-1">
              {(["low", "medium", "high"] as Volatility[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update("volatility", v)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    inputs.volatility === v
                      ? "bg-accent text-bg"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {v[0].toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </label>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="mt-3 sm:mt-5 text-xs text-muted hover:text-text underline"
        >
          Reset to defaults
        </button>
      </div>

      {/* RESULTS */}
      <div className="rounded-2xl border border-accent/40 bg-panel p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h2 className="text-base sm:text-lg font-bold">
            {label ? `${label} · Results` : "Results"}
          </h2>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${riskColor(
              out.riskRating
            )}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {out.riskRating[0].toUpperCase() + out.riskRating.slice(1)} risk
          </span>
        </div>

        {/* Plain-English verdict */}
        <div
          className={`mt-3 rounded-lg border px-3 py-2.5 text-sm leading-relaxed ${
            out.expectedValue > 0.5
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
              : out.expectedValue < -0.5
              ? "border-rose-500/40 bg-rose-500/10 text-rose-100"
              : "border-border bg-panel2 text-muted"
          }`}
        >
          {out.expectedValue > 0.5 ? (
            <>
              <strong className="text-emerald-300">✓ Worth it (+EV).</strong> On average this setup nets
              you about <strong>{fmtMoney(out.expectedValue)}</strong>. You come out ahead over the long
              run.
            </>
          ) : out.expectedValue < -0.5 ? (
            <>
              <strong className="text-rose-300">✗ Not worth it (−EV).</strong> On average you&apos;d lose
              about <strong>{fmtMoney(Math.abs(out.expectedValue))}</strong>. Skip it unless the terms
              improve.
            </>
          ) : (
            <>
              <strong className="text-text">≈ Roughly break-even.</strong> This setup is close to neutral on
              average. Small edges (a higher-RTP game, cashback, or a bigger bonus) tip it either way.
            </>
          )}
        </div>

        <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
          <ResultCell
            label="Estimated value"
            tooltip="Average net result vs your deposit, over many trials."
            value={fmtMoney(out.expectedValue)}
            emphasis
            valueClassName={evColor(out.expectedValue)}
          />
          <ResultCell
            label="Realistic cashout"
            tooltip="Sweeps Coins you can expect to have left once playthrough is cleared, at 1 SC to $1."
            value={fmtMoney(out.realisticCashout)}
            emphasis
          />
          <ResultCell
            label="Total playthrough"
            tooltip="Total dollars cycled through the games to clear playthrough."
            value={fmtMoney(out.totalWagered)}
          />
          <ResultCell
            label="Estimated playthrough loss"
            tooltip="Expected dollars given back to the house at the chosen RTP."
            value={fmtMoney(out.expectedLoss)}
          />
          <ResultCell
            label="Cashback recovered"
            tooltip="Cashback / rakeback recovered on the playthrough loss."
            value={fmtMoney(out.cashbackRecovered)}
          />
          <ResultCell
            label="Break-even RTP"
            tooltip="The slot RTP at which estimated value crosses zero, given your bonus and playthrough."
            value={fmtPct(out.breakEvenRtp)}
          />
          <div className="col-span-2">
            <ResultCell
              label="Likely range (±1σ)"
              tooltip="Approximate range of net outcomes one standard deviation either side of the average. Captures roughly the middle 68% of expected results."
              value={`${fmtMoney(out.outcomes.worst)} → ${fmtMoney(
                out.outcomes.best
              )}`}
            />
          </div>
        </div>

        <details className="mt-5 rounded-lg border border-border bg-panel2 p-4 group">
          <summary className="cursor-pointer text-sm font-semibold list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-3">
            <span>How this is calculated</span>
            <span className="text-muted text-xs transition-transform group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="mt-3 space-y-2 text-xs text-muted leading-relaxed">
            <p>
              <strong className="text-text">Total playthrough</strong> = bonus
              × playthrough multiplier. Playthrough applies to the bonus / SC
              bundle, not the deposit.
            </p>
            <p>
              <strong className="text-text">Expected loss</strong> = total
              playthrough × (1 − RTP). At 97% RTP you give back 3% of every
              dollar you play through on average.
            </p>
            <p>
              <strong className="text-text">Cashback recovered</strong> =
              expected loss × cashback %.
            </p>
            <p>
              <strong className="text-text">Estimated value</strong> = (deposit
              Sweeps Coins − expected loss + cashback − bundle price. Positive
              means a profitable buy on average; negative means a losing one.
            </p>
            <p>
              <strong className="text-text">The likely range</strong> uses a
              normal approximation: variance per spin scales with bet size and
              volatility, and total variance scales with the number of spins.
              Real slot distributions are skewed by jackpots, so treat the
              range as directional, not exact.
            </p>
            <p>
              <strong className="text-text">Likely range</strong> is roughly
              one standard deviation either side of the estimated value (the
              middle ~68% of outcomes), with the worst case floored at losing
              what the bundle cost you.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}

export function EVCalculator({
  recommendations,
  faqs,
}: {
  recommendations: Recommendation[];
  faqs: { q: string; a: string }[];
}) {
  const [inputsA, setInputsA] = useState<EVInputs>(DEFAULTS);
  const [inputsB, setInputsB] = useState<EVInputs>(DEFAULTS_B);
  const [compareMode, setCompareMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"a" | "b" | "results">("a");

  const [copied, setCopied] = useState(false);

  // Restore a shared calculation. Read from window rather than useSearchParams so the
  // page can stay statically rendered.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!hasInputs(params)) return;
    setInputsA((prev) => decodeInputs(params, prev));
    setInputsB((prev) => decodeInputs(params, prev, "2"));
    if (params.get("cmp") === "1") setCompareMode(true);
  }, []);

  const outA = useMemo(() => computeEV(inputsA), [inputsA]);
  const outB = useMemo(() => computeEV(inputsB), [inputsB]);

  const filtered = useMemo(
    () =>
      [...recommendations]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8),
    [recommendations]
  );

  const query = useMemo(
    () => buildQuery(inputsA, inputsB, compareMode),
    [inputsA, inputsB, compareMode]
  );

  useEffect(() => {
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }, [query]);

  const verdictA = useMemo(() => evVerdict(inputsA, outA), [inputsA, outA]);

  const diff = outB.expectedValue - outA.expectedValue;
  const winner = Math.abs(diff) < 0.01 ? "tie" : diff > 0 ? "B" : "A";

  return (
    <>
      {/* Compare toggle + shareable link */}
      <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={async () => {
            const url = `${window.location.origin}${window.location.pathname}?${query}`;
            try {
              await navigator.clipboard.writeText(url);
            } catch {
              // Clipboard can be blocked; the URL bar already holds the same link.
            }
            setCopied(true);
            track("ev_calculator_share");
            window.setTimeout(() => setCopied(false), 2000);
          }}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-panel px-4 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-text"
        >
          <span aria-hidden className="text-sm leading-none">{copied ? "✓" : "🔗"}</span>
          {copied ? "Link copied" : "Copy link to this calc"}
        </button>
        <button
          type="button"
          onClick={() => {
            setCompareMode((v) => !v);
            setActiveTab("a");
          }}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
            compareMode
              ? "border-accent bg-accent text-bg"
              : "border-border bg-panel text-muted hover:text-text"
          }`}
          aria-pressed={compareMode}
        >
          <span aria-hidden className="text-sm leading-none">
            {compareMode ? "✓" : "+"}
          </span>
          {compareMode ? "Comparing two scenarios" : "Compare two scenarios"}
        </button>
      </div>

      {/* Mobile-only tab bar (compare mode) */}
      {compareMode && (
        <div className="md:hidden mt-4 grid grid-cols-3 gap-1 rounded-lg border border-border bg-panel2 p-1">
          {(["a", "b", "results"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={`px-2 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === t
                  ? "bg-accent text-bg"
                  : "text-muted hover:text-text"
              }`}
            >
              {t === "a" ? "Scenario A" : t === "b" ? "Scenario B" : "Results"}
            </button>
          ))}
        </div>
      )}

      {/* Scenario A */}
      <div
        className={`mt-4 ${
          compareMode && activeTab !== "a" ? "hidden md:block" : ""
        }`}
      >
        {!compareMode && (
          <div
            className={`mt-4 mb-6 sm:mb-8 rounded-2xl border-2 p-4 sm:p-5 ${
              verdictA.tone === "good"
                ? "border-accent/60 bg-accent/[0.08]"
                : verdictA.tone === "marginal"
                ? "border-accent2/60 bg-accent2/[0.08]"
                : "border-red-500/60 bg-red-500/10"
            }`}
          >
            <div
              className={`text-sm font-black uppercase tracking-wide ${
                verdictA.tone === "good"
                  ? "text-accent"
                  : verdictA.tone === "marginal"
                  ? "text-accent2"
                  : "text-red-400"
              }`}
            >
              {verdictA.label}
            </div>
            <p className="mt-1 text-sm sm:text-base leading-relaxed text-text">{verdictA.detail}</p>
          </div>
        )}

        <Scenario
          label={compareMode ? "Scenario A" : undefined}
          inputs={inputsA}
          onChange={setInputsA}
          out={outA}
          onReset={() => setInputsA(DEFAULTS)}
        />
      </div>

      {/* Scenario B (compare mode) */}
      {compareMode && (
        <>
          <div
            className={`mt-6 ${
              activeTab !== "b" ? "hidden md:block" : ""
            }`}
          >
            <Scenario
              label="Scenario B"
              inputs={inputsB}
              onChange={setInputsB}
              out={outB}
              onReset={() => setInputsB(DEFAULTS_B)}
            />
          </div>

          {/* Comparison summary */}
          <div
            className={`mt-6 rounded-2xl border border-accent/40 bg-panel p-5 sm:p-6 ${
              activeTab !== "results" ? "hidden md:block" : ""
            }`}
          >
            <h3 className="text-lg font-bold">A vs B summary</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-panel2 px-4 py-3">
                <div className="text-[10px] uppercase tracking-widest text-muted font-semibold">
                  Estimated value gap
                </div>
                <div
                  className={`mt-1 text-xl font-bold tabular-nums ${
                    diff > 0
                      ? "text-emerald-300"
                      : diff < 0
                      ? "text-rose-300"
                      : "text-text"
                  }`}
                >
                  {diff > 0 ? "+" : ""}
                  {fmtMoney(diff)}
                </div>
                <p className="mt-1 text-xs text-muted">B minus A</p>
              </div>
              <div className="rounded-lg border border-border bg-panel2 px-4 py-3">
                <div className="text-[10px] uppercase tracking-widest text-muted font-semibold">
                  Better setup
                </div>
                <div className="mt-1 text-xl font-bold">
                  {winner === "tie"
                    ? "Tie"
                    : winner === "B"
                    ? "Scenario B"
                    : "Scenario A"}
                </div>
                <p className="mt-1 text-xs text-muted">
                  Higher estimated value wins
                </p>
              </div>
              <div className="rounded-xl border border-border bg-panel p-4">
                <div className="text-[10px] uppercase tracking-widest text-muted font-semibold">
                  Cashout difference
                </div>
                <div className="mt-1 text-xl font-bold tabular-nums">
                  {fmtMoney(outB.realisticCashout - outA.realisticCashout)}
                </div>
                <p className="mt-1 text-xs text-muted">B minus A redeemable balance</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              The winning scenario has the higher long-run estimated value, but
              the redeemable balance and variance differ too.
              <span className="hidden md:inline">
                {" "}Check the full results cards above for the full picture.
              </span>
            </p>
          </div>
        </>
      )}

      {/* RECOMMENDATIONS */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold">Recommended Platforms</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted col-span-full">
              No recommendations available right now.
            </p>
          ) : (
            filtered.map((r) => (
              <article
                key={r.slug}
                className="rounded-xl border border-border bg-panel p-4 hover:bg-panel2 transition-colors"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-bold text-text">{r.name}</h3>
                  <span className="text-xs text-muted tabular-nums">
                    {r.rating.toFixed(1)} ★
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted line-clamp-2">
                  {r.tagline}
                </p>
                <div className="mt-2 text-xs">
                  <span className="text-accent2 font-semibold">Offer: </span>
                  <span className="text-text">{r.bonus}</span>
                </div>
                {r.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-panel2 px-2 py-0.5 text-[10px] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <a
                    href={`/go/${r.slug}`}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={() => {
                      try {
                        track("claim_bonus", {
                          slug: r.slug,
                          name: r.name,
                          source: "calculator_recommendation",
                        });
                      } catch {}
                    }}
                    className="flex-1 rounded-md bg-accent text-bg font-semibold px-3 py-1.5 text-xs text-center hover:opacity-90"
                  >
                    Claim
                  </a>
                  <Link
                    href={`/sites/${r.slug}`}
                    className="flex-1 rounded-md border border-border bg-panel2 px-3 py-1.5 text-xs text-center hover:border-accent"
                  >
                    Review
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          Frequently asked questions
        </h2>
        <div className="grid gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-border bg-panel p-4 group"
            >
              <summary className="cursor-pointer font-semibold list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-3">
                <span>{f.q}</span>
                <span className="text-muted text-sm transition-transform group-open:rotate-180">
                  ▾
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
