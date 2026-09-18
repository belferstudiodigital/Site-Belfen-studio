"use client";

import { motion } from "motion/react";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
            Belfen Studio
          </p>
          <h1 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Projeto é a base.
            <br />O resto se{" "}
            <span className="italic">constrói</span>
            <br />
            sobre ela.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted">
            Projetos de edificações, interiores e estruturas. Da concepção ao
            detalhe, com consultoria e curadoria técnica.
          </p>
          <a
            href="#projetos"
            className="group mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-medium"
          >
            Conheça nossos projetos
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <BeforeAfterSlider
            beforeImage="/hero/antes.jpg"
            afterImage="/hero/depois.jpg"
            beforeLabel="Antes"
            afterLabel="Depois"
            beforeAlt="Obra em construção, antes do projeto Belfen"
            afterAlt="Fachada finalizada pelo projeto Belfen"
          />
          <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-foreground-muted">
            <span aria-hidden>←</span> Arraste para comparar o antes e o depois{" "}
            <span aria-hidden>→</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
