// Pure, deterministic EV calculation utilities.
// All UI components consume the public types and computeEV function below.

export type Volatility = "low" | "medium" | "high";
export type RiskRating = "low" | "moderate" | "high";

export interface EVInputs {
  /** Price of the bundle. Money spent, which does not come back. */
  deposit: number;
  /** Sweeps Coins the bundle gives you. This is the only redeemable value. */
  bonus: number;
  /** Playthrough multiplier (e.g. 1 for 1x, 2 for 2x). Applied to the bonus / SC bundle.
   *  Example: a 50 SC bundle with a 2x playthrough means 100 SC must be wagered before redemption. */
  playthroughMultiplier: number;
  /** Slot RTP as a decimal between 0 and 1 (e.g. 0.97 for 97%). */
  rtp: number;
  /** Cashback recovered on losses, as a decimal between 0 and 1. */
  cashbackPct: number;
  /** Average bet size per spin. */
  averageBet: number;
  /** Volatility profile of the games being played. */
  volatility: Volatility;
  /** Minimum balance the site requires before a redemption is allowed. 0 = no minimum.
   *  A bonus you cannot physically cash out is not +EV no matter what the math says. */
  redemptionMin?: number;
}

export interface EVOutputs {
  totalFunds: number;
  totalWagered: number;
  expectedLoss: number;
  cashbackRecovered: number;
  /** Net result vs original deposit. Positive = profit, negative = loss. */
  expectedValue: number;
  /** Estimated balance at end of playthrough (post-loss, post-cashback). */
  realisticCashout: number;
  /** RTP at which expected value crosses zero, given current bonus and wagering. */
  breakEvenRtp: number;
  riskRating: RiskRating;
  /** True when the realistic cashout clears the site redemption minimum. */
  meetsRedemptionMin: boolean;
  /** How far short of the redemption minimum the realistic cashout lands. 0 when met. */
  redemptionShortfall: number;
  outcomes: {
    /** ~95th percentile outcome on net result. */
    best: number;
    average: number;
    /** ~5th percentile outcome on net result, floored at total bankroll loss. */
    worst: number;
  };
}

const VOLATILITY_VARIANCE: Record<Volatility, number> = {
  // Variance multiplier per dollar wagered. Very rough industry approximations.
  low: 5,
  medium: 15,
  high: 40,
};

