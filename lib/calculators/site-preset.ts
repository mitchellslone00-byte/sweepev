import type { Site } from "@/lib/sites";
import type { EVInputs } from "./ev";
import { buildQuery } from "./ev-url";

/**
 * Turns a review's offer into calculator inputs so a reader can check the EV of the
 * exact bundle they are looking at, rather than landing on a blank form.
 *
 * Only purchase bundles are modelled. A no-purchase signup bonus has no deposit to
 * weigh against, so there is nothing for the calculator to say about it.
 */

/** Matches the "$10 for 30 SC" bundle wording used across most of our offers. */
const OFFER = /\$([\d.]+)\s+for\s+([\d,.]+)\s*SC/i;
const MIN_SC = /([\d,.]+)\s*(?:SC|Clash Coins)/i;

function toNumber(raw: string): number {
  return Number(raw.replace(/,/g, ""));
}

export function evPresetFor(site: Site): EVInputs | null {
  const offer = site.bonus?.match(OFFER);
  if (!offer) return null;

  const deposit = toNumber(offer[1]);
  const bonus = toNumber(offer[2]);
  if (!Number.isFinite(deposit) || !Number.isFinite(bonus) || deposit <= 0 || bonus <= 0) {
    return null;
  }

  const minMatch = site.redemption?.min?.match(MIN_SC);
  const parsedMin = minMatch ? toNumber(minMatch[1]) : 0;

  return {
    deposit,
    bonus,
    // Sweepstakes offers are almost always 1x. The user can change it on the page.
    playthroughMultiplier: 1,
    rtp: 0.96,
    cashbackPct: 0,
    averageBet: 0.2,
    volatility: "medium",
    redemptionMin: Number.isFinite(parsedMin) ? parsedMin : 0,
  };
}

/** Deep link to the calculator with this site's offer prefilled, or null if not modellable. */
export function evCalcHref(site: Site): string | null {
  const preset = evPresetFor(site);
  return preset ? `/tools/ev-calculator?${buildQuery(preset)}` : null;
}
