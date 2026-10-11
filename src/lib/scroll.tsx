"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./hooks";

let lenis: Lenis | null = null;
let locked = false;

export function scrollToTarget(id: string) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(id === "top" ? 0 : el, { offset: id === "top" ? 0 : -8, duration: 1.4 });
  else window.scrollTo({ top: id === "top" ? 0 : el.getBoundingClientRect().top + scrollY - 8 });
}
export function lockScroll(v: boolean) {
  locked = v; document.documentElement.style.overflow = v ? "hidden" : "";
  if (lenis) v ? lenis.stop() : lenis.start();
}
export const isLocked = () => locked;

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf = 0;
    const loop = (t: number) => { lenis?.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); lenis = null; };
  }, []);
  return null;
}
