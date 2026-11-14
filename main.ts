// food-picture-01 — "Tonkotsu, lifted"
//
// The picture for this entry lives next to this file as entry.png. It is a
// JPEG, not a PNG: the same picture as a PNG is over the gate's 1 MiB cap,
// while this JPEG is about 175 KB at 1024 by 683 and keeps everything the
// judge weighs — the gloss on the noodles, the steam, the yolk dripping
// from the halved egg. The rules tell a JPEG from a PNG by the first bytes
// while the file name stays entry.png either way.
//
// All this program does is carry that one file, byte for byte, to the
// output directory the grader gives it in MAKEFUN_OUTPUT_DIR (or /output
// when the variable is unset), after checking that what it carries is
// really a JPEG or a PNG and that the copy landed whole.

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

function beginsWith(bytes, prefix) {
  if (bytes.length < prefix.length) return false;
  for (let i = 0; i < prefix.length; i++) {
    if (bytes[i] !== prefix[i]) return false;
  }
  return true;
}

const here = path.dirname(fileURLToPath(import.meta.url));
const imagePath = path.join(here, "entry.png");
const imageBytes = fs.readFileSync(imagePath);

const jpegPrefix = [0xff, 0xd8, 0xff];
const pngPrefix = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

let flavour = null;
if (beginsWith(imageBytes, jpegPrefix)) flavour = "JPEG";
if (beginsWith(imageBytes, pngPrefix)) flavour = "PNG";
if (flavour === null) {
  throw new Error("entry.png is neither a JPEG nor a PNG file");
}

const outputFolder = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outputFolder, { recursive: true });

const destination = path.join(outputFolder, "entry.png");
fs.copyFileSync(imagePath, destination);

// Read the copy back and compare it with the source, length and opening
// bytes both, so a short or damaged copy fails loudly here instead of
// reaching the gate as a broken picture. The opening check compares the
// copy's first eight bytes against the source's first eight bytes.
const writtenBack = fs.readFileSync(destination);
const sameLength = writtenBack.length === imageBytes.length;
const sameOpening = beginsWith(writtenBack, [...imageBytes.subarray(0, 8)]);
if (!sameLength || !sameOpening) {
  throw new Error(`short copy: ${destination} does not match entry.png`);
}

console.log(`copied ${flavour} entry.png (${imageBytes.length} bytes) to ${destination}`);
