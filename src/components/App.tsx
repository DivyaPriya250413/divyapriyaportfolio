"use client";
import { useEffect } from "react";
import { SmoothScroll } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll(".rv, .rv-mask").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return null;
}

export default function App() {
  return (
    <>
      <SmoothScroll /><RevealObserver />
      <Navigation />
      <main>
        <Hero /><About /><Skills /><Work /><Certifications /><Experience /><Contact />
      </main>
    </>
  );
}
