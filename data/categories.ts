export interface PortfolioCategory {
  /** folder name inside /public/portfolio and the manifest key */
  slug: string;
  /** label shown in the UI */
  label: string;
  /** short description shown under the label */
  description: string;
}

// The slug is exactly the folder name Belem should use inside the .zip,
// e.g. public/portfolio/interiores-residenciais/*.jpg
export const CATEGORIES: PortfolioCategory[] = [
  {
    slug: "interiores-residenciais",
    label: "Interiores residenciais",
    description: "Ambientes internos de projetos residenciais",
  },
  {
    slug: "fachadas-residenciais",
    label: "Fachadas residenciais",
    description: "Fachadas de casas e sobrados",
  },
  {
    slug: "fachadas-comerciais",
    label: "Fachadas comerciais",
    description: "Fachadas de lojas, showrooms e edifícios comerciais",
  },
  {
    slug: "exteriores",
    label: "Exteriores",
    description: "Paisagismo, áreas externas e integração com o entorno",
  },
  {
    slug: "interiores-comerciais",
    label: "Interiores comerciais",
    description: "Ambientes internos de projetos comerciais",
  },
];
