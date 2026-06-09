import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `General Sweeps Strategy | ${siteConfig.name}`,
  description: "How to collect free Sweeps Coins daily and how to actually use welcome offers on Sweepstakes casinos.",
  alternates: {
    canonical: `${siteConfig.url}/guides`,
  },
};

export default function GuidesPage() {
  return (
    <article className="container-x py-10 md:py-14 max-w-3xl">
      <Link href="/" className="text-sm text-muted hover:text-text">← Back to rankings</Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">General Sweeps Strategy</h1>
        <p className="mt-2 text-muted">
          Everything you need to know to get started, stay profitable, and avoid common mistakes on sweepstakes casinos.
        </p>
        <p className="mt-2 text-xs text-muted">Last updated: {siteConfig.lastUpdated}</p>
      </header>

      {/* Disclaimer */}
      <section className="mt-6 rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5 text-sm text-muted">
        <p className="font-semibold text-text">Disclaimer</p>
        <p className="mt-1 leading-relaxed">
          Nothing on this site is financial advice. I am not a finance or gambling professional. Results will vary, and I am not responsible for any losses. These platforms change frequently — stay informed and play at your own risk.
        </p>
      </section>

      {/* Registration, Verification & Redemption */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Registration, Verification &amp; Redemption</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Be precise with your information when signing up. Enter your name <strong className="text-text">exactly</strong> as it appears on the ID you&apos;ll use to verify — most commonly a driver&apos;s license. For example, if you go by &ldquo;Mike&rdquo; but your license says &ldquo;Michael,&rdquo; register as Michael. Most reputable sites won&apos;t make it an issue, but some will. If you enter incorrect details, update your profile yourself if the option is available, or reach out to support <strong className="text-text">before</strong> you deposit or attempt a redemption.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Do <strong className="text-text">not</strong> create multiple accounts or do anything that could be flagged as fraudulent activity. This can result in your winnings being forfeited entirely. Follow the rules, and you won&apos;t have any problems.
        </p>
      </section>

      {/* Verify Early */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Verify Early</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Get verified before depositing any money. While most players don&apos;t run into issues verifying after a win, doing it ahead of time removes a potential headache down the road. The last thing you want is a redemption held up because your license says &ldquo;Susan&rdquo; but your bank statement lists you as &ldquo;Sue.&rdquo; Take care of it before it becomes a problem.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Also add a redemption method early. Some casinos aren&apos;t compatible with online banks like Robinhood for withdrawals — it&apos;s worth trying, but have a traditional checking account available as a backup to avoid delays when it&apos;s time to cash out.
        </p>
      </section>

      {/* Washing */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Washing: Maximize Profits, Minimize Risk</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Before you can redeem, most sites require you to play through your balance at least once. This is called &ldquo;washing.&rdquo; The goal is to retain as much of your balance as possible using low-risk strategies.
        </p>
        <ul className="list-disc pl-6 mt-3 text-muted space-y-2 leading-relaxed">
          <li><strong className="text-text">Use high-RTP games.</strong> Aim for titles with 97%+ return-to-player. The higher the RTP, the less you lose on average per spin.</li>
          <li><strong className="text-text">Plinko &amp; Slots:</strong> High-RTP slots and low-volatility Plinko settings are the go-to options for reliable, consistent returns.</li>
          <li><strong className="text-text">Blackjack:</strong> Stick to basic strategy and keep your bets small. It can move slowly, but it&apos;s one of the best games for preserving your balance.</li>
          <li><strong className="text-text">Cross-washing:</strong> When a site offers cross-washing (wagering on one game type to clear playthrough on another), always use it — it consistently delivers the highest returns.</li>
        </ul>
      </section>

      {/* Welcome Offers */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Welcome Offers &amp; Bonuses</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Sweepstakes casinos regularly offer strong bonuses to new players — sometimes 100% or more on initial purchases. These are the best deals you&apos;ll ever see on a given site. Take full advantage of them. Once you&apos;ve used your welcome offer, those terms are gone for good.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Done correctly, a $10-for-30-SC welcome package washes out to roughly <strong className="text-text">$28–$29 in redeemable SC</strong> after 1× playthrough on a high-RTP slot. That&apos;s a clean profit on every site running this offer. Stack ten sites with welcome offers and you&apos;re looking at a significant one-time return just from signups alone.
        </p>
      </section>

      {/* RTP Explained */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">RTP (Return to Player) Explained</h2>
        <p className="mt-3 text-muted leading-relaxed">
          RTP is the percentage a game returns to players on average over a large number of rounds. Game developers calculate this by simulating tens of millions of spins, typically at minimum bet increments, to arrive at a long-run average.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Most games have an info button that shows payout tables and RTP. If a game displays its RTP on one platform but not on another — that&apos;s a red flag. It may indicate the site is running an altered, lower-RTP version of the game. Always check before you play.
        </p>
      </section>

      {/* Why Small Bets Matter */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Why Small Bets Matter</h2>
        <p className="mt-3 text-muted leading-relaxed">
          RTP is calculated at small bet increments. Here&apos;s why that matters:
        </p>
        <ul className="list-disc pl-6 mt-3 text-muted space-y-2 leading-relaxed">
          <li>Playing 100 hands of blackjack at $1 each with basic strategy puts you very close to your starting balance — variance is manageable.</li>
          <li>Playing 5 hands at $20 each introduces huge swings. You could double up or go broke before RTP has any chance to stabilize.</li>
        </ul>
        <p className="mt-3 text-muted leading-relaxed">
          <strong className="text-text">Bottom line:</strong> small bets reduce variance and let the game&apos;s RTP work in your favor over time. Bigger bets are a gamble on luck, not strategy.
        </p>
      </section>

      {/* Daily Farming */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Daily Farming &amp; Being Efficient</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Find a system that works for you. Here&apos;s what works well:
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          <strong className="text-text">On PC:</strong> Bookmark all your daily claim pages in a single folder in your browser&apos;s bookmarks bar. Open the entire folder at once, let the tabs load, then jump between them to claim rewards. With this method, you can work through 40+ dailies in under 5 minutes.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          <strong className="text-text">On iPhone:</strong> Organize your casinos into separate tab groups in Safari — splitting 45 sites across 3 groups keeps things manageable. Save passwords in the browser and use Face ID to log in quickly. It takes a bit longer than PC but is still under 10 minutes per day.
        </p>
      </section>

      {/* VIP Transfer Opportunities */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">VIP Transfer Opportunities</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Some platforms offer VIP transfers, meaning they&apos;ll honor your status from another casino to win your business. This is an easy way to unlock better offers and higher daily bonuses without starting from scratch.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          For example, achieving Diamond status through washing on Pulsz &amp; Pulsz Bingo can be transferred to WOW Vegas for Silver VIP — bumping the daily from 0.30 SC to 1 SC plus a bonus SC package. Similarly, Bronze VIP at Stake (earned through low-volatility Plinko for around $50) can be transferred for comparable perks at select sites.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          You typically only get one transfer per site, so time it well — wait until you&apos;ve reached a meaningful VIP tier before making the move.
        </p>
      </section>

      {/* Discipline */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Discipline is Key</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The hardest part of this whole approach is sticking to your strategy. Casinos are built on the assumption that most players won&apos;t. If you choose to gamble on these platforms beyond the strategy plays, try to use winnings from a previous wash rather than fresh deposits — losing free money stings a lot less.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Resist the urge to spin your daily bonuses on high-variance slots. Yes, you can get lucky — but if you&apos;re running this as a side income, the smarter play is to save up, pair your dailies with a sale, and work toward a larger redemption.
        </p>
      </section>

      {/* Tracking Wins & Losses */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Tracking Wins &amp; Losses</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Keep a running record of your deposits, wins, and losses. It gives you a clear picture of how much you&apos;re actually making and where it&apos;s coming from. It also keeps you grounded if variance starts going against you. Depending on your situation, this record may also be useful at tax time.
        </p>
      </section>

      {/* Expedite Redeeming */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Expedite Redeeming Your Dailies</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Building up 50–100 SC purely from daily bonuses takes patience. Here&apos;s a way to speed it up without taking on unnecessary risk:
        </p>
        <ol className="list-decimal pl-6 mt-3 text-muted space-y-2 leading-relaxed">
          <li>Stack your dailies until you&apos;ve built up a reasonable amount — 10 to 15 SC is a solid starting point.</li>
          <li>Watch for a sale event and combine your accumulated SC with a bonus package purchase.</li>
          <li>Wash the combined total. The larger balance clears playthrough faster and gets you to redemption much more quickly.</li>
        </ol>
        <p className="mt-3 text-muted leading-relaxed">
          It&apos;s easy to chip away at your balance with casual spins. If you&apos;re running this as a side hustle, that habit will quietly kill your profit margins.
        </p>
      </section>

      {/* Credit Cards */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Purchasing SC with Credit Cards</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Buying discounted SC packages with a cashback credit card is a straightforward way to add margin to every purchase. A 3% unlimited cashback card works especially well here — entertainment or gaming spend categories often qualify, and the cashback adds up quickly across multiple sites.
        </p>
        <ul className="list-disc pl-6 mt-3 text-muted space-y-2 leading-relaxed">
          <li><strong className="text-text">Card verification:</strong> Some casinos will hold your account until you verify the physical card used for a purchase. Be prepared for this.</li>
          <li><strong className="text-text">Avoid virtual cards.</strong> Using a virtual card number can invalidate your redemption. Always use a physical card, and have a selfie ready — some sites will ask for one.</li>
          <li><strong className="text-text">When speaking to your card issuer,</strong> refer to these as &ldquo;gaming platforms,&rdquo; not casinos or gambling sites. Some card companies will flag or block transactions otherwise. International processors are common here, so the occasional call to validate a transaction is normal.</li>
        </ul>
      </section>

      {/* Combining Strategies */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Combining Strategies for Maximum Profit</h2>
        <p className="mt-3 text-muted leading-relaxed">
          The real edge comes from stacking everything together: a cashback credit card purchase during a sale, combined with accumulated daily SC, washed on a high-RTP game, then redeeming. Each layer adds a small edge, and together they compound into a genuinely profitable routine.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          At its core, this is a creative side hustle — so make it your own. The players who do best are the ones who stay consistent, stay disciplined, and keep optimizing their approach over time.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Top Sites to Get Started</h2>
        <p className="mt-3 text-muted leading-relaxed text-sm">
          If you are just getting started, these are our top-rated sites for 2026. Each has a dedicated review covering bonuses, redemptions, and strategy.
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { name: "Crown Coins", slug: "crown-coins" },
            { name: "Sweet Sweeps", slug: "sweet-sweeps" },
            { name: "Chumba Casino", slug: "chumba-casino" },
            { name: "LuckyLand Slots", slug: "luckyland-slots" },
            { name: "Pulsz", slug: "pulsz" },
            { name: "Modo", slug: "modo" },
            { name: "ReBet", slug: "rebet" },
            { name: "WOW Vegas", slug: "wow-vegas" },
            { name: "Legendz Casino", slug: "legendz-casino" },
          ].map(s => (
            <Link
              key={s.slug}
              href={`/sites/${s.slug}`}
              className="rounded-lg border border-border bg-panel/60 px-3 py-2 text-sm text-muted hover:text-text hover:border-accent/40 transition-colors text-center"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          Sweepstakes casinos are entertainment first, side income second. Set a budget, take breaks, and never chase losses. If gambling stops being fun, call{" "}
          <a className="underline hover:text-text" href="tel:1-800-522-4700">
            1-800-GAMBLER
          </a>
          .
        </p>
      </section>
    </article>
  );
}
