import type { MetadataRoute } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { sites } from "@/lib/sites";
import { siteConfig } from "@/lib/site-config";

type ChangeFreq = "daily" | "weekly" | "monthly";

function isRouteGroup(name: string) {
  return name.startsWith("(") && name.endsWith(")");
}

function isDynamic(name: string) {
  return name.startsWith("[") && name.endsWith("]");
}

async function hasPage(dir: string) {
  for (const ext of ["tsx", "ts", "jsx", "js"]) {
    try {
      await fs.access(path.join(dir, `page.${ext}`));
      return true;
    } catch {}
  }
  return false;
}

async function walkApp(dir: string, urlParts: string[], out: string[]) {
  const base = path.basename(dir);

  if (base.startsWith(".") || base.startsWith("_")) return;
  if (urlParts[0] === "api") return;
  if (urlParts[0] === "go") return;
  if (urlParts[0] === "guides") return;
  if (isDynamic(base)) return;

  if (await hasPage(dir)) {
    out.push(urlParts.length ? "/" + urlParts.join("/") : "");
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    if (e.name === "node_modules") continue;
    if (e.name.startsWith(".") || e.name.startsWith("_")) continue;

    const nextParts = isRouteGroup(e.name) ? urlParts : [...urlParts, e.name];
    await walkApp(path.join(dir, e.name), nextParts, out);
  }
}

function rulesFor(pathname: string): { priority: number; changeFrequency: ChangeFreq } {
  if (pathname === "") return { priority: 1.0, changeFrequency: "weekly" };
  if (pathname === "/daily-sc") return { priority: 0.9, changeFrequency: "weekly" };
  if (pathname.startsWith("/sites/")) return { priority: 0.8, changeFrequency: "weekly" };
  if (pathname.startsWith("/states/")) return { priority: 0.8, changeFrequency: "monthly" };
  return { priority: 0.6, changeFrequency: "monthly" };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");
  const staticPaths: string[] = [];
  await walkApp(appDir, [], staticPaths);

  const sitePaths = sites.map((s) => `/sites/${s.slug}`);

  const all = Array.from(new Set([...staticPaths, ...sitePaths])).sort();
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return all.map((p) => {
    const r = rulesFor(p);
    return {
      url: base + (p === "" ? "/" : p),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
  });
}
