import { imageSize } from "image-size";
import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, { width: number; height: number } | null>();

/**
 * Intrinsic dimensions of an image living in /public, read at build time so we can
 * set width/height on plain <img> tags and reserve layout space (prevents CLS).
 * Returns null when the file is missing or unreadable, so callers omit the attrs.
 */
export function imgSize(publicPath: string): { width: number; height: number } | null {
  if (cache.has(publicPath)) return cache.get(publicPath)!;
  let dims: { width: number; height: number } | null = null;
  try {
    const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const { width, height } = imageSize(fs.readFileSync(file));
    if (width && height) dims = { width, height };
  } catch {
    dims = null;
  }
  cache.set(publicPath, dims);
  return dims;
}
