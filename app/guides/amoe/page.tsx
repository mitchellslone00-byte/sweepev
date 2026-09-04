import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { guideDate } from "@/lib/guide-dates";
import { ogMeta } from "@/lib/seo";
import { AffiliateLink } from "@/components/AffiliateLink";

export const metadata: Metadata = {
  title: "AMOE Guide: Free Sweeps Coins",
  description:
    "How AMOE works. Lead with digital AMOE to claim free Sweeps Coins through a site's online form (no mail, no writing), plus the full mail-in method for scaling up. Which sites offer it, how fast credits land, and how to make it a routine.",
  alternates: {
    canonical: `${siteConfig.url}/guides/amoe`,
  },
  ...ogMeta(
    "/guides/amoe",
    "AMOE Guide: Free Sweeps Coins",
    "How AMOE works. Lead with digital AMOE to claim free Sweeps Coins through a site's online form (no mail, no writing), plus the full mail-in method for scaling up. Which sites offer it, how fast credits land, and how to make it a routine."
  ),
};

const faqs = [
  {
    q: "What is digital AMOE?",
    a: "Digital AMOE is a photo-entry version of the Alternative Method of Entry: you handwrite an entry on an index card, take a photo, and submit it online for free Sweeps Coins. No purchase and no mailing. It's much faster than mail-in since there are no envelopes, stamps, or postal wait, though you still write the entry by hand.",
  },
  {
    q: "Which sites offer digital AMOE?",
    a: "The VGW family is where it shines: Chumba, LuckyLand Casino, and Global Poker each pay 5 SC per day for a photo entry, credited the next day. That's 15 SC per day if you run all three. Always confirm the current amount and process in each site's sweepstakes rules.",
  },
  {
    q: "How fast do digital AMOE credits arrive?",
    a: "On the VGW sites (Chumba, LuckyLand, Global Poker) digital AMOE SC is typically credited the next day. Far faster than the months a mailed entry can take. That speed is a big part of why digital AMOE is worth doing.",
  },
  {
    q: "Do I need to be verified first?",
    a: "Yes. Some sites won't process AMOE entries until your account is verified, and none will let you redeem winnings until you are. Complete verification (ID, selfie, and address/bank documents) before you start claiming.",
  },
  {
    q: "How many mail-in entries can I send for free SC?",
    a: "For most sites there's no definitive limit stated, so it's ambiguous. A few are explicit. Some cap entries per month, and Golden Hearts lets you send as many as you want but only enter one returned code per day. Always check the specific site's sweepstakes rules before you scale up.",
  },
  {
    q: "How long does it take to receive SC for mail-in entries?",
    a: "It varies widely. Many sites currently take about 2–3 months to credit mail-in entries, and a few can take as long as a year. Ask in the AMOE channel of our Discord for current lead times on a specific site.",
  },
  {
    q: "Can I print mail-in entries in a handwriting font or hire people to write them?",
    a: "No. These sites scan entries and flag handwriting that doesn't match your previous entries or looks machine-generated. That's a fast track to getting banned. Write your own entries, by hand.",
  },
];

