"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "Projetos", href: "#projetos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex items-center gap-2">
          <span className="font-serif text-xl italic tracking-tight">
            Belfen
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground-muted">
            Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button
          className="hidden sm:inline-flex"
          onClick={() => {
            document.querySelector("#contato")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Falar com a gente
        </Button>

        <a
          href="#contato"
          className="inline-flex sm:hidden rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground"
        >
          Contato
        </a>
      </div>
    </header>
  );
}
