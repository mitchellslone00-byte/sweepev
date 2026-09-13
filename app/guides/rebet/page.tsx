import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { guideDate } from "@/lib/guide-dates";
import { ogMeta } from "@/lib/seo";
import { AffiliateLink } from "@/components/AffiliateLink";

const TITLE = "ReBet & Dogg House Strategy Guide";
const DESCRIPTION =
  "How to play ReBet and Dogg House Casino for value. They are separate accounts on the same engine, so you can run both for two welcome offers and two daily drops. The balance rule that blocks your daily and the two ways to clear it without losing the money, plus how the $200 offer actually maths out.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/guides/rebet`,
  },
  ...ogMeta("/guides/rebet", TITLE, DESCRIPTION),
};

const faqs = [
  {
    q: "Can you play ReBet and Dogg House Casino on the same account?",
    a: "No. Dogg House runs on the same UI engine as ReBet and the two feel nearly identical to use, but they are separate brands with separate accounts and separate balances. That is the main reason to run both: two welcome offers, two daily drops, and two sets of promos for the same daily habit.",
  },
  {
    q: "Why has my daily SC not appeared?",
    a: "Almost always because you still hold a Sweeps Coins balance. Both sites gate the 1 SC daily behind a cleared balance, so the drop simply will not appear while you are sitting on SC. Clear the balance to zero and the daily starts stacking again. This catches out more new players on these two sites than anything else.",
  },
  {
    q: "What is the best way to clear your balance for the daily?",
    a: "Park it or wash it. Putting the balance on a heavily favored long-term futures market moves the stake out of your balance the moment the bet is placed, so the daily unlocks immediately and the position is still yours to cash out when it settles. The alternative is cross-washing it through, which clears the balance and the playthrough together. Either way the money stays yours rather than going back to the house.",
  },
  {
    q: "What is the minimum cashout on ReBet and Dogg House?",
    a: "20 SC on both, which is one of the lowest minimums in the space. Debit is the fastest route and lands instantly for redemptions under $500. A low minimum matters more here than on most sites because clearing your balance is also what unlocks your next daily.",
  },
  {
    q: "Is the $200 welcome offer worth buying?",
    a: "It is the strongest pricing either site offers, at 300 SC for $200, or 1.5 SC per dollar. Against a light playthrough on a high-RTP game you would expect to keep roughly 290 SC of that, so around $90 of expected profit on a $200 spend. That is an expectation across many runs rather than a promise on any single one, and you should never spend money you would mind losing.",
  },
  {
    q: "What is the best game to clear playthrough on ReBet?",
    a: "Plinko XY, which posts RTP in the high 90s across its risk levels and is the standout choice on the site. Drop to the 8-row low-volatility setup if you are clearing a larger balance and want the variance down. Otherwise stick to casino originals with a posted RTP of 96% or better.",
  },
  {
    q: "Can you actually bet sports with Sweeps Coins?",
    a: "Yes, and it is the thing that makes ReBet different from a standard sweeps casino. You can put Sweeps Coins on real markets and redeem what you win, which means sports knowledge converts into redeemable value in a way it does not anywhere else in this space. Dogg House shares the same engine and the same promo layer.",
  },
  {
    q: "Is Dogg House Casino just a reskin of ReBet?",
    a: "It is built on the same UI engine, so the layout, the daily mechanic, the 20 SC minimum and the promo structure all carry over. The catalog is smaller because the brand is newer. Treat it as a genuine second account rather than a copy, because the balances and bonuses are entirely separate.",
  },
  {
    q: "How much free SC can you collect across both sites?",
    a: "1 SC a day on each, so 2 SC a day across the pair, which is around 60 SC a month for two logins. That compares well with the daily value on most of our top-ranked sites, and it costs nothing beyond remembering to clear your balance so the drops keep landing.",
  },
];

const LINK_CLS =
  "font-semibold text-accent underline underline-offset-2 hover:opacity-80";

