import StackSpread from "@/components/ui/stack-spread";
import { pickRandomImages, totalImageCount } from "@/data/portfolio";
import { ProjectsScatterClient } from "./projects-stack-client";

/** Server component: picks the random sample of images at request/build time. */
export function ProjectsStack() {
  const images = pickRandomImages(8).map((src) => ({ src, alt: "Projeto Belfen Studio" }));

  return (
    <ProjectsScatterClient
      images={images}
      subtitle={
        totalImageCount > 8
          ? "Uma seleção aleatória de projetos do nosso portfólio."
          : "Envie as imagens do portfólio para popular esta seção automaticamente."
      }
    />
  );
}

export { StackSpread };
