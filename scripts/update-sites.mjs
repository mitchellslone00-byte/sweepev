// One-shot site content refresh. Reads data/sites.json, applies the spec
// from the operator memo (highlight/pros/cons/review rewrites, rename
// Fortune Coins -> Fortune Wins, move Coinsback to B tier, add 9 new
// brands), and writes the file back.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(here, "..", "data", "sites.json");
const sites = JSON.parse(fs.readFileSync(file, "utf8"));

function getBySlug(slug) {
  return sites.find((s) => s.slug === slug);
}

function assign(slug, patch) {
  const s = getBySlug(slug);
  if (!s) throw new Error("Missing site: " + slug);
  Object.assign(s, patch);
}

// ---------------- 1. Crown Coins ----------------
assign("crown-coins", {
  highlights: [
    "Free daily SC that scales with VIP",
    "Fast Skrill redemptions",
  ],
  pros: [
    "Generous no-purchase signup",
    "Fast cashouts",
    "Monthly bonus (scales with VIP)",
  ],
  strategy: {
    edge:
      "CrownCoinsCasino is one of the most established sites in 2026 and is our personal favorite. From the generous free daily SC to the great promo packages, it doesn't get much better. CCC offers an excellent VIP program, so make sure to refer to the dedicated guide on how to get the most out of CrownCoins. CCC should easily be one of your most profitable sites with the Thursday races, and that improves materially once you hit Gold VIP.",
    washingGames: getBySlug("crown-coins").strategy?.washingGames,
  },
});

// ---------------- 2. Sweet Sweeps ----------------
assign("sweet-sweeps", {
  highlights: [
    "Daily SC",
    "Frequent sales and weekly events",
    "Large live game library",
  ],
  strategy: {
    ...getBySlug("sweet-sweeps").strategy,
    edge:
      "Sweet Sweeps is one of the newer S-tier established sites. Between the daily SC bonus and the frequent weekly sales and events, the long-run value is strong and consistent. Make sure you keep an eye on Discord for when new events pop up and sales drop.",
  },
});

// ---------------- 3. LoneStar ----------------
assign("lonestar", {
  highlights: [
    "Daily SC and free SC links/spins (Discord)",
    "Frequent large package sales",
    "Live dealer games",
  ],
  cons: ["No instant redemption"],
  strategy: {
    ...getBySlug("lonestar").strategy,
    edge:
      "LoneStar has quickly become one of the more rewarding sites in 2026. Frequent freebies, regular large sales, and a clean themed UI make it a staple in the rotation. Sister site to RealPrize, so the same operator backbone is behind both. Quick note: after a large amount of profit, redemptions can take a while to come through, but they will come through.",
  },
});

// ---------------- 4. RealPrize ----------------
assign("realprize", {
  highlights: [
    "Daily SC and free SC links/spins (Discord)",
    "Frequent large package sales",
    "Live dealer games",
  ],
  cons: ["Slower redemption times"],
  strategy: {
    ...getBySlug("realprize").strategy,
    edge:
      "Between the daily SC drops, links, spins, and many sales, RealPrize is one of the higher-value sites. Make sure you join the Discord so you don't miss any freebies. Similar to LoneStar, be aware that after a large amount of profit redemption time can slow down, but it does come through.",
  },
});

// ---------------- 5. WOW Vegas ----------------
assign("wow-vegas", {
  highlights: [
    "Daily SC",
    "Daily SC links and free spins shared on Discord",
    "Live dealer games",
  ],
  cons: ["No meaningful VIP farming"],
  strategy: {
    ...getBySlug("wow-vegas").strategy,
    edge:
      "WOW Vegas remains one of our favorite sites in 2026. Between the free daily spins, daily SC links, and flash sales there is tons of value here. The large selection of games makes this an easy wash. Don't miss out on WOW Vegas, and make sure to join the Discord so you don't miss any freebies.",
  },
});

// ---------------- 6. ReBet ----------------
assign("rebet", {
  highlights: [
    "1 SC daily",
    "Free pick promos and a monthly pass",
    "Mobile-first app experience",
  ],
  strategy: {
    ...getBySlug("rebet").strategy,
    edge:
      "Our favorite sports-and-sweeps casino. The free pick promos, the monthly pass, and the steady daily SC make it more valuable over time than most sports-first social books. Strong opening welcome offer on top. Quick trick: the 1 SC daily will not stack if your balance is above $1, so place a long-term future bet that's heavily favored to stack up the freebies.",
  },
});

