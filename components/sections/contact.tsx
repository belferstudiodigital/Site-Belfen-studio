"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const PROJECT_TYPES = [
  "Residencial",
  "Comercial",
  "Interiores",
  "Reforma",
  "Consultoria técnica",
];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");

  const whatsappNumber = "5515997917950";
  const message = encodeURIComponent(
    `Olá! Meu nome é ${name || "___"}. Tenho interesse em um projeto do tipo "${
      type || "___"
    }" e gostaria de conversar com a Belfen Studio.`,
  );
  const href = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section id="contato" className="border-t border-line bg-background-alt py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
            Contato
          </p>
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl">
            Seu projeto.
            <br />
            Uma base sólida.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground-muted sm:text-base">
            Cada projeto tem escopo e investimento próprios. Conte o que você
            tem em mente. O próximo passo é entender as necessidades e definir
            o caminho técnico.
          </p>
          <a href={href} target="_blank" rel="noreferrer">
            <Button className="mt-8">Falar com a Belfen Studio</Button>
          </a>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(href, "_blank");
          }}
        >
          <Field label="Nome">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/50"
            />
          </Field>

          <Field label="WhatsApp com DDD">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="(15) 99999-9999"
              className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/50"
            />
          </Field>

          <Field label="Tipo de projeto">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full rounded-lg border border-line bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground/50"
            >
              <option value="">Selecione</option>
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Button type="submit" className="mt-2 w-full">
            Continuar no WhatsApp →
          </Button>
          <p className="text-center text-xs text-foreground-muted">
            Você poderá revisar e confirmar o envio da mensagem dentro do
            WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-xs font-medium uppercase tracking-wide text-foreground-muted">
      {label}
      {children}
    </label>
  );
}
