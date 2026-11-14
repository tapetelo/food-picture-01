// food-picture-01 — "Tonkotsu, lifted"
// The entry image sits beside this file as entry.png. It is a JPEG this
// time, not a PNG, and the rules tell the two apart by their first bytes
// while the name stays entry.png either way. All this program does is put
// an exact copy of that file at $MAKEFUN_OUTPUT_DIR/entry.png (or
// /output/entry.png when the variable is unset).
//
// The image is stored as a JPEG on purpose: the same picture as a PNG is
// over the gate's 1 MiB cap, while the JPEG is ~175 KB at 1024x683 and
// keeps every detail the judge weighs — gloss, steam, the yolk drip.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const folder = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(folder, "entry.png");
const bytes = readFileSync(sourcePath);

// A JPEG opens with FF D8 FF; a PNG with 89 50 4E 47 0D 0A 1A 0A.
// Anything else is not an image the gate accepts, so stop loudly.
const jpegMagic = Buffer.from([0xff, 0xd8, 0xff]);
const pngMagic = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
const kind = bytes.subarray(0, 3).equals(jpegMagic)
  ? "JPEG"
  : bytes.subarray(0, 8).equals(pngMagic)
    ? "PNG"
    : null;
if (kind === null) {
  throw new Error("entry.png is neither a JPEG nor a PNG file");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const targetPath = join(outDir, "entry.png");
copyFileSync(sourcePath, targetPath);

// Read the copy back and make sure it landed whole: same length as the
// source, and the same opening bytes, so a short or damaged copy fails
// here instead of reaching the gate.
const copied = readFileSync(targetPath);
if (
  copied.length !== bytes.length ||
  !copied.subarray(0, 8).equals(bytes.subarray(0, 8))
) {
  throw new Error(`short copy: ${targetPath} does not match entry.png`);
}
console.log(`wrote ${targetPath} (${kind}, ${bytes.length} bytes)`);
