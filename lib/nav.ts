export type NavItem = { label: string; href: string };

/**
 * Shared by the desktop header and the mobile menu. They used to keep separate
 * copies, which is how /card-rips ended up reachable on desktop and invisible on
 * mobile. One source, both menus.
 */

/** List pages, all answering "which site is best for X". */
export const RANKINGS: NavItem[] = [
  { label: "Fastest Payouts", href: "/fastest-payouts" },
  { label: "Compare Casinos", href: "/compare" },
];

/**
 * Card rips sits at top level rather than inside Rankings. It is a separate
 * vertical from the casinos and the one we are actively pushing, so it gets the
 * slot that burying it in a dropdown was costing it.
 */
export const CARD_RIPS: NavItem = { label: "Card Rips", href: "/card-rips" };

export const GUIDES: NavItem[] = [
  { label: "General", href: "/guides" },
  { label: "AMOE", href: "/guides/amoe" },
  { label: "Pulsz & Pulsz Bingo", href: "/guides/pulsz" },
  { label: "CrownCoins", href: "/guides/crown-coins" },
  { label: "LuckyLand Casino", href: "/guides/luckyland" },
  { label: "ReBet / Dogg House", href: "/guides/rebet" },
];

/** Kept at top level in both menus: the biggest entry point on the site. */
export const DAILY_SC: NavItem = { label: "Free Daily SC", href: "/daily-sc" };

export const STANDALONE: NavItem[] = [
  { label: "Where Legal", href: "/where-legal" },
  { label: "Calculate EV", href: "/tools/ev-calculator" },
];

export const DISCORD_URL = "https://discord.gg/A62yrjBPZN";
