export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <span className="font-serif text-xl italic tracking-tight">
            Belfen Studio
          </span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground-muted">
            Projeto é a base. O resto se constrói sobre ela.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-sm text-foreground-muted sm:flex-row sm:items-center sm:gap-8">
          <a
            href="https://wa.me/5515999999999"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            WhatsApp
          </a>
          <a
            href="https://instagram.com/belfenstudio"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            @belfenstudio
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-line px-4 pt-6 text-xs text-foreground-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>© {year} Belfen Studio. Todos os direitos reservados.</span>
        <a href="#top" className="transition-colors hover:text-foreground">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}
