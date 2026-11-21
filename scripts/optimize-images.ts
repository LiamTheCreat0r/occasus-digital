/**
 * One-off image pipeline: converts the source PNGs in app/assets/images
 * into web-sized WebP files in app/assets/img (committed).
 * Run with: node scripts/optimize-images.ts
 */
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";

const SRC = "app/assets/images";
const OUT = "app/assets/img";

// folder -> max width
const jobs: Record<string, number> = {
  logos: 1200,
  cartridges: 800,
  "game-covers": 1920,
  "game-screenshots": 1600,
};

for (const [folder, width] of Object.entries(jobs)) {
  const outDir = join(OUT, folder);
  await mkdir(outDir, { recursive: true });
  for (const file of await readdir(join(SRC, folder))) {
    if (!file.endsWith(".png")) continue;
    const out = join(outDir, `${parse(file).name}.webp`);
    await sharp(join(SRC, folder, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    console.log("→", out);
  }
}
