#!/usr/bin/env node
/**
 * Flags page titles and meta descriptions that Google would truncate.
 *
 * Titles are measured with the " · SweepEV" suffix the layout template appends,
 * because that is what actually renders and it is easy to forget: most of the
 * titles that were over the limit had been written by hand without counting it.
 *
 * Descriptions cover both hand-written ones in sites.json and the fallback
 * generated from tagline + bonus, since both have overflowed before.
 *
 * Run with `npm run check:meta`.
 */
const fs = require("fs");

const TITLE_LIMIT = 60;
const TITLE_SUFFIX = " · SweepEV".length;
const DESC_LIMIT = 160;
const DESC_SOFT_MIN = 70; // much shorter than this and we are wasting the slot

// Pre-launch pages still render a title and a description, so they are checked too.
const sites = JSON.parse(fs.readFileSync("data/sites.json", "utf8"));

const problems = [];
const titleCounts = new Map();

for (const s of sites) {
  // ---- title ----
  const titleCustom = Boolean(s.seoTitle || s.reviewTitle);
  const title = s.seoTitle ?? s.reviewTitle ?? `${s.name} Review, Bonus, Promo Code & Payouts`;
  const rendered = title.length + TITLE_SUFFIX;
  if (rendered > TITLE_LIMIT) {
    problems.push([s.slug, rendered, titleCustom ? "hand-written" : "generated", "title too long"]);
  }
  if (!/20\d\d/.test(title)) {
    problems.push([s.slug, rendered, titleCustom ? "hand-written" : "generated", "title has no year"]);
  }
  const hook = title.replace(/^[^:]+:\s*/, "");
  titleCounts.set(hook, (titleCounts.get(hook) ?? 0) + 1);

  // ---- description ----
  const descCustom = Boolean(s.metaDescription);
  const desc = s.metaDescription ?? `${s.name} review: ${s.tagline} ${s.bonus}.`;
  if (desc.length > DESC_LIMIT) {
    problems.push([s.slug, desc.length, descCustom ? "hand-written" : "generated", "description too long"]);
  } else if (desc.length < DESC_SOFT_MIN) {
    problems.push([s.slug, desc.length, descCustom ? "hand-written" : "generated", "description very short"]);
  }
}

// A hook shared by several pages gives Google nothing to tell them apart.
const duplicated = [...titleCounts.entries()].filter(([, n]) => n >= 4);

if (!problems.length && !duplicated.length) {
  console.log(
    `All ${sites.length} titles (<=${TITLE_LIMIT} rendered) and descriptions (${DESC_SOFT_MIN}-${DESC_LIMIT}) look fine.`
  );
  process.exit(0);
}

if (problems.length) {
  console.log(`${problems.length} issue(s):`);
  for (const [slug, len, kind, why] of problems) {
    console.log(`  ${String(len).padStart(4)}  ${why.padEnd(22)} ${kind.padEnd(12)} ${slug}`);
  }
}

if (duplicated.length) {
  console.log(`\n${duplicated.length} title hook(s) shared by 4+ pages:`);
  for (const [hook, n] of duplicated) console.log(`  ${String(n).padStart(3)}x  ${hook}`);
}

// Informational. Never fail a build over a title or a description.
process.exit(0);
