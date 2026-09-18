"use client";

import StackSpread, { type StackSpreadItem } from "@/components/ui/stack-spread";

export function ProjectsScatterClient({
  images,
  subtitle,
}: {
  images: StackSpreadItem[];
  subtitle: string;
}) {
  return (
    <div id="projetos">
      <StackSpread
        images={images}
        title="Projetos"
        subtitle={subtitle}
        ctaLabel="Portfólio"
        onCtaClick={() => {
          document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