// ---------------- 7. Dogg House ----------------
assign("dogghouse", {
  highlights: [
    "1 SC daily",
    "Built on the ReBet UI engine",
    "Sweepstakes redemptions",
  ],
  strategy: {
    ...getBySlug("dogghouse").strategy,
    edge:
      "One of the newer S-tier sites and built on the same UI engine as ReBet, so the experience feels familiar from day one. Daily SC drops are steady and the welcome bundle is one of the strongest openings in the space. Similar to ReBet, the daily SC won't stack with a non-zero balance, so place a heavily favored futures pick to stack them up.",
  },
});

// ---------------- 8. Pulsz ----------------
assign("pulsz", {
  highlights: [
    "Daily SC",
    "Relax Gaming + Push Gaming",
    "Skrill and bank cashouts",
  ],
  cons: ["No live games", "VIP perks favor heavy buyers"],
  strategy: {
    edge:
      "Pulsz is another one of our favorite sites in 2026. Offering a generous daily SC login bonus, events, and frequent sales. With a 1x playthrough and a plethora of solid games to choose from, this is a no-brainer. Pulsz VIP scales largely with the amount you spend, so it's not farmable, but after a few washes you should see a large increase.",
  },
});

// ---------------- 9. Pulsz Bingo ----------------
assign("pulsz-bingo", {
  highlights: [
    "Daily SC",
    "Live bingo rooms with SC prizes",
    "Slot library shared with Pulsz",
  ],
  strategy: {
    edge:
      "Pulsz Bingo runs on the same Yellow Social backbone as Pulsz, so the same wins apply: generous daily SC login bonus, frequent sales, and a clean 1x playthrough. The slot library is shared with Pulsz and the live bingo rooms add a different way to win SC. VIP scales with purchase activity rather than wagering, so it's not farmable, but the value compounds with a few washes.",
  },
});

// ---------------- 10. Coinsback (rank 10, but B-tier display per memo) ----------------
assign("coinsback-casino", {
  tier: "B",
  pros: ["Cashback rewards on play", "No-purchase signup SC"],
  strategy: {
    edge:
      "Coinsback Casino is a new social casino affiliated with the WOW Vegas group that we're very excited about. The \"coinsback\" feature gives you 50% back based on the RTP of the game, which is something new and worth tracking. We haven't seen any sales or a ton of value yet, but keep it on your radar. Coinsback offers a great 10 SC on signup, so don't miss out.",
  },
});

// ---------------- 11. Zula ----------------
assign("zula-casino", {
  highlights: [
    "Free daily SC",
    "Relax Gaming + Push Gaming catalog",
    "Skrill and bank cashouts",
  ],
  cons: ["No live dealer"],
  strategy: {
    edge:
      "Zula is the flagship of the Priority Play / Zula sister-site network. They give 1 SC daily, run sporadic happy-hour sales, and most importantly: keep an eye out for a $1000 for 2000 SC offer that can trigger randomly. That's the play to watch for here.",
  },
});

// ---------------- 12. Sportzino ----------------
assign("sportzino", {
  cons: ["No live games"],
  strategy: {
    edge:
      "Sportzino is part of the Zula / Priority Play sister-site family. The sportsbook side is the main draw, but they sometimes have happy-hour sales that can be very profitable. Watch the promos tab and the Discord for drops.",
  },
});

// ---------------- 13. Yay Casino ----------------
assign("yay-casino", {
  cons: [],
  strategy: {
    edge:
      "Similar to the other Priority Play sites, Yay randomly offers happy-hour sales and decent promos. Definitely one you don't want to skip out on. Sister site to Zula, Sportzino, and American Luck.",
  },
});

// ---------------- 14. American Luck ----------------
assign("american-luck", {
  cons: ["Newer casino", "No live games"],
  strategy: {
    edge:
      "American Luck is another Zula / Priority Play sister site. They randomly drop happy-hour sales and decent promos, similar to Yay and Zula, so it's worth keeping an account active just to catch the flashes of value.",
  },
});