/** Standard normal CDF via Abramowitz & Stegun 7.1.26 approximation. */
function normalCdf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  const ax = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * ax);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
  return 0.5 * (1 + sign * y);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function computeEV(inputs: EVInputs): EVOutputs {
  const {
    deposit,
    bonus,
    playthroughMultiplier,
    rtp,
    cashbackPct,
    averageBet,
    volatility,
  } = inputs;

  // Only the Sweeps Coins are redeemable. The bundle price buys Gold Coins, which carry
  // no cash value, so that money never returns as balance the way a casino deposit does.
  const totalFunds = Math.max(0, bonus);
  // Playthrough applies to the bonus / SC bundle, not to the deposit. A 50 SC
  // bundle with a 2x playthrough requires wagering 100 SC before redemption.
  const totalWagered = Math.max(0, bonus * playthroughMultiplier);
  const houseEdge = clamp(1 - rtp, 0, 1);
  const expectedLoss = totalWagered * houseEdge;
  const cb = clamp(cashbackPct, 0, 1);
  const cashbackRecovered = expectedLoss * cb;

  const finalAccountValue = totalFunds - expectedLoss + cashbackRecovered;
  const realisticCashout = Math.max(0, finalAccountValue);
  const expectedValue = realisticCashout - deposit;

  // Break-even RTP only has a meaningful value when there is wagering, the
  // user has a bonus to recoup, and cashback is below 100%. Anything else
  // means break-even is either unreachable or trivially satisfied; surface
  // that as NaN so the UI can render an em-dash.
  const breakEvenDenom = totalWagered * (1 - cb);
  const breakEvenRtp =
    bonus > deposit && breakEvenDenom > 0
      ? clamp(1 - (bonus - deposit) / breakEvenDenom, 0, 1)
      : NaN;

  // Variance over full playthrough. Floor numBets at 1 when there is any
  // wagering at all so a single oversized bet doesn't produce nonsensical
  // fractional-bet variance.
  const rawNumBets = averageBet > 0 ? totalWagered / averageBet : 0;
  const numBets = totalWagered > 0 && averageBet > 0 ? Math.max(1, rawNumBets) : 0;
  const variancePerBet =
    averageBet * averageBet * VOLATILITY_VARIANCE[volatility];
  const totalVariance = numBets * variancePerBet;
  const stddev = Math.sqrt(totalVariance);


  // Typical ~68% range using ±1σ. ±2σ produced visually misleading "best
  // case" values for high-volatility scenarios because the long tail of a
  // normal distribution drifts very far from the mean.
  const outcomes = {
    best: expectedValue + stddev,
    average: expectedValue,
    // You cannot lose more than the bundle cost. The SC came free on top of it.
    worst: Math.max(-deposit, expectedValue - stddev),
  };

  // Risk rating blends worst-case outcome relative to the bundle price, EV sign,
  // and bundle quality (SC value vs price). Shifts
  // meaningfully when bonus, deposit, RTP, wagering, volatility, or bet
  // size change. Use the −2σ tail (not the displayed 1σ range) so the rating
  // honestly reflects downside risk.
  const stake = Math.max(deposit, 5);
  const tailWorst = Math.max(-deposit, expectedValue - 2 * stddev);
  const worstAsLoss = -tailWorst; // positive = how much you'd lose at the −2σ tail
  const negativeEv = expectedValue < 0;
  // Bundle quality: how much bonus value the deposit unlocks.
  // Treat a $0-deposit scenario (free SC, no purchase) as a great bundle.
  const bundleRatio = deposit > 0 ? bonus / deposit : Infinity;

  // Swing relative to what you paid: how far a normal run can move off the average.
  const swing = stake > 0 ? stddev / stake : 0;

  let riskRating: RiskRating;
  if (negativeEv || bundleRatio < 1 || swing > 3) {
    riskRating = "high";
  } else if (worstAsLoss > stake * 0.5 || bundleRatio < 1.5 || swing > 1.5) {
    riskRating = "moderate";
  } else {
    riskRating = "low";
  }

  const redemptionMin = Math.max(0, inputs.redemptionMin ?? 0);
  const meetsRedemptionMin = redemptionMin <= 0 || realisticCashout >= redemptionMin;
  const redemptionShortfall = meetsRedemptionMin ? 0 : redemptionMin - realisticCashout;

  return {
    totalFunds,
    totalWagered,
    expectedLoss,
    cashbackRecovered,
    expectedValue,
    realisticCashout,
    breakEvenRtp,
    riskRating,
    meetsRedemptionMin,
    redemptionShortfall,
    outcomes,
  };
}

export type VerdictTone = "good" | "marginal" | "bad";

export interface Verdict {
  tone: VerdictTone;
  /** Short call, safe to use as a headline or in a share card. */
  label: string;
  /** One sentence explaining the call. */
  detail: string;
}

/**
 * Plain-language call on an offer. Kept in the engine rather than the component so a
 * share card or embed renders exactly the same verdict the page shows.
 */
export function evVerdict(inputs: EVInputs, out: EVOutputs): Verdict {
  const money = (n: number) =>
    `$${Math.abs(n).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  if (!out.meetsRedemptionMin) {
    return {
      tone: "bad",
      label: "Can not cash out",
      detail: `This lands about ${money(out.redemptionShortfall)} short of the ${money(
        inputs.redemptionMin ?? 0
      )} redemption minimum, so the balance is stuck on the site.`,
    };
  }
  if (out.expectedValue <= 0) {
    return {
      tone: "bad",
      label: "Negative EV",
      detail: `Expected result is about ${money(out.expectedValue)} down on a ${money(
        inputs.deposit
      )} spend. Skip it.`,
    };
  }
  const returnPct = inputs.deposit > 0 ? out.expectedValue / inputs.deposit : Infinity;
  if (out.riskRating === "high" || returnPct < 0.15) {
    return {
      tone: "marginal",
      label: "Marginal",
      detail: `About ${money(out.realisticCashout)} back on a ${money(
        inputs.deposit
      )} spend, a profit of only about ${money(out.expectedValue)}${
        out.riskRating === "high" ? ", and the swing on the way there is wide" : ""
      }. Only worth it if you were buying anyway.`,
    };
  }
  return {
    tone: "good",
    label: "Positive EV, worth taking",
    detail: `Expected to leave you about ${money(out.realisticCashout)} to redeem from a ${money(
      inputs.deposit
    )} spend once playthrough is cleared, a profit of about ${money(out.expectedValue)}.`,
  };
}
