# Como adicionar as imagens do portfólio

O site lê as imagens **direto das pastas** — você não precisa editar nenhum
código nem classificar nada na hora de montar.

## 1. Estrutura de pastas esperada

Dentro de `public/portfolio/`, existem 5 pastas (uma por categoria):

```
public/portfolio/
├── interiores-residenciais/
├── fachadas-residenciais/
├── fachadas-comerciais/
├── exteriores/
└── interiores-comerciais/
```

Cada uma já contém 1-2 imagens de placeholder (para o site não ficar vazio
antes de você mandar as fotos reais).

## 2. O que fazer com o seu .zip

1. Apague os arquivos `placeholder-*.jpg` de cada pasta.
2. Coloque as fotos de cada categoria dentro da pasta correspondente,
   usando esses **nomes de pasta exatos** (são eles que o site usa para
   montar os botões de categoria e os grupos de imagens).
3. Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
4. Não precisa renomear os arquivos individualmente — qualquer nome funciona,
   a ordem exibida segue a ordem alfabética/numérica do nome do arquivo
   (então `01-fachada.jpg`, `02-fachada.jpg`... se você quiser controlar a
   ordem).

## 3. Gerando o "índice" das imagens

Sempre que você roda `npm run dev` ou `npm run build`, um script
(`scripts/generate-portfolio-manifest.mjs`) varre essas 5 pastas
automaticamente e gera `data/portfolio-manifest.json` — é esse arquivo que
alimenta:

- a seção **Portfólio** (grade com parallax, por categoria);
- a seção **Projetos** no topo (o "stack" de imagens que se espalha ao
  rolar a página) — ela sorteia 8 imagens aleatórias entre *todas* as
  categorias.

Se quiser rodar manualmente sem subir o servidor:

```bash
npm run portfolio:manifest
```

## 4. Coisas para ajustar depois de colocar as imagens reais

- `components/sections/contact.tsx` e `components/sections/footer.tsx`:
  troque o número de WhatsApp de exemplo (`5515999999999`) pelo real, e o
  `@belfenstudio` do Instagram se for diferente.
- `app/layout.tsx`: ajuste o `title`/`description` (metadata/SEO) se quiser.
- Se alguma categoria tiver muitas imagens (30+), tudo bem — o grid com
  parallax já tem scroll interno.
