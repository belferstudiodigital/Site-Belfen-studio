# Belfen Studio — site

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion (Framer Motion).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

- `app/` — rotas do App Router (`layout.tsx`, `page.tsx`, `globals.css`).
- `components/ui/` — componentes reutilizáveis "estilo shadcn":
  - `before-after-slider.tsx` — slider antes/depois usado na Hero.
  - `stack-spread.tsx` — o "stack" de projetos que se espalha ao rolar
    (seção Projetos).
  - `parallax-scroll.tsx` — grade com efeito parallax, usada dentro de
    cada categoria do Portfólio.
  - `button.tsx` — botão base.
- `components/sections/` — as seções da landing page (Header, Hero, About,
  ProjectsStack, Portfolio, Contact, Footer).
- `data/categories.ts` — as 5 categorias do portfólio.
- `data/portfolio.ts` — leitura do manifesto de imagens gerado
  automaticamente (ver abaixo).
- `public/portfolio/<categoria>/` — onde ficam as imagens reais.
- `public/hero/` — as duas imagens do comparador antes/depois da Hero.

## Imagens do portfólio (164 fotos, 5 categorias)

**Veja [`PORTFOLIO.md`](./PORTFOLIO.md)** — é só derrubar as fotos dentro das
pastas de `public/portfolio/<categoria>/`, sem precisar tocar em código. Um
script varre as pastas automaticamente (antes de `dev`/`build`) e gera
`data/portfolio-manifest.json`.

## Antes de publicar

- Troque o número de WhatsApp de exemplo em `components/sections/contact.tsx`
  e `components/sections/footer.tsx`.
- Confira o `metadata` (title/description) em `app/layout.tsx`.
- Substitua as imagens de placeholder em `public/hero/` e
  `public/portfolio/*` pelas reais.

## Deploy

Funciona bem na [Vercel](https://vercel.com/new) (plataforma dos criadores do
Next.js) — basta importar o repositório e o build (`npm run build`) já roda
o script de manifesto automaticamente via `prebuild`.
