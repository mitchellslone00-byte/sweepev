#!/usr/bin/env node
/**
 * Stamps last-updated dates so the visible "Last updated" line (and the Review
 * schema's dateModified) always reflects when content actually changed.
 *
 *   - Reviews: data/sites.json -> per-casino `updatedAt`, plus `publishedAt` for new entries
 *   - Guides:  app/guides/**\/page.tsx -> data/guide-dates.json entry for that route
 *
 * Run automatically by .githooks/pre-commit, or manually with `npm run stamp`.
 * Never throws in a way that would block a commit.
 */
const fs = require("fs");
const { execSync } = require("child_process");

const SITES = "data/sites.json";
const GUIDE_DATES = "data/guide-dates.json";

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function git(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] });
}

/** Ignore the stamp field itself so re-running is idempotent. */
function contentOf(site) {
  const { updatedAt, ...rest } = site;
  return JSON.stringify(rest);
}

/** Guide slugs served by the dynamic app/guides/[slug] route. */
function guideSlugs() {
  try {
    const src = fs.readFileSync("lib/guides.ts", "utf8");
    const m = src.match(/GUIDE_SLUGS\s*=\s*\[([^\]]*)\]/);
    if (!m) return [];
    return [...m[1].matchAll(/"([^"]+)"|'([^']+)'/g)].map((x) => x[1] || x[2]);
  } catch {
    return [];
  }
}

/** app/guides/x/page.tsx -> ["/guides/x"];  the [slug] template -> one route per slug. */
function routesForGuideFile(file) {
  const m = file.match(/^app\/guides\/(.*)page\.tsx$/);
  if (!m) return [];
  const mid = m[1].replace(/\/$/, "");
  if (mid === "") return ["/guides"];
  if (mid === "[slug]") return guideSlugs().map((s) => `/guides/${s}`);
  return [`/guides/${mid}`];
}

function stampReviews(stamp) {
  if (!fs.existsSync(SITES)) return;
  let head;
  try {
    head = JSON.parse(git(`git show HEAD:${SITES}`));
  } catch {
    return; // no HEAD version to diff against
  }
  const current = JSON.parse(fs.readFileSync(SITES, "utf8"));
  const bySlug = new Map(head.map((s) => [s.slug, s]));
  const changed = [];
  const added = [];

  for (const site of current) {
    const prev = bySlug.get(site.slug);
    if (!prev) {
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
    fs.writeFileSync(SITES, JSON.stringify(current, null, 2) + "\n");
    if (added.length) console.log(`stamped publishedAt=${stamp}: ${added.join(", ")}`);
    if (changed.length) console.log(`stamped updatedAt=${stamp}: ${changed.join(", ")}`);
  }
  return changed.length + added.length;
}

function stampGuides(stamp) {
  if (!fs.existsSync(GUIDE_DATES)) return 0;
  let files = [];
  try {
    files = git("git diff --name-only HEAD -- app/guides").split("\n").map((s) => s.trim()).filter(Boolean);
  } catch {
    return 0;
  }
  const routes = new Set(files.flatMap(routesForGuideFile));
  if (!routes.size) return 0;

  const dates = JSON.parse(fs.readFileSync(GUIDE_DATES, "utf8"));
  const stamped = [];
  for (const route of routes) {
    const entry = dates[route] || (dates[route] = { publishedAt: stamp });
    if (entry.updatedAt !== stamp) {
      entry.updatedAt = stamp;
      stamped.push(route);
    }
  }
  if (stamped.length) {
    fs.writeFileSync(GUIDE_DATES, JSON.stringify(dates, null, 2) + "\n");
    console.log(`stamped guide updatedAt=${stamp}: ${stamped.join(", ")}`);
  }
  return stamped.length;
}

try {
  const stamp = today();
  const n = (stampReviews(stamp) || 0) + (stampGuides(stamp) || 0);
  if (!n) console.log("no review or guide content changed, nothing to stamp");
} catch (err) {
  console.error("stamp-updated skipped:", err.message);
}
