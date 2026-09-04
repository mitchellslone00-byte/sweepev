#!/usr/bin/env node
/**
 * Stamps `updatedAt` (and `publishedAt` for brand-new entries) on any casino whose
 * data changed since HEAD, so the "Last updated" line on a review and its Review
 * schema dateModified always reflect when the content actually changed.
 *
 * Run automatically by the pre-commit hook, or manually with `npm run stamp`.
 * Never throws in a way that would block a commit.
 */
const fs = require("fs");
const { execSync } = require("child_process");

const FILE = "data/sites.json";

// Local date (not UTC) so the stamp matches the day you actually worked.
function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Compare a site ignoring the stamp fields themselves, so re-stamping is idempotent. */
function contentOf(site) {
  const { updatedAt, ...rest } = site;
  return JSON.stringify(rest);
}

function main() {
  if (!fs.existsSync(FILE)) return;

  let headSites = null;
  try {
    headSites = JSON.parse(execSync(`git show HEAD:${FILE}`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }));
  } catch {
    // No HEAD version (first commit, or file is new). Nothing to diff against.
    return;
  }

  const current = JSON.parse(fs.readFileSync(FILE, "utf8"));
  const headBySlug = new Map(headSites.map((s) => [s.slug, s]));
  const stamp = today();
  const changed = [];
  const added = [];

  for (const site of current) {
    const prev = headBySlug.get(site.slug);
    if (!prev) {
      // Brand-new review: it is published today unless a date was set by hand.
      if (!site.publishedAt) {
        site.publishedAt = stamp;
        added.push(site.slug);
      }
      continue;
    }
    if (contentOf(site) !== contentOf(prev) && site.updatedAt !== stamp) {
      site.updatedAt = stamp;
      changed.push(site.slug);
    }
  }

  if (changed.length || added.length) {
    fs.writeFileSync(FILE, JSON.stringify(current, null, 2) + "\n");
    if (added.length) console.log(`stamped publishedAt=${stamp}: ${added.join(", ")}`);
    if (changed.length) console.log(`stamped updatedAt=${stamp}: ${changed.join(", ")}`);
  } else {
    console.log("no casino data changed, nothing to stamp");
  }
}

try {
  main();
} catch (err) {
  // Never block a commit over a stamping failure.
  console.error("stamp-updated skipped:", err.message);
}
