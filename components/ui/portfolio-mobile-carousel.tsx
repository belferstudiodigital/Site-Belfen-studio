"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PortfolioMobileCarouselProps {
  images: string[];
  className?: string;
}

export function PortfolioMobileCarousel({
  images,
  className,
}: PortfolioMobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-carousel-card]"),
    );
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          const index = cards.indexOf(mostVisible.target as HTMLElement);
          if (index !== -1) setActiveIndex(index);
        }
      },
      { root: track, threshold: [0.5, 0.75, 0.9] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [images]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-px-5 gap-4 px-5 pb-1 pt-5"
      >
        {images.map((src, i) => (
          <div
            key={i}
            data-carousel-card
            className="relative aspect-[3/4] w-[78vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-xl bg-background-strong"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="80vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* edge fades to hint there's more content off-screen */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background-alt to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background-alt to-transparent" />

      <div className="mt-3 flex items-center justify-center gap-1.5 px-5">
        {images.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-4 bg-foreground"
                : "w-1 bg-foreground/25",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default PortfolioMobileCarousel;
