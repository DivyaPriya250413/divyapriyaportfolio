"use client";
import { RefObject, useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** true while the element intersects the viewport (or once, with `once`). */
export function useInView<T extends Element>(ref: RefObject<T | null>, opts: IntersectionObserverInit & { once?: boolean } = {}) {
  const [inView, set] = useState(false);
  const { once, ...io } = opts;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { set(true); if (once) o.disconnect(); } else if (!once) set(false);
    }, io);
    o.observe(el); return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);
  return inView;
}

/** 0..1 progress of an element passing through the viewport; calls back on every frame it changes. */
export function useScrollProgress<T extends Element>(ref: RefObject<T | null>, cb: (p: number) => void) {
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0, last = -1;
    const calc = () => {
      raf = 0;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.65 - r.top) / (r.height + vh * 0.1)));
      if (p !== last) { last = p; cb(p); }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(calc); };
    on(); window.addEventListener("scroll", on, { passive: true }); window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
