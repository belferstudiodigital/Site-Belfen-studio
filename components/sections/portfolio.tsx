"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { getCategoriesWithImages } from "@/data/portfolio";

export function Portfolio() {
  const categories = getCategoriesWithImages();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = categories.find((c) => c.slug === activeSlug) ?? null;

  return (
    <section id="portfolio" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
              Portfólio
            </p>
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Espaços com intenção.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground-muted sm:text-right">
            {active
              ? active.description
              : "Selecione uma categoria para ver os projetos."}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {categories.map((category) => {
            const isActive = category.slug === activeSlug;
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() =>
                  setActiveSlug((current) =>
                    current === category.slug ? null : category.slug,
                  )
                }
                className={`group relative flex flex-col items-start gap-3 rounded-2xl border px-5 py-6 text-left transition-colors duration-200 ${
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-line bg-background-alt hover:border-foreground/40"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-60">
                  {category.images.length.toString().padStart(2, "0")}{" "}
                  projeto{category.images.length === 1 ? "" : "s"}
                </span>
                <span className="font-serif text-base leading-snug sm:text-lg">
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 overflow-hidden rounded-3xl border border-line bg-background-alt"
            >
              {active.images.length > 0 ? (
                <ParallaxScroll images={active.images} />
              ) : (
                <div className="flex h-40 items-center justify-center px-6 text-center text-sm text-foreground-muted">
                  Nenhuma imagem em{" "}
                  <code className="mx-1 rounded bg-background px-1.5 py-0.5">
                    public/portfolio/{active.slug}
                  </code>{" "}
                  ainda.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
