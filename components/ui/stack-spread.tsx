"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Card layout — 8 slots in a scattered cluster. Images are supplied by the
// consumer (random projects from the portfolio manifest); this file only
// owns the geometry.
// ---------------------------------------------------------------------------

export interface StackSpreadItem {
  src: string;
  alt?: string;
}

interface CardLayout {
  stackOffset: { x: number; y: number };
  stackRotate: number;
  target: { x: number; y: number; rotate: number; scale: number; w: number; h: number };
  targetSm: { x: number; y: number };
  z: number;
}

const LAYOUT: CardLayout[] = [
  {
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: 0.7, w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: 0.9, w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: 0.9, w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: 0.8, w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: 0.8, w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: 0.9, w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: 0.8, w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: 0.7, w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

const SCATTER_START = 0.12;
const SCATTER_END = 0.86;
const PARALLAX_X = 2.6;
const PARALLAX_Y = 2.2;
const PARALLAX_SPRING = { stiffness: 90, damping: 22, mass: 0.6 };
const parallaxDepth = (i: number, total: number) =>
  total <= 1 ? 1 : 0.55 + (i / (total - 1)) * 0.75;

const RESPONSIVE = {
  desktop: { scale: null as number | null, small: false, colX: null as number | null, card: null as { w: number; h: number } | null },
  small: { scale: 0.72, small: true, colX: 22, card: { w: 40, h: 20 } },
};

function useResponsive() {
  const [r, setR] = useState(RESPONSIVE.desktop);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const read = () => setR(mq.matches ? RESPONSIVE.small : RESPONSIVE.desktop);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return r;
}

function usePointerParallax(active: boolean, enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, PARALLAX_SPRING);
  const y = useSpring(rawY, PARALLAX_SPRING);

  useEffect(() => {
    if (!enabled) return;
    if (!active) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (event: PointerEvent) => {
      rawX.set((event.clientX / window.innerWidth) * 2 - 1);
      rawY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [active, enabled, rawX, rawY]);

  return { x, y };
}

function Card({
  item,
  layout,
  progress,
  reduce,
  clusterRotation,
  scaleMul,
  isSmall,
  colX,
  fixedCard,
  stackScale,
  cardRadius,
  pointer,
  depth,
}: {
  item: StackSpreadItem;
  layout: CardLayout;
  progress: MotionValue<number>;
  reduce: boolean | null;
  clusterRotation: boolean;
  scaleMul: number | null;
  isSmall: boolean;
  colX: number | null;
  fixedCard: { w: number; h: number } | null;
  stackScale: number;
  cardRadius: number;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  depth: number;
}) {
  const { target } = layout;
  const flat = reduce === true;
  const stackRotate = flat ? 0 : clusterRotation ? layout.stackRotate : 0;
  const stackOffset = layout.stackOffset;
  const restScale = scaleMul ?? target.scale;

  const sm = isSmall ? layout.targetSm : null;
  const endX = sm ? (colX != null ? Math.sign(sm.x) * colX : sm.x) : target.x;
  const endY = sm ? sm.y : target.y;
  const endRotate = flat || isSmall ? 0 : target.rotate;

  const translate = useTransform(
    [progress, pointer.x, pointer.y],
    ([p, px, py]: number[]) => {
      const tx = stackOffset.x + (endX - stackOffset.x) * p;
      const ty = stackOffset.y + (endY - stackOffset.y) * p;
      const drift = depth * p;
      const dx = tx - px * PARALLAX_X * drift;
      const dy = ty - py * PARALLAX_Y * drift;
      return `calc(-50% + ${dx}vw) calc(-50% + ${dy}vh)`;
    },
  );
  const rotate = useTransform(progress, [0, 1], [stackRotate, endRotate]);
  const scale = useTransform(progress, [0, 1], [stackScale, restScale]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        width: `${fixedCard ? fixedCard.w : target.w}vw`,
        height: `${fixedCard ? fixedCard.h : target.h}vh`,
        zIndex: layout.z,
        translate,
        rotate,
        scale,
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden max-md:rounded-[4vw]"
        style={{ borderRadius: `${cardRadius}px` }}
      >
        <Image
          src={item.src}
          alt={item.alt ?? ""}
          fill
          draggable={false}
          sizes="30vw"
          className="pointer-events-none object-cover"
        />
      </div>
    </motion.div>
  );
}

export interface StackSpreadProps {
  images: StackSpreadItem[];
  title?: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  scrollLength?: number;
  bgColor?: string;
  clusterRotation?: boolean;
  stackScale?: number;
  cardRadius?: number;
  textColor?: string;
  textFadeStart?: number;
  showScrollHint?: boolean;
}

export default function StackSpread({
  images,
  title = "Projetos",
  subtitle = "Uma seleção de trabalhos em desenvolvimento e concluídos pelo Studio.",
  ctaLabel = "Ver portfólio completo",
  onCtaClick,
  scrollLength = 320,
  bgColor = "var(--background)",
  clusterRotation = true,
  stackScale = 0.82,
  cardRadius = 8,
  textColor = "var(--foreground)",
  textFadeStart = 0.3,
  showScrollHint = true,
}: StackSpreadProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scale: scaleMul, small: isSmall, colX, card: fixedCard } = useResponsive();
  const cards = images.slice(0, LAYOUT.length);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, SCATTER_START, SCATTER_END, 1],
    [0, 0, 1, 1],
  );

  const [spread, setSpread] = useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setSpread((was) => (was ? p > 0.985 : p >= 0.999));
  });
  const parallaxEnabled = reduce !== true && !isSmall;
  const pointer = usePointerParallax(spread, parallaxEnabled);

  const noScale = reduce === true;
  const copyOpacity = useTransform(progress, [textFadeStart, textFadeStart + 0.35], [0, 1]);
  const copyScale = useTransform(progress, [textFadeStart, 0.9], [0.85, 1]);
  const ctaOpacity = useTransform(progress, [0.75, 0.95], [0, 1]);
  const hintOpacity = useTransform(progress, [0, SCATTER_START], [1, 0]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{ height: `${scrollLength}vh`, backgroundColor: bgColor }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center max-md:px-8"
          style={{ opacity: copyOpacity, scale: noScale ? 1 : copyScale }}
        >
          <p
            className="mb-3 text-[0.75vw] font-medium uppercase tracking-[0.3em] max-md:text-[3vw]"
            style={{ color: textColor, opacity: 0.55 }}
          >
            Projetos
          </p>
          <h2
            className="w-full whitespace-pre-line font-serif text-[4.5vw] font-normal italic leading-none! tracking-tight max-md:text-[10vw]"
            style={{ color: textColor }}
          >
            {title}
          </h2>
          <p
            className="mt-[1.2vw] w-full max-w-[42ch] text-[1.05vw] leading-relaxed tracking-tight max-md:mt-3 max-md:text-[3.6vw]"
            style={{ color: textColor, opacity: 0.6 }}
          >
            {subtitle}
          </p>

          <motion.button
            type="button"
            onClick={onCtaClick}
            style={{ opacity: ctaOpacity }}
            className="pointer-events-auto mt-[2.2vw] inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[0.85vw] font-medium tracking-wide text-background transition-transform duration-200 hover:scale-[1.03] max-md:mt-8 max-md:px-6 max-md:py-3 max-md:text-sm"
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="absolute inset-0 z-10">
          {cards.map((item, i) => (
            <Card
              key={item.src + i}
              item={item}
              layout={LAYOUT[i]}
              progress={progress}
              reduce={reduce}
              clusterRotation={clusterRotation}
              scaleMul={scaleMul}
              isSmall={isSmall}
              colX={colX}
              fixedCard={fixedCard}
              stackScale={stackScale}
              cardRadius={cardRadius}
              pointer={pointer}
              depth={parallaxEnabled ? parallaxDepth(i, cards.length) : 0}
            />
          ))}
        </div>

        {showScrollHint && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[3vh] z-20 flex flex-col items-center gap-[0.6vh] text-[0.8vw] font-medium uppercase tracking-[0.2em] max-md:bottom-6 max-md:gap-1 max-md:text-[2.8vw]"
            style={{ color: textColor, opacity: hintOpacity }}
          >
            <span>Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="animate-bounce max-md:h-[4vw] max-md:w-[4vw]">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        )}
      </div>
    </section>
  );
}
