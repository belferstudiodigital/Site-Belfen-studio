"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** initial handle position, 0-100 */
  initial?: number;
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  beforeAlt = "Antes",
  afterAlt = "Depois",
  initial = 50,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const rawX = useMotionValue(initial);
  const x = useSpring(rawX, { stiffness: 260, damping: 32, mass: 0.4 });
  const left = useTransform(x, (v) => `${v}%`);
  const [clipPercent, setClipPercent] = useState(initial);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.min(100, Math.max(0, pct));
      rawX.set(clamped);
      setClipPercent(clamped);
    },
    [rawX],
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative w-full touch-none select-none overflow-hidden rounded-2xl",
        className,
      )}
      onPointerDown={(e) => {
        setDragging(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      {/* Depois (base layer, full) */}
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="pointer-events-none object-cover"
        />
        <span className="absolute right-4 top-4 rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
          {afterLabel}
        </span>

        {/* Antes (clipped layer, on top) */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - clipPercent}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="pointer-events-none object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
            {beforeLabel}
          </span>
        </div>

        {/* Handle */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/90"
          style={{ left }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 z-10 flex items-center"
          style={{ left: `calc(${clipPercent}% - 20px)` }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-foreground shadow-lg backdrop-blur transition-transform duration-150 group-active:scale-95">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 6-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
