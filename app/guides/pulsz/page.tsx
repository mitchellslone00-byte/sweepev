import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { guideDate } from "@/lib/guide-dates";
import { ogMeta } from "@/lib/seo";
import { AffiliateLink } from "@/components/AffiliateLink";
import { PublicImg } from "@/components/PublicImg";

const TITLE = "Pulsz & Pulsz Bingo Strategy Guide";
const DESCRIPTION =
  "How to play Pulsz and Pulsz Bingo for value. They are separate accounts, so you can run both for two signup bonuses and two daily streaks. Which package is actually worth buying, how to clear the 1x playthrough, and the 10 SC cashout most players miss.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.url}/guides/pulsz`,
  },
  ...ogMeta("/guides/pulsz", TITLE, DESCRIPTION),
};


const faqs = [
  {
    q: "Can you play Pulsz and Pulsz Bingo on the same account?",
    a: "No. They run on the same platform under the same operator, but they are separate sites with separate accounts and separate balances. That is why running both is worth doing: you get two signup bonuses, two daily streaks, and two sets of promotions for the same daily habit.",
  },
  {
    q: "How much is the Pulsz daily bonus worth?",
    a: "It ramps across a seven-day block. The first week closes at about 1 SC, day 21 closes at 1.75 SC, and from day 28 onward the closing day reaches 2 SC. A mature streak is worth roughly 5.5 SC a week. Missing a single day resets you to the bottom of the ladder. Pulsz Bingo runs a much smaller daily at around 0.2 SC a day.",
  },
  {
    q: "Does climbing Pulsz VIP improve your daily bonus?",
    a: "No. The Daily Login Streak appears on every tier from Hero through to Icon, so the daily pays the same whatever your status. What changes as you climb is exclusive deals, extra rewards and promotions, and at the top two tiers the weekly wheel spin.",
  },
  {
    q: "What is the minimum cashout at Pulsz?",
    a: "Prizeout gift cards redeem from just 10 SC, while cash through Skrill or bank transfer needs 100 SC. Gift cards typically arrive in 1 to 3 days, Skrill in 24 to 48 hours, and bank transfers in 3 to 5 working days. Most players wait for the 100 SC cash minimum without realising they could have taken value off the site ten times sooner.",
  },
  {
    q: "Which Pulsz package is the best value?",
    a: "The $9.99 and $19.99 tiers both return 2 SC per dollar, which is the best rate on the site. The $49.99 is 1.5 SC per dollar, so it is less efficient, but it still delivers the largest absolute profit of the three at roughly $22 after a 1x playthrough. All three are comfortably profitable; the smaller tiers simply stretch a budget further.",
  },
  {
    q: "Are the Pulsz sales worth buying?",
    a: "Usually not in the way the banner suggests. A typical 10% sale works out at about 1.11 SC per dollar, roughly half what your welcome offer paid, because the discount applies to everyday pricing that already sits below welcome pricing. Treat the frequent 10% offers as ordinary pricing and wait for the occasional much larger sales.",
  },
  {
    q: "Can you reach Icon or Legend without spending money?",
    a: "Not realistically. Pulsz Points are earned both by levelling up in Gold Coin gameplay and by buying Gold Coin packages, so the ladder is not strictly pay-to-enter. But the Gold Coin route earns slowly enough that it takes an enormous amount of play to move a tier, and purchases award far more. The top tiers arrive if you are already buying regularly.",
  },
  {
    q: "Does the Pulsz app support Sweeps Coins?",
    a: "Yes. Pulsz has real native apps on both iOS and Android rather than a wrapped mobile page, and they are not cut down. You can claim the daily bonus, buy coins, play the full library with either currency, and request redemptions from the app. The mobile browser gives you the same account and features if you would rather not install anything.",
  },
  {
    q: "How do you clear the Pulsz playthrough?",
    a: "Sweeps Coins carry a light 1x playthrough. Classic Multi-Hand Blackjack has the lowest house edge on the site, and Balloons Mania and Joker's Million at 94.53% are the best high-RTP low-variance slots. Pulsz has no live dealer games, so there is no cross-washing available. Bet the minimum to keep variance low.",
  },
  {
    q: "What states are Pulsz and Pulsz Bingo available in?",
    a: "Both are 21+ and share the same restrictions. Neither is available in Alabama, Arizona, California, Connecticut, Idaho, Indiana, Louisiana, Maine, Maryland, Michigan, Mississippi, Montana, Nevada, New Jersey, New York, Tennessee, Washington, or West Virginia.",
  },
];

