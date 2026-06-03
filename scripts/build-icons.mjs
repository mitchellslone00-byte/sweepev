import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const appDir = join(root, "app");

const evText = `<text x="256" y="350"
        text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-weight="900"
        font-size="260"
        fill="#0b0d12">EV</text>`;

const roundedSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect x="0" y="0" width="512" height="512" rx="72" ry="72" fill="#22c55e"/>
  ${evText}
</svg>`;

const squareSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect x="0" y="0" width="512" height="512" fill="#22c55e"/>
  ${evText}
</svg>`;

async function pngBuffer(svg, size) {
  return await sharp(Buffer.from(svg))
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();
}

await writeFile(join(appDir, "icon.png"), await pngBuffer(roundedSvg, 512));
await writeFile(join(appDir, "icon1.png"), await pngBuffer(roundedSvg, 192));
await writeFile(join(appDir, "apple-icon.png"), await pngBuffer(squareSvg, 180));

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => pngBuffer(roundedSvg, s)));

const headerSize = 6;
const entrySize = 16;
const dirSize = headerSize + entrySize * pngs.length;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);

const entries = Buffer.alloc(entrySize * pngs.length);
let offset = dirSize;
for (let i = 0; i < pngs.length; i++) {
  const size = sizes[i];
  const png = pngs[i];
  const e = i * entrySize;
  entries.writeUInt8(size === 256 ? 0 : size, e + 0);
  entries.writeUInt8(size === 256 ? 0 : size, e + 1);
  entries.writeUInt8(0, e + 2);
  entries.writeUInt8(0, e + 3);
  entries.writeUInt16LE(1, e + 4);
  entries.writeUInt16LE(32, e + 6);
  entries.writeUInt32LE(png.length, e + 8);
  entries.writeUInt32LE(offset, e + 12);
  offset += png.length;
}

const ico = Buffer.concat([header, entries, ...pngs]);
await writeFile(join(appDir, "favicon.ico"), ico);

console.log("wrote app/icon.png, app/icon1.png, app/apple-icon.png, app/favicon.ico");