export default function AmoeGuidePage() {
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

      <Link href="/guides" className="text-sm text-muted hover:text-text">
        ← Back to guides
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl md:text-4xl font-black">
          AMOE: Free Sweeps Coins
        </h1>
        <p className="mt-2 text-xs text-muted">Last updated: {guideDate("/guides/amoe").modifiedDisplay}</p>
        <p className="mt-3 text-muted leading-relaxed">
          AMOE lets you claim free Sweeps Coins with no purchase. There are two flavors:{" "}
          <strong className="text-text">digital AMOE</strong>. Handwrite an entry on an index card and
          submit a photo online, no mailing. And the classic{" "}
          <strong className="text-text">mail-in AMOE</strong>, which is more effort but scales further.
          This guide leads with digital (the easy, high-value option most people should start with), then
          covers the full mail-in method for anyone who wants to go deeper.
        </p>
      </header>

      {/* What is AMOE / digital */}
      <section className="mt-6 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">What is AMOE?</h2>
        <p className="mt-3 text-muted leading-relaxed">
          <strong className="text-text">AMOE</strong> stands for Alternative Method of Entry. Sweepstakes
          law requires a free way to get Sweeps Coins, so alongside buying Gold Coin packages, every
          legitimate site has to offer a no-purchase route to SC. That&apos;s AMOE. Free Sweeps Coins, with
          no purchase required.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          There are two ways to do it: a <strong className="text-text">digital AMOE</strong> (handwrite an
          entry on an index card, photograph it, and submit the photo online. No mailing) or the classic{" "}
          <strong className="text-text">mail-in AMOE</strong> (write and physically mail your entries). We
          cover both below. Either way, if your entry meets the criteria in the site&apos;s Sweepstakes
          Rules, they credit free SC to your account.
        </p>
      </section>

      {/* Why digital is worth it */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Why AMOE Is Worth Doing</h2>
        <p className="mt-3 text-muted leading-relaxed">
          AMOE is free SC for a couple of minutes of effort and no money out of pocket. On the right sites it
          can rival or even beat the daily login bonus, and it stacks on top of everything else you&apos;re
          already claiming. Daily bonuses, sales, and promos. Over a month the SC adds up, and every coin you
          earn this way is one you didn&apos;t have to buy.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          The two methods trade effort for scale. Digital AMOE is fast and low-effort, so it&apos;s the best
          place to start. Mail-in takes more work but lets you scale across more sites. We&apos;ll start with
          digital.
        </p>
      </section>

      {/* Divider into digital */}
      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl font-black">Digital AMOE: The Easy Route</h2>
        <p className="mt-2 text-muted leading-relaxed">
          Digital AMOE isn&apos;t fully paperless. You still handwrite an entry on an index card. But it
          skips the post office entirely: instead of mailing the card, you take a photo and submit it online.
          No envelopes, no stamps, no waiting on the mail. Right now the VGW family of sites is where this
          really pays:
        </p>
        <ul className="mt-3 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <AffiliateLink slug="chumba-casino" name="Chumba Casino" source="amoe_guide" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">Chumba</AffiliateLink>,{" "}
            <AffiliateLink slug="luckyland-casino" name="LuckyLand Casino" source="amoe_guide" className="font-semibold text-accent underline underline-offset-2 hover:opacity-80">LuckyLand Casino</AffiliateLink>, and{" "}
            <strong className="text-text">Global Poker</strong> each pay{" "}
            <strong className="text-text">5 SC per day</strong> for a photo entry, credited the next day. Run
            all three and that&apos;s <strong className="text-text">15 SC per day</strong>.
          </li>
        </ul>
        <p className="mt-4 rounded-xl border border-accent/40 bg-accent/[0.06] p-4 leading-relaxed text-muted">
          <strong className="text-text">Do the math:</strong> 15 SC a day across all three sites is roughly{" "}
          <strong className="text-accent">450 SC a month</strong>. After washing it through the 1x playthrough
         . You&apos;ll lose about 3% to the house edge on a high-RTP game. That&apos;s around{" "}
          <strong className="text-accent">$435 in redeemable value</strong> a month, for a few minutes of
          writing a day, and you never spend a cent.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Because it pays out the next day, digital AMOE stacks cleanly with your daily logins. It&apos;s
          effectively another daily claim. Confirm the current amount and process on each site, since these
          can change over time.
        </p>
      </section>

      {/* How to find & use digital */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">How to Find &amp; Use Digital AMOE</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Each site tucks the entry-request screen in a slightly different spot. Here&apos;s where to find it:
        </p>
        <ul className="mt-3 space-y-2.5 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Chumba</strong>. Scroll to the bottom of the main page and open{" "}
            <strong className="text-text">Entry Request</strong>.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Global Poker</strong>. Go to{" "}
            <strong className="text-text">Play for Free</strong> near the shop, then submit a request.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">LuckyLand Casino</strong>. Tap the gem icon at the
            top, then go to <strong className="text-text">Profile → Entry Request</strong>.
          </li>
        </ul>
        <p className="mt-4 text-muted leading-relaxed">From there the process is the same everywhere:</p>
        <ol className="mt-2 list-decimal pl-6 text-muted space-y-2.5 leading-relaxed">
          <li>
            Handwrite the entry on an index card exactly as the screen instructs. The name must match your
            verified ID <strong className="text-text">exactly</strong> (middle name included if that&apos;s how
            you signed up), plus any required code or text.
          </li>
          <li>Take a clear, legible photo of the card and submit it.</li>
          <li>On these VGW sites the SC lands the next day.</li>
        </ol>
      </section>

      {/* Digital tips */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Digital AMOE Tips</h2>
        <ul className="mt-3 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Verify first.</strong> Complete ID, selfie, and address/bank
            verification before you start. Some sites won&apos;t process AMOE entries until you&apos;re
            verified, and none will let you redeem until you are.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Match your ID name exactly.</strong> The single most common reason an
            entry gets rejected is a name that doesn&apos;t match your verified identity. Copy it exactly.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Make it a daily habit.</strong> Digital AMOE resets like a daily
            bonus. Keep a pre-written index card as a template, add the entry pages to the same bookmark folder
            you use for daily claims, and knock them out in one pass.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Know the caps.</strong> Claim the full daily/monthly allowance, but
            don&apos;t waste time submitting past it. And re-check the rules periodically. Amounts and forms
            change.
          </li>
        </ul>
      </section>

      {/* Divider into mail-in */}
      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl font-black">Going Further: Mail-In AMOE</h2>
        <p className="mt-2 text-muted leading-relaxed">
          Once you&apos;ve got digital AMOE dialed in, mailing in written entries is the next step for
          scaling free SC across more sites. It&apos;s slower and more hands-on. You&apos;re writing physical
          cards and envelopes. But for patient writers it stacks up over time and costs nothing but postage.
          Mail-in entries are strict, though: a mistake on the envelope or card, or the wrong materials, will
          generally void your entry.
        </p>
      </section>

      {/* Mail-in: find & read rules */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Step 1: Find &amp; Read the Sweepstakes Rules</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Find the <strong className="text-text">Sweepstakes Rules</strong> page (usually in the footer),
          then locate the alternative-method section. Searching (Ctrl-F) for{" "}
          <strong className="text-text">&ldquo;written&rdquo;</strong> or{" "}
          <strong className="text-text">&ldquo;alternative method&rdquo;</strong> gets you there fast. Read it
          carefully and note every detail. The four things that matter most:
        </p>
        <ul className="mt-4 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">How much SC per entry?</strong> This is the whole ballgame. Some
            sites credit as little as 0.75–1 SC per entry. A stamp is currently about $0.73, plus a few cents
            for the envelope and card. Before pens, white-out, and the few minutes each entry takes. Do the
            math before committing to a site.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">What materials are required?</strong> Commonly #10 envelopes and
            blank, unlined 4x6 index cards or paper. But check, there are exceptions. Watch the ink rules too:
            many sites require <em>non-black</em> ink, while a few require black. Don&apos;t assume.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Are there entry limits?</strong> Most sites don&apos;t state one, but
            some do. Know the cap before you start writing a stack.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">How do you generate the unique code?</strong> Most sites require a
            unique code written on each entry. The rules explain how and where. And these codes usually{" "}
            <em>expire</em>, so don&apos;t pull a big batch and let them sit.
          </li>
        </ul>
      </section>

      {/* Critical reminder */}
      <section className="mt-4 rounded-2xl border border-yellow-500/40 bg-yellow-500/5 p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent2">Critical Reminder: The Envelope &amp; Card</h2>
        <p className="mt-3 text-muted leading-relaxed">
          Pay extremely close attention to exactly what the rules tell you to write on the envelope and the
          card. This is where most voided entries happen.
        </p>
        <p className="mt-3 text-muted leading-relaxed">
          Many sites don&apos;t want your name above the return address on the envelope. But some do. Most
          require the name on the card to match your name{" "}
          <strong className="text-text">exactly as it appears on the ID you verified with</strong> (which may
          mean including your middle name). Others want only first and last. There is no universal rule. Read
          each site&apos;s requirements and follow them <strong className="text-text">exactly</strong>.
        </p>
      </section>

      {/* Mail-in tips & tricks */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Mail-In Tips &amp; Tricks</h2>
        <ul className="mt-3 space-y-3 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Work on your handwriting.</strong> Keep it clear, legible, and not
            too small. Cramped loops on e/d/g cause misreads (a tight &ldquo;e&rdquo; looks like &ldquo;c&rdquo;;
            a sloppy &ldquo;d&rdquo; reads as &ldquo;ol&rdquo;) and overlong tails on y cause problems. Expect
            trial and error early. It feels awkward at first, and that&apos;s normal.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Don&apos;t rush.</strong> Don&apos;t grip the pen or press too hard. Both tire your hand fast. Set up a comfortable spot with good posture, and try cardboard or a
            magazine under your card for a firmer surface.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Make a template per site.</strong> Write one perfect card and
            envelope, set it aside, and use it as your model for every entry to that site.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Batch the process.</strong> Write all the envelopes, then all the
            cards, then stuff and seal, then apply stamps last.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Always stamp last.</strong> Never use pre-stamped envelopes. Botching
            an already-stamped envelope is a ~$0.76 mistake instead of a ~$0.03 one.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Track everything in a spreadsheet.</strong> Log how many letters you
            sent to each site and when. Once credits arrive, this reveals turnaround times and whether any
            entries are being rejected.
          </li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">
            <strong className="text-text">Re-check the rules periodically.</strong> Sites do change
            requirements. If you see a prompt about a rules update, check your template against the new rules
            before sending more.
          </li>
        </ul>
      </section>

      {/* Supplies */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">Mail-In Supplies</h2>
        <p className="mt-3 text-muted leading-relaxed">
          A basic mail-in kit is cheap to put together. Always confirm the exact materials in each site&apos;s
          rules, but this covers most:
        </p>
        <ul className="mt-3 space-y-1.5 text-muted leading-relaxed">
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">#10 envelopes</li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">Blank, unlined 4x6 index cards or paper</li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">Pens in the required ink color (keep both non-black and black on hand)</li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">White-out / correction tape</li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">Stamps (applied last, always)</li>
          <li className="before:content-['◆'] before:text-accent2 before:mr-2">A firm writing surface. A lap desk, cardboard, or a magazine under the card</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-4 rounded-2xl border border-accent/40 bg-panel p-5">
        <h2 className="text-xl md:text-2xl font-bold text-accent">AMOE FAQ</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-panel/60 p-4">
              <summary className="cursor-pointer list-none font-semibold text-text">
                <span className="text-accent2">▸ </span>
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Discord + general guide note */}
      <section className="mt-4 rounded-2xl border border-border bg-panel/60 p-5 text-sm text-muted">
        <p>
          Amounts, rules, and turnaround times change often. The fastest way to know what&apos;s working right
          now is the AMOE channel in our{" "}
          <a
            className="underline hover:text-text"
            href="https://discord.gg/A62yrjBPZN"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          . New to the wider strategy? Start with the{" "}
          <Link href="/guides" className="underline hover:text-text">
            general Sweeps strategy guide
          </Link>
          , and see which sites hand out free SC just for logging in on our{" "}
          <Link href="/daily-sc" className="underline hover:text-text">
            Free Daily SC list
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
