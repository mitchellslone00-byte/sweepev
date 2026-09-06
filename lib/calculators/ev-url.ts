import type { EVInputs, Volatility } from "./ev";

/**
 * URL encoding for calculator state, so a specific calculation can be linked and shared
 * rather than everyone landing on the same blank form.
 *
 * Kept as pure functions with no DOM or React dependency so the page, an embed, and the
 * share-card image can all read and write the exact same links.
 */

/** Short keys keep shared URLs readable when pasted into Discord or Reddit. */
const KEYS: Record<keyof Omit<EVInputs, "volatility">, string> = {
  deposit: "dp",
  bonus: "bn",
  playthroughMultiplier: "pt",
  rtp: "rtp",
  cashbackPct: "cb",
  averageBet: "ab",
  redemptionMin: "rm",
};

const VOL_KEY = "vol";
const VALID_VOL: Volatility[] = ["low", "medium", "high"];

/** Trim float noise so URLs stay short and stable. */
function num(n: number): string {
  return String(Math.round(n * 10000) / 10000);
}

function readNum(params: URLSearchParams, key: string): number | undefined {
  const raw = params.get(key);
  if (raw === null || raw.trim() === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

/** Encode one scenario. `suffix` separates the B scenario in compare mode. */
export function encodeInputs(inputs: EVInputs, suffix = ""): Record<string, string> {
  const out: Record<string, string> = {};
  (Object.keys(KEYS) as (keyof typeof KEYS)[]).forEach((field) => {
    const value = inputs[field];
    if (typeof value === "number" && Number.isFinite(value)) {
      out[KEYS[field] + suffix] = num(value);
    }
  });
  out[VOL_KEY + suffix] = inputs.volatility;
  return out;
}

/** Decode one scenario, falling back to defaults for anything absent or malformed. */
export function decodeInputs(
  params: URLSearchParams,
  fallback: EVInputs,
  suffix = ""
): EVInputs {
  const result: EVInputs = { ...fallback };
  (Object.keys(KEYS) as (keyof typeof KEYS)[]).forEach((field) => {
    const v = readNum(params, KEYS[field] + suffix);
    if (v !== undefined) {
      // Negative inputs are never meaningful here, so clamp rather than reject the link.
      (result[field] as number) = Math.max(0, v);
    }
  });
  const vol = params.get(VOL_KEY + suffix);
  if (vol && (VALID_VOL as string[]).includes(vol)) {
    result.volatility = vol as Volatility;
  }
  return result;
}

/** True when the URL carries at least one calculator value worth restoring. */
export function hasInputs(params: URLSearchParams): boolean {
  const keys = Object.values(KEYS);
  return keys.some((k) => params.has(k)) || params.has(VOL_KEY);
}

/** Full query string for a calculation, including the optional B scenario. */
export function buildQuery(
  a: EVInputs,
  b?: EVInputs,
  compare = false
): string {
  const params = new URLSearchParams(encodeInputs(a));
  if (compare && b) {
    Object.entries(encodeInputs(b, "2")).forEach(([k, v]) => params.set(k, v));
    params.set("cmp", "1");
  }
  return params.toString();
}
