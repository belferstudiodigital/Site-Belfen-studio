import type { Metadata } from "next";
// Self-hosted fonts (no runtime dependency on Google Fonts' network).
import "@fontsource/fraunces/300.css";
import "@fontsource/fraunces/300-italic.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Belfen Studio — Projeto é a base",
  description:
    "Projetos de edificações, interiores e estruturas. Da concepção ao detalhe, com consultoria e curadoria técnica.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
