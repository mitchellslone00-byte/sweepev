#!/usr/bin/env node
/**
 * Flags meta descriptions that Google would truncate.
 *
 * Covers hand-written ones in sites.json and the fallback generated from
 * tagline + bonus, since both have overflowed before. Run with
 * `npm run check:meta`.
 */
const fs = require("fs");

const LIMIT = 160;
const SOFT_MIN = 70; // much shorter than this and we are wasting the slot

const sites = JSON.parse(fs.readFileSync("data/sites.json", "utf8")).filter((s) => !s.comingSoon);

const problems = [];
for (const s of sites) {
  const custom = Boolean(s.metaDescription);
  const text = s.metaDescription ?? `${s.name} review: ${s.tagline} ${s.bonus}.`;
  if (text.length > LIMIT) {
    problems.push([s.slug, text.length, custom ? "hand-written" : "generated", "too long"]);
  } else if (text.length < SOFT_MIN) {
    problems.push([s.slug, text.length, custom ? "hand-written" : "generated", "very short"]);
  }
}

if (!problems.length) {
  console.log(`All ${sites.length} meta descriptions are within ${SOFT_MIN}-${LIMIT} characters.`);
  process.exit(0);
}

console.log(`${problems.length} meta description(s) need attention (limit ${LIMIT}):`);
for (const [slug, len, kind, why] of problems) {
  console.log(`  ${String(len).padStart(4)}  ${why.padEnd(10)} ${kind.padEnd(12)} ${slug}`);
}
// Informational. Never fail a build over a description.
process.exit(0);