// ---------------- 15. SpinQuest ----------------
assign("spinquest", {
  highlights: [
    "Free daily SC",
    "Instant redemptions",
    "Large game catalog",
  ],
  pros: [
    "1 SC daily",
    "Instant redeems under $500",
    "Large game catalog",
  ],
  cons: [
    "Strict playthrough requirements (be careful)",
    "Limited promotions",
  ],
  strategy: {
    edge:
      "SpinQuest is one of the newer sweepstakes casinos you've likely heard of if you follow any gambling influencers. It offers a generous 1 SC daily, but be careful: the playthrough requirements have been changing a lot recently, so make sure you're in the Discord to stay current. SpinQuest has a massive selection of games and some decent sales every once in a while.",
  },
});

// ---------------- 16. Modo ----------------
assign("modo", {
  highlights: [
    "Daily SC",
    "VIP farming",
    "Plenty of great sales",
  ],
  pros: ["VIP farming", "Free daily SC", "Tons of sales"],
  cons: ["Lacking some live games"],
  strategy: {
    edge:
      "Modo has been one of the hottest sites in 2026, offering consistent sales that bring a tremendous amount of value. Modo runs 1x playthrough and has plenty of games, so washing is a breeze. Refer to the dedicated Modo guide on how to farm VIP — they just completely reset their VIP system, so there's plenty of value to grab. Don't miss out on Modo, join now.",
  },
});

// ---------------- 17. Fortune Wins (renamed from Fortune Coins) ----------------
assign("fortune-coins", {
  name: "Fortune Wins",
  tagline: "Zula sister site running on Fortune Coins (FC) at a 100:1 ratio.",
  highlights: [
    "Daily free SC",
    "Zula sister site",
    "Large game selection",
  ],
  pros: [
    "Frequent sales",
    "$50 SC min redeem",
    "Free daily SC",
  ],
  cons: ["No live games", "No VIP farming"],
  strategy: {
    edge:
      "Fortune Wins is another Zula sister / Priority Play site. This one uses FC instead of SC and goes by a 100:1 ratio. Fortune Wins offers a generous daily SC bonus that scales with how many days you log in, nice welcome offers, and some great sales to watch for.",
  },
});

// ---------------- 18. Luck Party ----------------
assign("luck-party", {
  highlights: [
    "Daily free SC",
    "Zula sister site",
    "Daily SC links (Discord)",
  ],
  cons: ["Limited live dealer options"],
  strategy: {
    edge:
      "Luck Party is another Zula / Priority Play sister site. We haven't seen a ton of value in sales here yet, but the frequent SC links and the SC login bonus make it worth it. No live dealers, so pick a low-volatility slot or Plinko for easy washing. Don't miss out on the free SC — it stacks up.",
  },
});

// ---------------- 19. Win Bonanza ----------------
assign("win-bonanza", {
  highlights: [
    "Daily SC login bonus",
    "SC links (Discord)",
    "Zula sister site",
  ],
  pros: [
    "Reliable brand",
    "Daily SC login + links",
    "Decent game selection",
  ],
  cons: ["No live games", "Haven't seen any large amount of sales yet"],
  strategy: {
    edge:
      "Win Bonanza is the latest sister site from the Zula group. We haven't seen a ton of value from this site yet, but it does offer a generous daily SC login bonus and frequently drops 1 SC links that we post in our Discord. Get started, grab the welcome offer, and take advantage of the free SC.",
  },
});

// ---------------- 20. SpinPals ----------------
assign("spinpals", {
  highlights: [
    "Free daily SC",
    "Frequent offers",
    "VIP farming",
  ],
  pros: [
    "Free daily SC",
    "Great selection of live games",
    "Frequent promos",
  ],
  cons: [
    "$500/day redemption limit",
    "Newer brand with shorter track record",
  ],
  strategy: {
    edge:
      "SpinPals is a newer site that we've seen a decent amount of value on. SpinPals offers a very generous daily bonus as well as a VIP system that's farmable with GC. They frequently offer sales that include free spins and can be very +EV. There's a $500/day redemption limit, but that's rarely a problem.",
  },
});

