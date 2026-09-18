"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Projeto com método.",
    text: "Cada etapa segue um processo claro, do briefing ao detalhamento executivo.",
  },
  {
    n: "02",
    title: "Estudo e viabilidade técnica.",
    text: "Análise de terreno, estrutura e normas antes de qualquer decisão de projeto.",
  },
  {
    n: "03",
    title: "Consultoria e curadoria.",
    text: "Acompanhamento próximo, com curadoria de materiais e acabamentos.",
  },
];

export function About() {
  return (
    <section id="sobre" className="border-y border-line bg-background-alt py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
              Sobre o studio
            </p>
            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
              Antes da obra,
              <br />
              uma boa base.
            </h2>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-serif text-xl italic leading-snug sm:text-2xl">
              A solidez da Belfen, aplicada à concepção.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground-muted sm:text-base">
              O Studio conecta intenção, espaço e viabilidade. Desenvolvemos
              projetos com decisões técnicas consistentes e cuidado com o
              conjunto — do primeiro estudo ao detalhe que orienta a execução.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-line pt-10 sm:mt-20 sm:gap-16 sm:pt-12 lg:grid-cols-4">
          <Stat value="50+" label="projetos desde 2021" />
          <Stat value="18+" label="anos de experiência na construção civil" />
          <Stat value="500+" label="ambientes projetados" />
          <Stat value="5" label="frentes de atuação especializadas" />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:mt-20 sm:grid-cols-3 sm:gap-8 sm:pt-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="text-xs text-foreground-muted">{step.n}</span>
              <h4 className="mt-3 font-serif text-lg leading-snug">
                {step.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl sm:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-foreground-muted sm:text-sm">{label}</p>
    </div>
  );
}
