// Scans public/portfolio/<categoria>/* and writes data/portfolio-manifest.json
// Runs automatically before `dev` and `build` (see package.json scripts),
// so dropping images into the category folders is all that's needed —
// no manual wiring or classification step required.
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const portfolioDir = path.join(root, "public", "portfolio");
const outFile = path.join(root, "data", "portfolio-manifest.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function naturalSort(a, b) {
  return a.localeCompare(b, "pt-BR", { numeric: true, sensitivity: "base" });
}

if (!existsSync(portfolioDir)) {
  mkdirSync(portfolioDir, { recursive: true });
}

const manifest = {};
let total = 0;

for (const entry of readdirSync(portfolioDir)) {
  const full = path.join(portfolioDir, entry);
  if (!statSync(full).isDirectory()) continue;

  const files = readdirSync(full)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort(naturalSort);

  manifest[entry] = files.map((f) => `/portfolio/${entry}/${f}`);
  total += files.length;
}

mkdirSync(path.dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(manifest, null, 2) + "\n");

console.log(
  `[portfolio-manifest] ${Object.keys(manifest).length} categorias, ${total} imagens -> data/portfolio-manifest.json`,
);