const TOC: [string, string][] = [
  ["run-both", "Run both accounts"],
  ["balance-rule", "The balance rule"],
  ["clearing", "Clearing your balance"],
  ["welcome", "The welcome offer"],
  ["promos", "Passes and free picks"],
  ["sports", "Betting with Sweeps Coins"],
  ["playthrough", "Clearing playthrough"],
  ["cashing-out", "Cashing out"],
  ["dogghouse", "Dogg House differences"],
  ["routine", "Your first week"],
  ["faq", "FAQ"],
];

export default function ReBetGuidePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Link href="/sites/rebet" className="text-sm text-muted hover:text-text">
        ← Back to the ReBet review
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">{TITLE}</h1>
        <p className="mt-2 text-xs text-muted">
          Last updated: {guideDate("/guides/rebet").modifiedDisplay}
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          ReBet is our favorite sports-and-sweeps hybrid, and Dogg House Casino is the newer brand
          running on the same UI engine, which is why the two feel almost identical from the first
          screen. Both sit at the top of our rankings on a 4.9. They are separate sites with separate
          accounts and separate balances, so running both is the obvious play.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          There is one rule on these two that catches out more new players than anything else, and it
          is the reason a lot of people quietly stop collecting their daily without ever working out
          why. That is where this guide starts.
        </p>
      </header>

      {/* Contents */}
      <nav
        aria-label="On this page"
        className="mt-6 rounded-2xl border border-border bg-panel/60 p-4 sm:p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">On this page</p>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          {TOC.map(([id, label], i) => (
            <li key={id} className="flex gap-2">
              <span className="tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
              <a href={`#${id}`} className="text-muted transition-colors hover:text-accent">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Run both */}
      <section id="run-both" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Run both, because nothing is shared
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Dogg House is built on the ReBet engine, which means the navigation, the bet slip, the daily
          mechanic and the redemption flow all behave the same way. What it does not mean is a shared
          account. The balances are separate, the welcome offers are separate, and the daily drops are
          separate.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          So the arithmetic is simple. One account pays{" "}
          <strong className="text-text">1 SC a day</strong>. Two accounts pay{" "}
          <strong className="text-text">2 SC a day</strong>, which is about{" "}
          <strong className="text-text">60 SC a month</strong> for two logins on an interface you only
          have to learn once. There is no reason to run one and not the other.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          If you are only going to keep one in the rotation, make it ReBet. The catalog is deeper and
          the brand is more established. But the second account costs you nothing but a minute a day.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <AffiliateLink
            slug="rebet"
            name="ReBet"
            source="rebet_guide"
            className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
          >
            Sign up for ReBet →
          </AffiliateLink>
          <AffiliateLink
            slug="dogghouse"
            name="Dogg House Casino"
            source="rebet_guide"
            className="inline-block rounded-lg border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/10"
          >
            Sign up for Dogg House →
          </AffiliateLink>
        </div>
      </section>

      {/* Balance rule */}
      <section id="balance-rule" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The balance rule, and why your daily stopped appearing
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Most sweeps casinos hand you a daily bonus no matter what your balance looks like. ReBet and
          Dogg House do not. On both sites the daily drop is gated behind a{" "}
          <strong className="text-text">cleared Sweeps Coins balance</strong>. While you are still
          holding SC, the daily will not appear at all.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          There is no error message and no countdown explaining it. The bonus is simply not there, which
          is why so many players assume the promotion ended or that their account has a problem. It has
          not. The balance is just not clear.
        </p>
        <div className="mt-4 rounded-xl border border-accent2/40 bg-accent2/[0.06] p-4">
          <p className="text-sm font-semibold text-text">The practical version</p>
          <p className="mt-1.5 text-sm text-muted leading-relaxed">
            Get your balance to <strong className="text-text">zero</strong> and the daily starts
            stacking again. Zero always satisfies the rule, so it is the habit worth building rather
            than trying to leave a small amount sitting there.
          </p>
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          Once you understand it, the rule stops being an annoyance and starts being a design you can
          work with. It pushes you into a clean loop: collect, play or bank, clear, repeat. The players
          who do best on these two sites are the ones who never let a balance sit idle, which is a good
          habit everywhere and a required one here.
        </p>
      </section>

      {/* Clearing */}
      <section id="clearing" className="scroll-mt-24 mt-4 rounded-2xl border border-border bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Clearing your balance without giving it away
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          The rule creates an obvious problem. You need an empty balance to keep the daily coming, but
          you do not want to empty it by handing the money back to the house. There are two ways to do
          it that keep the value yours.
        </p>

        <h3 className="mt-5 text-lg font-bold text-text">Park it in a long futures bet</h3>
        <p className="mt-2 text-muted leading-relaxed">
          Put the balance on a heavily favored long-term futures market. The stake leaves your balance
          the moment the bet is placed, so the daily unlocks straight away, and the position is still
          yours. When the future settles you cash it out.
        </p>
        <p className="mt-2 text-muted leading-relaxed">
          That is the key thing to understand about this move: you are not spending the money, you are
          moving it somewhere the daily counter cannot see it. Your balance reads zero, the drops keep
          landing, and the stake is still working. Pick something long-dated and heavily favored and one
          bet can hold the slot open for weeks while the dailies stack behind it.
        </p>
        <p className="mt-2 text-muted leading-relaxed">
          Worth being straight about the trade-off, though. A heavy favorite is not a sure thing, and a
          market priced that short is one the book has already thought hard about. You are accepting a
          real chance of losing the stake in exchange for keeping the daily open, so size it as money
          you are willing to have in play rather than money you were counting on.
        </p>

        <h3 className="mt-5 text-lg font-bold text-text">Cross-wash it</h3>
        <p className="mt-2 text-muted leading-relaxed">
          The other option is to wash the balance through rather than park it. Cross-washing means
          wagering on one game type to clear the playthrough attached to another, and where a site
          supports it, it is consistently the most efficient way to move a balance without bleeding
          value on the way. It clears the balance, satisfies the playthrough, and leaves you free to
          redeem what comes out the other side.
        </p>
        <p className="mt-2 text-muted leading-relaxed">
          The full method, along with the high-RTP games and the low-variance settings worth using while
          you do it, is in the{" "}
          <Link href="/guides#washing" className={LINK_CLS}>
            washing and cross-washing guide
          </Link>
          .
        </p>

        <p className="mt-5 text-muted leading-relaxed">
          Either route gets you back to a zero balance with the money still yours. Park it if you want
          to stay in play and do not mind the wait, wash it if you would rather clear the playthrough
          and get to a redemption.
        </p>
      </section>

      {/* Welcome */}
      <section id="welcome" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The welcome offer, and what it is actually worth
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Both sites lead with the same headline offer:{" "}
          <strong className="text-text">$200 for 300 SC</strong>. Strip the marketing off and that is{" "}
          <strong className="text-text">1.5 Sweeps Coins per dollar</strong>, which is the best pricing
          either site will show you and the only number worth comparing later offers against.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Here is how it plays out. Sweeps Coins carry a light playthrough, so you have to wager the 300
          SC before it becomes redeemable. On a high-RTP game you would expect to give back only a few
          percent of it in the process, leaving roughly <strong className="text-text">290 SC</strong> to
          redeem against a <strong className="text-text">$200</strong> outlay.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 font-semibold text-text">Step</th>
                <th className="py-2 font-semibold text-text">Value</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">You spend</td>
                <td className="py-2 tabular-nums">$200</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">You receive</td>
                <td className="py-2 tabular-nums">300 SC (1.5 SC per dollar)</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="py-2 pr-4">Expected after clearing playthrough</td>
                <td className="py-2 tabular-nums">around 290 SC</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-semibold text-text">Expected profit</td>
                <td className="py-2 tabular-nums font-semibold text-text">around $90</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          That is a genuinely strong opening, and it is part of why both sites sit where they do in our
          rankings. Two things to keep straight, though. That figure is an{" "}
          <strong className="text-text">expectation across many runs</strong>, not a promise on any one
          of them, and a single session can land well either side of it. And the good pricing is on the
          welcome offer specifically, so measure every later reload against 1.5 SC per dollar before you
          decide it is a deal.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          You can run the numbers on any offer either site puts in front of you with our{" "}
          <Link href="/tools/ev-calculator" className={LINK_CLS}>
            EV calculator
          </Link>
          . And as always, never spend money here you would mind losing.
        </p>
      </section>

      {/* Promos */}
      <section id="promos" className="scroll-mt-24 mt-4 rounded-2xl border border-border bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">The monthly pass and the free picks</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The promo layer is where these two pull ahead of most sports-first social books, and it runs
          on both accounts. Two pieces matter.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Free pick promos.</strong> Recurring drops that put Sweeps
            Coins behind a selection without you staking anything. This is free expected value in about
            the purest form the site offers, and because it arrives as a pick rather than a coin balance
            it is easy to scroll past. Treat them as part of the daily routine, not as an extra.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The monthly pass.</strong> A recurring benefit that stacks on
            top of the daily. Judge it the way you would judge any subscription: add up what it returns
            over a full month against what it costs, and only keep it if the monthly return clears the
            price with room to spare. If you are not logging in most days, it will not.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          Both of these reward consistency rather than spend, which is unusual and worth taking
          advantage of. The value is in showing up, and it compounds across two accounts.
        </p>
      </section>

      {/* Sports */}
      <section id="sports" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Betting sports with Sweeps Coins</h2>
        <p className="mt-3 text-muted leading-relaxed">
          This is the part that makes ReBet genuinely different, and it is the reason it earns a guide
          of its own rather than a paragraph on the general strategy page. On a normal sweeps casino
          your only lever is picking a high-RTP game and accepting the house edge. Here you can put
          Sweeps Coins on real sports markets and redeem what comes back.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          The practical consequence is that{" "}
          <strong className="text-text">sports knowledge converts into redeemable value</strong>. A slot
          does not care what you know. A market does. If you follow a league closely enough to have an
          opinion the price does not reflect, that opinion is worth something here in a way it is worth
          nothing on a reel.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          The flip side deserves saying plainly. A sportsbook is not a free-money machine, the pricing
          carries a margin the same way a slot carries a house edge, and feeling confident is not the
          same as being right. Parlays in particular look generous and compound that margin on every
          leg. If you do not follow sports, there is no shame in treating both sites as casinos and
          clearing your balance on Plinko instead.
        </p>
      </section>

      {/* Playthrough */}
      <section id="playthrough" className="scroll-mt-24 mt-4 rounded-2xl border border-border bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Clearing playthrough</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The aim when washing a balance is boring on purpose: the highest RTP you can find, at the
          lowest variance you can tolerate, so the number that reaches the cashier is as close as
          possible to the number you started with.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Plinko XY.</strong> Posts RTP in the high 90s across its risk
            levels and is the standout choice on the site. This is the default unless you have a reason
            to pick something else.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Low-risk Plinko.</strong> The 8-row, low-volatility setup.
            Slower, but it keeps the swings down, which is what you want when the balance you are
            clearing is large enough to care about.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Casino originals.</strong> Fine as alternatives, but check the
            posted RTP first and hold the line at 96% or better. Anything below that is costing you
            money for variety.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          Keep the stake small relative to the balance. Clearing playthrough is not where you are trying
          to win, it is where you are trying not to lose. New to the idea? The{" "}
          <Link href="/guides" className={LINK_CLS}>
            general strategy guide
          </Link>{" "}
          covers the fundamentals that apply on every site.
        </p>
      </section>

      {/* Cashing out */}
      <section id="cashing-out" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Cashing out</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Redemptions are a real strength on both sites, and they beat most of our top ten.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">20 SC minimum.</strong> One of the lowest anywhere, and it
            means you are never stuck watching a balance you cannot touch.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Instant to debit under $500.</strong> Not one to three days.
            Instant, on the payout method most people actually use.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          Verify your account on the day you sign up rather than the day you first try to withdraw. KYC
          is the single most common reason a redemption sits in limbo anywhere in this space, and doing
          it up front on both accounts costs five minutes once and saves a support ticket later.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Then use the low minimum. On sites where cashing out means a 100 SC floor and a five-day wait,
          you have little choice but to let a balance build before you see anything. Here you can take
          value off the site early and often, which is worth doing on any site and easy to forget on the
          ones that make it this painless.
        </p>
      </section>

      {/* Dogg House */}
      <section id="dogghouse" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">What is different about Dogg House</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Almost everything in this guide applies to Dogg House Casino unchanged. It runs on the same UI
          engine, so the daily mechanic, the balance rule, the 20 SC minimum, the instant debit
          redemptions and the promo layer all carry across.
        </p>
        <p className="mt-3 text-muted font-semibold">The differences that actually matter:</p>
        <ul className="mt-2 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">A smaller catalog.</strong> Dogg House is the newer brand and
            the game selection has not caught up with ReBet yet. If you are hunting for a specific
            title, check ReBet first.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">A shorter track record.</strong> ReBet has been around longer
            and has the more established community around it. Nothing against Dogg House, but a newer
            brand is a newer brand and it is worth saying rather than glossing over.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">A separate everything.</strong> Worth repeating because the
            interfaces look so alike: separate balance, separate welcome offer, separate daily, separate
            redemption threshold. Clearing your balance on one does nothing for the other.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          Treat ReBet as the main account and Dogg House as a strong second stream. Read the full{" "}
          <Link href="/sites/rebet" className={LINK_CLS}>
            ReBet review
          </Link>{" "}
          and{" "}
          <Link href="/sites/dogghouse" className={LINK_CLS}>
            Dogg House review
          </Link>{" "}
          for the complete scoring on each.
        </p>
      </section>

      {/* Routine */}
      <section id="routine" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Your first week, step by step</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Everything above, in the order you should actually do it.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-muted leading-relaxed">
          <li>
            Sign up on <strong className="text-text">both sites</strong> through our links. Two
            accounts, two welcome offers, two daily drops.
          </li>
          <li>
            Complete <strong className="text-text">KYC on day one</strong>, on both. You need it before
            your first redemption, and doing it now means the instant debit payout is actually instant
            when you get there.
          </li>
          <li>
            Claim the <strong className="text-text">daily on both, every day</strong>, and check your
            balance is clear first. If the daily is not showing, that is why.
          </li>
          <li>
            Collect the <strong className="text-text">free picks</strong> as they land. They cost
            nothing and they are easy to scroll past.
          </li>
          <li>
            Only buy if the maths works. The welcome offer at{" "}
            <strong className="text-text">1.5 SC per dollar</strong> is the best pricing you will see,
            so if you are going to spend at all, spend there rather than on a later reload.
          </li>
          <li>
            Clear playthrough on <strong className="text-text">Plinko XY</strong> at a small stake.
          </li>
          <li>
            Keep the daily alive by <strong className="text-text">parking or washing your balance</strong>{" "}
            rather than letting it sit, and redeem once you are past the{" "}
            <strong className="text-text">20 SC</strong> minimum.
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 mt-8">
        <h2 className="text-2xl font-bold">ReBet &amp; Dogg House FAQ</h2>
        <div className="mt-4 divide-y divide-border border-b border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-4 first:pt-0">
              <p className="font-semibold text-text">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Availability */}
      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted leading-relaxed">
        <p>
          Availability varies by state and both sites update their eligible regions from time to time.
          Check our{" "}
          <Link href="/where-legal" className={LINK_CLS}>
            state legality map
          </Link>{" "}
          for what accepts players where you live before you sign up.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-8 text-center">
        <AffiliateLink
          slug="rebet"
          name="ReBet"
          source="rebet_guide_bottom"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90"
        >
          Claim your ReBet bonus
        </AffiliateLink>
      </section>
    </article>
  );
}