// ---------------- 21. Rolla ----------------
assign("rolla", {
  highlights: [
    "Daily SC",
    "Daily login bonuses",
    "WOW Vegas sister site",
  ],
  pros: [
    "Strong welcome value",
    "Daily SC",
    "No-purchase signup SC",
  ],
  cons: [
    "Limited sales",
    "Not as much value as WOW Vegas",
  ],
  strategy: {
    edge:
      "Rolla is a newer sister site to WOW Vegas. They offer a small daily SC login bonus and typically have a flash sale once a week that's good value. Rolla will usually drop a few free 1 SC links a week, so make sure you're in the Discord to grab them. There's some value here — don't skip it.",
  },
});

// ---------------- 22. Baba Casino ----------------
assign("babacasino", {
  highlights: [
    "Generous daily login bonus",
    "Frequent SC links",
    "Quick redeems",
  ],
  cons: [
    "Limited game selection",
    "No VIP program",
  ],
  strategy: {
    edge:
      "Baba is a newer sweepstakes casino that offers a decent daily streak, farmable SC accumulation, and some decent sales. It's a reliable platform that you should definitely add to your list. Baba has a $50 minimum gift-card redemption and $100 for a cash prize, so use that to your advantage for your daily farming.",
  },
});

// ---------------- 23. Legacy Casino ----------------
assign("legacy-casino", {
  highlights: [
    "Instant redemptions",
    "Daily sales",
    "French roulette at 1x",
  ],
  pros: [
    "Instant redeems",
    "Great game selection at 1x playthrough",
    "Clean UI",
  ],
  cons: ["No live games", "No VIP program", "Newer brand"],
  strategy: {
    edge:
      "Legacy Casino is one of the newer additions to our vetted list. Legacy offers a generous $10 for 30 SC signup bonus and a 20% purchase match daily. Combined with their French roulette at 1x, this makes it a no-brainer. Keep an eye on Legacy — they've said better features are coming.",
  },
});

// ---------------- 24. Legendz Casino ----------------
assign("legendz-casino", {
  highlights: [
    "Daily SC",
    "Quick/instant redemptions",
    "Frequent sales/promos",
  ],
  pros: [
    "Daily login SC",
    "Great sales",
    "Thirsty Thursday promo",
  ],
  cons: [
    "No crypto redemption",
    "Poor VIP program",
  ],
  strategy: {
    edge:
      "Legendz has been a consistent money maker for us. They have frequent 10–20% sales that are easily cross-washable thanks to a ton of live games. They also run a promotion called Thirsty Thursday that's closer to guaranteed profit. Instant redeems on Legendz are great — you do not have to wait. Don't miss this one.",
  },
});

// ---------------- New brands ----------------
const sweepSister = (slug, name, homepage, affiliate) => ({
  slug,
  name,
  tagline: "Sweep sister site with frequent sale codes and instant redeems.",
  rating: 4.1,
  bonus: "$10 for 30 SC welcome offer",
  promoCode: "",
  homepageUrl: homepage,
  affiliateUrl: affiliate,
  available: "Available in most US states",
  highlights: [
    "$10 for 30 SC welcome offer",
    "Super frequent sales",
    "Large game selection",
  ],
  pros: [
    "Instant redeems",
    "Tons of sales",
    "Large game selection",
  ],
  cons: [
    "1x playthrough only applies to slots",
    "Poor daily bonus",
  ],
  strategy: {
    edge:
      `${name} is another Sweep Sister site. Similar to the others, they run frequent sale codes — make sure you join the Discord so you don't miss any of them.`,
  },
});

