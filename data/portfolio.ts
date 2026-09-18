import manifest from "./portfolio-manifest.json";
import { CATEGORIES, type PortfolioCategory } from "./categories";

export type PortfolioManifest = Record<string, string[]>;

const typedManifest = manifest as PortfolioManifest;

export interface PortfolioCategoryWithImages extends PortfolioCategory {
  images: string[];
}

/** Categories merged with the images found on disk for each one. */
export function getCategoriesWithImages(): PortfolioCategoryWithImages[] {
  return CATEGORIES.map((category) => ({
    ...category,
    images: typedManifest[category.slug] ?? [],
  }));
}

export function getImagesForCategory(slug: string): string[] {
  return typedManifest[slug] ?? [];
}

export function getAllImages(): string[] {
  return Object.values(typedManifest).flat();
}

/** Deterministic-ish shuffle (no external deps) used for the "projetos aleatórios" stack. */
export function pickRandomImages(count: number): string[] {
  const all = getAllImages();
  const pool = [...all];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

export const totalImageCount = getAllImages().length;
