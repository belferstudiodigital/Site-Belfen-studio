"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ParallaxScrollProps {
  images: string[];
  className?: string;
  /** fixed scroll height of the grid container, e.g. "40rem" */
  height?: string;
}

export function ParallaxScroll({
  images,
  className,
  height = "44rem",
}: ParallaxScrollProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateYFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXFirst = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateFirst = useTransform(scrollYProgress, [0, 1], [0, -8]);

  const translateYThird = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateXThird = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotateThird = useTransform(scrollYProgress, [0, 1], [0, 8]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div
      ref={gridRef}
      className={cn("no-scrollbar w-full items-start overflow-y-auto", className)}
      style={{ height }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 px-4 py-12 sm:grid-cols-2 sm:gap-8 sm:px-6 lg:grid-cols-3 lg:gap-10">
        <div className="grid gap-6 sm:gap-8 lg:gap-10">
          {firstPart.map((src, idx) => (
            <motion.div
              key={"grid-1" + idx}
              style={{ y: translateYFirst, x: translateXFirst, rotate: rotateFirst }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background-strong"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-6 sm:gap-8 lg:gap-10">
          {secondPart.map((src, idx) => (
            <div
              key={"grid-2" + idx}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background-strong"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-6 sm:gap-8 lg:gap-10">
          {thirdPart.map((src, idx) => (
            <motion.div
              key={"grid-3" + idx}
              style={{ y: translateYThird, x: translateXThird, rotate: rotateThird }}
              className="relative aspect-[3/4] overflow-hidden rounded-xl bg-background-strong"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