const newBrands = [
  sweepSister(
    "speedsweeps",
    "SpeedSweeps",
    "https://speedsweeps.com",
    "https://speedsweeps.com"
  ),
  sweepSister(
    "dimesweeps",
    "DimeSweeps",
    "https://dimesweeps.com",
    "https://dimesweeps.com"
  ),
  sweepSister(
    "sweepsroyal",
    "SweepsRoyal",
    "https://sweepsroyal.com",
    "https://sweepsroyal.com"
  ),
  sweepSister(
    "richsweeps",
    "RichSweeps",
    "https://richsweeps.com",
    "https://richsweeps.com"
  ),
  sweepSister(
    "bangcoins",
    "BangCoins",
    "https://bangcoins.com",
    "https://bangcoins.com"
  ),
  {
    slug: "acebet",
    name: "AceBet",
    tagline: "Reputable newer sweeps with 1 SC daily and instant redeems.",
    rating: 4.0,
    bonus: "1 SC daily login bonus",
    promoCode: "",
    homepageUrl: "https://acebet.cc",
    affiliateUrl: "https://acebet.cc/welcome/r/theturbokermit",
    available: "Available in most US states",
    highlights: [
      "1 SC daily",
      "Decent rakeback",
      "Instant redemptions",
    ],
    pros: [
      "1 SC daily",
      "Decent rakeback",
      "Instant redeems",
    ],
    cons: ["High playthrough requirements"],
    strategy: {
      edge:
        "AceBet is a newer site with a generous 1 SC per day login bonus — balance has to be zero to claim it. The playthrough requirements run high, so be aware before you commit, but it's a reputable casino with decent value just from the daily login.",
    },
  },
  {
    slug: "coin-wizard",
    name: "Coin Wizard",
    tagline: "Golden Hearts sister site with a strong welcome offer and 1x playthrough.",
    rating: 4.1,
    bonus: "$10 for 25 SC welcome offer + 2.5 SC free on signup",
    promoCode: "",
    homepageUrl: "https://www.coinwizardgames.com",
    affiliateUrl: "https://www.coinwizardgames.com/referral/WE2MKG9YIT",
    available: "Available in most US states",
    highlights: [
      "2.5 SC free on signup",
      "1x playthrough",
      "Generous daily login streak",
    ],
    pros: [
      "Strong welcome offer ($10 for 25 SC)",
      "1x playthrough",
      "Generous daily login streak",
    ],
    cons: ["No live games"],
    strategy: {
      edge:
        "Coin Wizard is a new Golden Hearts sister site. The welcome offer is strong — $10 for 25 SC at 1x playthrough plus 2.5 SC free on signup — and the daily login streak compounds nicely. No live games, but a clean enough catalog to clear playthrough on slots.",
    },
  },
  {
    slug: "golden-hearts",
    name: "Golden Hearts",
    tagline: "Long-running charity-focused sweeps with 1x playthrough and a strong daily streak.",
    rating: 4.1,
    bonus: "$10 for 25 SC welcome offer + 2.5 SC free on signup",
    promoCode: "",
    homepageUrl: "https://www.goldenheartsgames.com",
    affiliateUrl: "https://www.goldenheartsgames.com/referral/KJEB4FV61Z",
    available: "Available in most US states",
    highlights: [
      "2.5 SC free on signup",
      "1x playthrough",
      "Generous daily login streak",
    ],
    pros: [
      "Strong welcome offer ($10 for 25 SC)",
      "1x playthrough",
      "Generous daily login streak",
    ],
    cons: ["No live games"],
    strategy: {
      edge:
        "Golden Hearts shares the same operator backbone as Coin Wizard. Same strong $10-for-25-SC welcome at 1x playthrough, 2.5 SC free on signup, and a generous daily login streak. Easy account to keep active for the freebies.",
    },
  },
  {
    slug: "jackpotdaily",
    name: "JackpotDaily",
    tagline: "Strong welcome at 134 SC for $60, 30% daily purchase bonus, and great sales juice.",
    rating: 4.2,
    bonus: "$60 for 134 SC welcome offer",
    promoCode: "",
    homepageUrl: "https://www.jackpotdaily.com",
    affiliateUrl:
      "http://www.jackpotdaily.com/?affiliateCode=referral&referralCode=zrh9176",
    available: "Available in most US states",
    highlights: [
      "$60 for 134 SC welcome offer",
      "30% daily purchase bonus",
      "Decent daily login streak",
    ],
    pros: [
      "Strong welcome offer",
      "30% daily bonus",
      "Decent daily login streak",
    ],
    cons: ["Some unusual playthrough requirements"],
    strategy: {
      edge:
        "JackpotDaily has a strong welcome offer at 134 SC for $60, a 30% daily purchase bonus, and a decent daily login streak. The playthrough requirements can get unusual depending on the game — Rocket Dice XY has been our personal go-to. There's some great juice here, don't miss it.",
    },
  },
];

// Append new brands at the end of the list (C tier).
sites.push(...newBrands);

// ---------------- Save ----------------
fs.writeFileSync(file, JSON.stringify(sites, null, 2) + "\n");
console.log("Updated sites.json (" + sites.length + " total brands).");
