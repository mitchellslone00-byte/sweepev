// Pure, deterministic EV calculation utilities.
// All UI components consume the public types and computeEV function below.

export type Volatility = "low" | "medium" | "high";
export type RiskRating = "low" | "moderate" | "high";

export interface EVInputs {
  /** Starting bankroll outside the deposit (used for survival modeling). */
  bankroll: number;
  /** Cash deposited / spent on the package. */
  deposit: number;
  /** Bonus / bundled SC value the deposit unlocks. */
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
  /** Probability the player clears playthrough without busting their bankroll. */
  bankrollSurvival: number;
  riskRating: RiskRating;
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
    bankroll,
    deposit,
    bonus,
    playthroughMultiplier,
    rtp,
    cashbackPct,
    averageBet,
    volatility,
  } = inputs;

  const totalFunds = Math.max(0, deposit + bonus);
  // Playthrough applies to the bonus / SC bundle, not to the deposit. A 50 SC
  // bundle with a 2x playthrough requires wagering 100 SC before redemption.
  const totalWagered = Math.max(0, bonus * playthroughMultiplier);
  const houseEdge = clamp(1 - rtp, 0, 1);
  const expectedLoss = totalWagered * houseEdge;
  const cb = clamp(cashbackPct, 0, 1);
  const cashbackRecovered = expectedLoss * cb;

  const finalAccountValue = totalFunds - expectedLoss + cashbackRecovered;
  // Total cash position at the end: bankroll held outside the casino plus
  // whatever's left in the account after playthrough. The deposit is netted
  // out against the bankroll since that's the cash that went into the casino.
  const totalEndCash = Math.max(0, bankroll - deposit) + Math.max(0, finalAccountValue);
  const realisticCashout = totalEndCash;
  const expectedValue = finalAccountValue - deposit;

  // Break-even RTP only has a meaningful value when there is wagering, the
  // user has a bonus to recoup, and cashback is below 100%. Anything else
  // means break-even is either unreachable or trivially satisfied; surface
  // that as NaN so the UI can render an em-dash.
  const breakEvenDenom = totalWagered * (1 - cb);
  const breakEvenRtp =
    bonus > 0 && breakEvenDenom > 0
      ? clamp(1 - bonus / breakEvenDenom, 0, 1)
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

  const startingBankroll = Math.max(0, bankroll + totalFunds);
  const survivalZ =
    stddev > 0 ? (startingBankroll - expectedLoss) / stddev : 4;
  const bankrollSurvival = clamp(normalCdf(survivalZ), 0, 1);

  // Typical ~68% range using ±1σ. ±2σ produced visually misleading "best
  // case" values for high-volatility scenarios because the long tail of a
  // normal distribution drifts very far from the mean.
  const outcomes = {
    best: expectedValue + stddev,
    average: expectedValue,
    worst: Math.max(-startingBankroll, expectedValue - stddev),
  };

  // Risk rating blends survival probability, worst-case outcome relative to
  // deposit, EV sign, and bundle quality (bonus value vs deposit). Shifts
  // meaningfully when bonus, deposit, RTP, wagering, volatility, or bet
  // size change. Use the −2σ tail (not the displayed 1σ range) so the rating
  // honestly reflects downside risk.
  const stake = Math.max(deposit, 5);
  const tailWorst = Math.max(-startingBankroll, expectedValue - 2 * stddev);
  const worstAsLoss = -tailWorst; // positive = how much you'd lose at the −2σ tail
  const negativeEv = expectedValue < 0;
  // Bundle quality: how much bonus value the deposit unlocks.
  // Treat a $0-deposit scenario (free SC, no purchase) as a great bundle.
  const bundleRatio = deposit > 0 ? bonus / deposit : Infinity;

  let riskRating: RiskRating;
  if (
    bankrollSurvival < 0.4 ||
    worstAsLoss > stake * 2 ||
    expectedValue < -stake * 0.5 ||
    bundleRatio < 0.3
  ) {
    riskRating = "high";
  } else if (
    bankrollSurvival < 0.7 ||
    worstAsLoss > stake * 0.5 ||
    negativeEv ||
    bundleRatio < 1
  ) {
    riskRating = "moderate";
  } else {
    riskRating = "low";
  }

  return {
    totalFunds,
    totalWagered,
    expectedLoss,
    cashbackRecovered,
    expectedValue,
    realisticCashout,
    breakEvenRtp,
    bankrollSurvival,
    riskRating,
    outcomes,
  };
}