const LINK_CLS =
  "font-semibold text-accent underline underline-offset-2 hover:opacity-80";

export default function PulszGuidePage() {
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
      <Link href="/sites/pulsz" className="text-sm text-muted hover:text-text">
        ← Back to the Pulsz review
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">{TITLE}</h1>
        <p className="mt-2 text-xs text-muted">
          Last updated: {guideDate("/guides/pulsz").modifiedDisplay}
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Pulsz sits at the top of our rankings, and Pulsz Bingo is its sister site running on the
          same Yellow Social Interactive platform with a near-identical slot library. The important
          thing most players miss is that they are two separate sites with two separate accounts and
          two separate balances. That is not a technicality. It is the single best reason to bother
          with both.
        </p>
      </header>

      {/* Contents */}
      <nav
        aria-label="On this page"
        className="mt-6 rounded-2xl border border-border bg-panel/60 p-4 sm:p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">On this page</p>
        <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">01</span>
            <a href="#run-both" className="text-muted transition-colors hover:text-accent">
              Run both accounts
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">02</span>
            <a href="#packages" className="text-muted transition-colors hover:text-accent">
              Which package to buy
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">03</span>
            <a href="#sales" className="text-muted transition-colors hover:text-accent">
              Reading a sale
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">04</span>
            <a href="#daily-streak" className="text-muted transition-colors hover:text-accent">
              The daily streak
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">05</span>
            <a href="#playthrough" className="text-muted transition-colors hover:text-accent">
              Clearing playthrough
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">06</span>
            <a href="#cashing-out" className="text-muted transition-colors hover:text-accent">
              Cashing out
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">07</span>
            <a href="#vip" className="text-muted transition-colors hover:text-accent">
              Pulsz Points & VIP
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">08</span>
            <a href="#weekly" className="text-muted transition-colors hover:text-accent">
              The weekly rhythm
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">09</span>
            <a href="#app" className="text-muted transition-colors hover:text-accent">
              The app
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">10</span>
            <a href="#bingo" className="text-muted transition-colors hover:text-accent">
              Pulsz Bingo
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">11</span>
            <a href="#routine" className="text-muted transition-colors hover:text-accent">
              Your first week
            </a>
          </li>
          <li className="flex gap-2">
            <span className="tabular-nums text-muted">12</span>
            <a href="#faq" className="text-muted transition-colors hover:text-accent">
              FAQ
            </a>
          </li>
        </ol>
      </nav>

      {/* Run both */}
      <section id="run-both" className="scroll-mt-24 mt-6 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Run both. They do not share a balance</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Because Pulsz and Pulsz Bingo are separate accounts rather than two doors into one wallet,
          everything the operator gives out, it gives out twice. Two signup bonuses, two daily login
          streaks, two sets of promotions and giveaways, all for the same few minutes a day.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Be clear-eyed about the size of it though. Pulsz is the stronger account by a distance: a mature
          streak there is worth roughly <strong className="text-text">5.5 SC a week</strong>, while the
          Pulsz Bingo daily is a much smaller drop at around{" "}
          <strong className="text-text">0.2 SC a day</strong>. So the second account is a worthwhile
          top-up rather than a doubling, and it comes with its own 2 SC signup bonus and its own promo
          feed on the way in.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Sign up for both, verify both, and claim on both every day. If you are only going to keep one
          in the rotation, make it Pulsz, since the slot library is larger and the promo calendar runs
          harder. But there is no reason to leave the second account on the table.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <AffiliateLink
            slug="pulsz"
            name="Pulsz"
            source="pulsz_guide"
            className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-bg hover:opacity-90"
          >
            Sign up for Pulsz →
          </AffiliateLink>
          <AffiliateLink
            slug="pulsz-bingo"
            name="Pulsz Bingo"
            source="pulsz_guide"
            className="inline-block rounded-lg border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent hover:bg-accent/10"
          >
            Sign up for Pulsz Bingo →
          </AffiliateLink>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          The signup bonus, and which package is actually worth buying
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          You start with <strong className="text-text">5,000 GC + 2 SC free</strong> on each account,
          no purchase needed. It drops as soon as you verify your email, so that is 4 SC across the two
          sites before you have spent anything. Sign up through our link and there are{" "}
          <strong className="text-text">free spins</strong> waiting too, though those unlock once you
          make a purchase rather than at signup.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          The first-purchase offers are where people overspend, because the biggest package looks like
          the best deal and is not. Here is what each one actually returns per dollar:
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">$9.99</strong> for 200,000 GC + 20 SC, plus 20 free spins and
            a Golden Key. That is <strong className="text-text">2 SC per dollar</strong>.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">$19.99</strong> for 400,000 GC + 40 SC. Also{" "}
            <strong className="text-text">2 SC per dollar</strong>.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">$49.99</strong> for 1,000,000 GC + 75 SC, which is{" "}
            <strong className="text-text">1.5 SC per dollar</strong>.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          To be clear, all three are comfortably profitable. Clear the 1x playthrough on a 96% RTP game
          and the $9.99 turns 20 SC into about $19 redeemable, roughly a{" "}
          <strong className="text-text">$9 profit</strong>. The $19.99 returns about{" "}
          <strong className="text-text">$18</strong>. And the $49.99, despite the weaker rate, still turns
          75 SC into around $72, which is the{" "}
          <strong className="text-text">largest absolute profit of the three at about $22</strong>.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          So the per-dollar figure is about efficiency, not about whether an offer is worth taking. If
          your budget is the constraint, the $9.99 and $19.99 tiers stretch it furthest. If you want the
          most Sweeps Coins in one go, the $49.99 is still a strong buy that simply costs a little more
          per coin. Every purchase also carries{" "}
          <strong className="text-text">free spins</strong> and a Golden Key that unlocks exclusive Gold
          Coin slots and scratchers for a week, whichever tier you take. Run any offer through our{" "}
          <Link href="/tools/ev-calculator?dp=10&bn=20&pt=1&rtp=0.96&rm=100&vol=medium" className={LINK_CLS}>
            EV calculator
          </Link>{" "}
          before you spend, rather than trusting the headline coin count.
        </p>
      </section>

      {/* Sales */}
      <section id="sales" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          After the welcome offer: why the sales look better than they are
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Once you have used the first-purchase tiers, that pricing is gone for good. What follows is a
          steady drip of <strong className="text-text">10% sales</strong>, and they are worth doing the
          maths on before the badge does your thinking for you.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Here is a real one. It is marked 10% off, headlines 173,500 Gold Coins, and can be bought up to
          ten times in a day:
        </p>
        <div className="mt-4 flex justify-center">
          <PublicImg
            src="/images/pulsz-10-percent-sale.png"
            alt="Pulsz 10% off Gold Coin package with 30 free Sweeps Coins"
            className="rounded-2xl max-w-xs border border-border shadow-lg"
          />
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          Strip out the Gold Coins, which have no cash value, and it is{" "}
          <strong className="text-text">$26.99 for 30 SC</strong>. That works out at{" "}
          <strong className="text-text">1.11 SC per dollar</strong>. Your welcome offer paid{" "}
          <strong className="text-text">2 SC per dollar</strong>. So a typical 10% sale is not a better
          deal than the welcome offer, it is roughly half as good, and the discount is applied to
          everyday pricing that already sits well below what you were first offered.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          That is the single most useful thing to understand about spending on this site. The welcome
          tiers are the best value you will ever get, so use them properly, and treat the routine 10%
          offers as ordinary pricing rather than an event. The occasional much larger sales are the ones
          worth waiting for, because those are where the SC per dollar genuinely moves.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          In fairness, a purchase does carry extras beyond the coins: Pulsz Points toward your tier,
          exclusive slots and scratchcards, and ads removed from the account. Those have some value. They
          are just not Sweeps Coins, and the SC per dollar is what decides whether an offer is worth
          taking. Run any of them through our{" "}
          <Link href="/tools/ev-calculator?dp=26.99&bn=30&pt=1&rtp=0.96&rm=100&vol=medium" className={LINK_CLS}>
            EV calculator
          </Link>{" "}
          rather than trusting the headline coin count or the percentage on the banner.
        </p>
      </section>

      {/* Daily streak */}
      <section id="daily-streak" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">The daily streak, twice over</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The daily login bonus scales across the week rather than paying flat. It opens at{" "}
          <strong className="text-text">1,000 GC + 0.3 SC</strong> and climbs to{" "}
          <strong className="text-text">3,000 GC + 1 SC</strong> by the end of a streak. The back half
          of the week is where the value sits, which means breaking the streak costs you more than the
          single day you missed.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          It does not stop there either. The block-end payout keeps climbing the longer you hold the
          streak: about <strong className="text-text">1 SC</strong> at the end of your first week,{" "}
          <strong className="text-text">1.75 SC</strong> by day 21, and{" "}
          <strong className="text-text">2 SC</strong> from day 28 onward. That is double what the first
          week pays, and it only arrives if you never miss. A mature streak is worth roughly{" "}
          <strong className="text-text">5.5 SC a week</strong>, and running the same habit on both
          accounts stacks two of those. That is the real argument for treating this as a daily habit
          rather than something you claim when you remember: the ladder only reaches its best rung if you
          never fall off it, and a single missed day drops you back to the bottom.
        </p>
        <div className="mt-4 flex justify-center">
          <PublicImg
            src="/images/pulsz-daily-streak.png"
            alt="Pulsz daily login streak calendar showing days 17 to 21"
            className="rounded-2xl max-w-xs border border-border shadow-lg"
          />
        </div>
        <p className="mt-3 text-muted leading-relaxed">
          The ladder runs in blocks of seven and you have to complete all seven to reveal the next
          block. Days 17 to 20 above sit at 0.6 to 0.7 SC each, then day 21 closes the block with 1.75 SC
          and a few hundred Pulsz Points. Hold it another week and that closing day reaches 2 SC. The
          back end of every block carries most of the value, which is exactly why missing a single day
          costs far more than the day you missed.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Run it on both accounts and you are claiming two streaks off one habit. Set a reminder, claim
          both, and let the tail end of each week do the work.
        </p>
      </section>

      {/* Playthrough */}
      <section id="playthrough" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Clearing the 1x playthrough</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Sweeps Coins carry a <strong className="text-text">1x playthrough</strong>, which is as light
          as it gets. You only need to wager the balance once before it is redeemable, so the goal is
          simply to give back as little as possible on the way through.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Classic Multi-Hand Blackjack</strong> has the lowest house edge
            on the site and is the most efficient way to clear playthrough.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Balloons Mania</strong> and{" "}
            <strong className="text-text">Joker&apos;s Million</strong> (94.53% RTP) are the best
            high-RTP, low-variance slot picks.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          One limitation worth knowing: Pulsz has no live dealer games, so there is{" "}
          <strong className="text-text">no cross-washing</strong> available. Table games and high-RTP
          slots are your only tools. Bet the minimum to keep variance low, since a bad run on an
          oversized bet can eat the balance before you finish the single pass.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          New to this? The{" "}
          <Link href="/guides" className={LINK_CLS}>
            general strategy guide
          </Link>{" "}
          covers washing fundamentals that apply on every site.
        </p>
      </section>

      {/* Cashing out */}
      <section id="cashing-out" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Cash out at 10 SC, not 100
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Most players wait until they hit 100 SC because that is the cash minimum. But Pulsz redeems{" "}
          <strong className="text-text">Prizeout gift cards from just 10 SC</strong>, which is one of the
          lowest floors anywhere in the space. If your goal is to get value off the site rather than
          specifically to get bank cash, you can start redeeming ten times sooner.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            Gift cards from <strong className="text-text">10 SC</strong>, arriving in about 1 to 3 days.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            Cash from <strong className="text-text">100 SC</strong> via Skrill in 24 to 48 hours, or bank
            transfer in 3 to 5 working days.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          The daily cap is $10,000, or $5,000 in Florida, and prizes over $2,500 take longer to process.
          Get <strong className="text-text">KYC verification done on day one</strong>, before you have a
          balance waiting on it. Pulsz support runs on email with no live chat, so a redemption held for
          verification is slow to unstick. Verifying early is the single best way to never need support
          at all.
        </p>
        <h3 className="mt-6 text-lg font-bold text-text">What a redemption actually looks like</h3>
        <p className="mt-2 text-muted leading-relaxed">
          This is a processed redemption from our own account, alongside the timetable Pulsz publishes in
          the app.
        </p>
        <div className="mt-3 flex justify-center">
          <PublicImg
            src="/images/pulsz-redemption.jpeg"
            alt="A processed Pulsz redemption of 274.31 SC via Trustly, with the redemptions timetable"
            className="rounded-2xl max-w-xs border border-border shadow-lg"
          />
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          The detail worth taking from that table is the first column. Every method carries{" "}
          <strong className="text-text">24 hours of internal processing</strong> before it is even handed
          to the payment rail, and the method time is added on top of it. So nothing here is instant, and
          the real end-to-end times are:
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Gift card.</strong> 24 hours internally, then issued
            immediately. Fastest route off the site by a distance, and it starts at 10 SC.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Skrill wallet.</strong> 24 hours internally, then 3 to 4 hours.
            Roughly a day and a bit, and the quickest way to actual cash.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Standard ACH or Trustly.</strong> 24 hours internally, then 3 to
            5 business days. Fine if you are not in a hurry.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          If you are watching the clock, take the gift card. If you want the money in a bank, Skrill is
          the fast lane and the bank rails are the slow one.
        </p>
      </section>

      {/* VIP */}
      <section id="vip" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Pulsz Points: what the tiers actually give you
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          The loyalty scheme is called Pulsz Points and it runs six tiers:{" "}
          <strong className="text-text">Hero, Star, Superstar, Diamond, Legend and Icon</strong>. You
          qualify automatically and it costs nothing to be in.
        </p>
        <div className="mt-4 flex justify-center">
          <PublicImg
            src="/images/pulsz-vip-tiers.png"
            alt="Pulsz Points tier benefits from Hero through to Icon"
            className="rounded-2xl max-w-lg border border-border shadow-lg"
          />
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          Read that table carefully, because the headline number is easy to misread. The multiplier that
          climbs from x1 at Hero to x2.25 at Icon is a{" "}
          <strong className="text-text">Gold Coin multiplier</strong>. It gets you more Gold Coins, and
          Gold Coins have no cash value. It does not improve the Sweeps Coins you get for a dollar, which
          is the only number that decides whether a purchase is worth making. Climbing tiers does not
          make your purchases better value in the way the 2.25x suggests.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Notice too that <strong className="text-text">Daily Login Streak sits on every tier</strong>,
          from Hero to Icon. The daily pays the same whatever your status, so there is no point climbing
          for that either. What genuinely changes as you rise is exclusive deals, extra rewards and
          promotions, and then the real prize:{" "}
          <strong className="text-text">the weekly wheel spin, which unlocks at Legend and Icon</strong>,
          the top two tiers. Icon adds tournament invites on top.
        </p>

        <h3 className="mt-6 text-lg font-bold text-text">How you actually earn points</h3>
        <div className="mt-3 flex justify-center">
          <PublicImg
            src="/images/pulsz-points-how-to-earn.png"
            alt="Pulsz Points are earned by levelling up in Gold Coin gameplay and by buying Gold Coin packages"
            className="rounded-2xl max-w-lg border border-border shadow-lg"
          />
        </div>
        <p className="mt-4 text-muted leading-relaxed">
          Two routes: <strong className="text-text">levelling up through Gold Coin gameplay</strong>, and
          buying Gold Coin packages. Both count, but not remotely equally. Gold Coin play does earn points,
          so the ladder is not strictly pay-to-enter, but the rate is slow enough that it takes an enormous
          amount of play to move a tier. Purchases award far more, and in practice they are what carries
          anyone to the top. The daily streak chips in a little too, a few hundred points on the final day
          of each seven-day block.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          So be realistic about it. Do not buy packages in order to climb, because the boost you are
          climbing toward is in a currency you cannot redeem, and grinding Gold Coins purely for status is
          a poor use of your time given how slowly it moves. Legend or Icon, and the Wednesday wheel that
          comes with them, is something that arrives if you are already buying regularly. It is not a
          sensible target to chase on its own.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          One small thing worth doing early: the birthday gift on every tier requires completed KYC and a
          birth date on file. That is the same verification you need before your first redemption, so
          there is no reason not to get it out of the way on day one.
        </p>
      </section>

      {/* Tournaments */}
      <section id="weekly" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">The weekly rhythm, and what to show up for</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Pulsz runs on a fairly predictable weekly cycle, and most of it pays without a purchase. Knowing
          the shape of it is the difference between collecting the free value and only finding out about
          it afterwards. Worth saying up front: this calendar is the{" "}
          <strong className="text-text">Pulsz account only</strong>. Pulsz Bingo does not run the weekend
          spinner or the holiday events, so do not go looking for them over there.
        </p>
        <ul className="mt-3 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Wednesday.</strong> The loyalty wheel, if you have reached Icon or
            Legend. One spin, always pays something.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Weekends.</strong> Usually a weekend spinner event handing out free
            SC or free spins. This is the one most people miss, and it costs nothing to claim.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Around holidays.</strong> The weekend spinner is often swapped for a
            card-collection event: you collect cards as you play, picking up free spins along the way, with a
            prize for completing the set. Worth logging in through a holiday stretch rather than letting a
            half-finished collection expire.
          </li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          On top of the calendar there is a promotions tab that stays busy, surprise pop-up bonuses while you
          play, and frequent giveaways handing free SC to dozens of winners. None of it is worth chasing on
          its own, but claiming what lands in front of you costs nothing and it compounds with the daily
          streak.
        </p>
      </section>

      {/* App */}
      <section id="app" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Use the app for the daily habit</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Pulsz is one of the few sweeps casinos with real native apps on both iOS and Android rather
          than a wrapped mobile page, and they are not cut down. You can log in, claim the daily bonus,
          buy coins, play the full library with either currency, and request a redemption from the app.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          That matters more than it sounds. The whole plan here rests on claiming a streak every day on
          two accounts, and an app on your home screen is the difference between a habit that survives
          and one that quietly lapses. If you would rather not install anything, the mobile browser gives
          you the same account and the same features.
        </p>
      </section>

      {/* Bingo */}
      <section id="bingo" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">
          Pulsz Bingo: what carries over and what does not
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Pulsz Bingo runs the same backbone, the same 1x playthrough, and a near-identical slot library,
          so most of this guide applies there without change. What it adds on top is dedicated{" "}
          <strong className="text-text">50, 75 and 90-ball bingo rooms</strong> with Sweeps Coin prizes,
          which is a genuinely different way to convert a balance rather than a reskin of the slots.
        </p>
        <p className="mt-3 text-muted font-semibold">What carries over:</p>
        <ul className="mt-2 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The loyalty scheme.</strong> The tier names are different, but
            you earn points the same way, through Gold Coin gameplay and buying packages. Everything in
            the Pulsz Points section above applies here too, including the fact that the multiplier you
            are climbing toward is in Gold Coins.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The sales.</strong> Similar pattern, so judge them the same way:
            work out the Sweeps Coins per dollar rather than trusting the percentage on the banner.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The rules.</strong> Same 1x playthrough, same 21+ age limit,
            and the same eighteen restricted states.
          </li>
        </ul>
        <p className="mt-4 text-muted font-semibold">What does not:</p>
        <ul className="mt-2 space-y-2 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The weekly events.</strong> No weekend spinner and no holiday
            card-collection event. That is the biggest practical gap between the two accounts, and it is
            most of why the free value on Bingo is thinner than the shared slot library suggests.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The daily.</strong> Around 0.2 SC a day here, against a mature
            Pulsz streak worth roughly 5.5 SC a week.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">The library size.</strong> Smaller than Pulsz proper, and the
            bingo schedule thins out off-peak, so rooms can be quiet at odd hours.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">
          Put together, treat Pulsz as the main account and Pulsz Bingo as a lighter second stream. It is
          worth having for its own signup bonus, its daily, and its sales, and the bingo rooms are a fine
          way to spend a balance if you enjoy them. Just do not expect the weekly free value that makes
          the Pulsz account worth logging into.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Read the full{" "}
          <Link href="/sites/pulsz" className={LINK_CLS}>
            Pulsz review
          </Link>{" "}
          and{" "}
          <Link href="/sites/pulsz-bingo" className={LINK_CLS}>
            Pulsz Bingo review
          </Link>{" "}
          for the full scoring on each.
        </p>
      </section>

      {/* Routine */}
      <section id="routine" className="scroll-mt-24 mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Your first week, step by step</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Everything above in the order you should actually do it.
        </p>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-muted leading-relaxed">
          <li>
            Sign up on <strong className="text-text">both sites</strong> through our links and verify your
            email. That is 2 SC on each before you have spent anything.
          </li>
          <li>
            Complete <strong className="text-text">KYC on day one</strong>, on both accounts. You need it
            before your first redemption and for the birthday gift, and support is email only, so a
            verification hold is slow to unstick. Doing it now means you never need to contact them.
          </li>
          <li>
            Claim the <strong className="text-text">daily streak on both, every single day</strong>. The
            value sits at the end of each seven-day block, so a missed day costs far more than one day.
          </li>
          <li>
            Only buy if the maths works. The welcome tiers at 2 SC per dollar are the best pricing you
            will ever see here, so if you are going to spend at all, spend there rather than on a later
            10% sale.
          </li>
          <li>
            Clear the <strong className="text-text">1x playthrough</strong> on Classic Multi-Hand
            Blackjack or a high-RTP slot at minimum bet.
          </li>
          <li>
            Show up for the weekly extras: the weekend spinner, and the Wednesday wheel once you are
            Legend or Icon.
          </li>
          <li>
            Take your <strong className="text-text">first gift card at 10 SC</strong> rather than sitting
            on a balance waiting for the 100 SC cash minimum.
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 mt-8">
        <h2 className="text-2xl font-bold">Pulsz &amp; Pulsz Bingo FAQ</h2>
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
          Pulsz and Pulsz Bingo share the same restrictions. Both are{" "}
          <strong className="text-text">21+</strong> and not available in Alabama, Arizona,
          California, Connecticut, Idaho, Indiana, Louisiana, Maine, Maryland, Michigan, Mississippi,
          Montana, Nevada, New Jersey, New York, Tennessee, Washington, or West Virginia. Check our{" "}
          <Link href="/where-legal" className={LINK_CLS}>
            state legality map
          </Link>{" "}
          for what accepts players where you live.
        </p>
      </section>

      {/* CTA */}
      <section className="mt-8 text-center">
        <AffiliateLink
          slug="pulsz"
          name="Pulsz"
          source="pulsz_guide_bottom"
          className="inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90"
        >
          Claim your Pulsz bonus
        </AffiliateLink>
      </section>
    </article>
  );
}
