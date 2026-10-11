"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { lockScroll, scrollToTarget } from "@/lib/scroll";

const css = `
.nav{position:fixed;inset:0 0 auto 0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:14px var(--gutter);pointer-events:none}
.nav>*{pointer-events:auto}
.nav-prog{position:fixed;top:0;left:0;height:2px;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(var(--p,0));z-index:60}
.nav-brand{display:flex;align-items:center;gap:12px}
.nav-mark{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;font-weight:700;font-size:14px;letter-spacing:-.02em;
  box-shadow:inset 0 0 0 1.5px var(--ink);transition:background .5s var(--ease),color .5s var(--ease),transform .9s var(--ease)}
.nav-mark.on{background:var(--ink);color:#fff}
.nav-mark:hover{transform:rotate(360deg)}
.nav-name{font-weight:600;letter-spacing:-.02em;transition:opacity .5s var(--ease),transform .5s var(--ease)}
.nav-name.off{opacity:0;transform:translateX(-8px);pointer-events:none}
.nav-pill{position:relative;display:flex;gap:2px;padding:5px;border-radius:999px;transition:background .5s var(--ease),box-shadow .5s var(--ease),backdrop-filter .5s}
.nav-pill.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line),0 12px 32px -16px rgba(0,0,0,.25)}
.nav-link{position:relative;z-index:1;padding:9px 18px;border-radius:999px;font-size:14px;font-weight:500;color:var(--ink);transition:color .4s var(--ease)}
.nav-link.act{color:#fff}
.nav-ind{position:absolute;z-index:0;top:5px;bottom:5px;left:0;border-radius:999px;background:var(--ink);transition:transform .6s var(--ease),width .6s var(--ease),opacity .3s}
.nav-menu{display:none;height:42px;padding:0 20px;border-radius:999px;font-weight:500;font-size:14px;background:rgba(255,255,255,.8);backdrop-filter:blur(12px);box-shadow:inset 0 0 0 1px var(--line)}
.ov{position:fixed;inset:0;z-index:70;background:var(--paper);clip-path:circle(0% at calc(100% - 52px) 36px);transition:clip-path .9s var(--ease);visibility:hidden;display:flex;flex-direction:column;justify-content:center;padding:var(--gutter)}
.ov.open{clip-path:circle(150% at calc(100% - 52px) 36px);visibility:visible}
.ov-close{position:absolute;top:14px;right:var(--gutter);height:42px;padding:0 20px;border-radius:999px;background:var(--ink);color:#fff;font-size:14px;font-weight:500}
.ov a{display:flex;align-items:baseline;gap:16px;font-size:clamp(44px,13vw,84px);font-weight:700;letter-spacing:-.045em;line-height:1.1;padding:4px 0;
  opacity:0;transform:translateY(30px);transition:opacity .7s var(--ease),transform .7s var(--ease);transition-delay:0s}
.ov.open a{opacity:1;transform:none;transition-delay:calc(.25s + var(--i)*70ms)}
.ov a span{font-family:var(--font-mono);font-size:12px;font-weight:400;color:var(--mute);letter-spacing:.05em}
@media (max-width:820px){.nav-pill{display:none}.nav-menu{display:block}}
`;

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const pill = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLDivElement>(null);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let raf = 0;
    const on = () => { if (raf) return; raf = requestAnimationFrame(() => {
      raf = 0; const h = document.documentElement; const max = h.scrollHeight - innerHeight;
      prog.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, scrollY / max) : 0));
      setScrolled(scrollY > 40);
    }); };
    on(); addEventListener("scroll", on, { passive: true }); addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    ["top", "certifications"].forEach((i) => { const h = document.getElementById(i); if (h) io.observe(h); });
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = links.current[active]; const p = pill.current;
    if (!el || !p) { setInd(null); return; }
    setInd({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active, scrolled]);

  useEffect(() => {
    lockScroll(open);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k); return () => { removeEventListener("keydown", k); };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToTarget(id), open ? 50 : 0); };

  return (
    <>
      <style>{css}</style>
      <div className="nav-prog" ref={prog} aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="nav-brand" onClick={go("top")} aria-label={`${PROFILE.name} — back to top`}>
          <span className={`nav-mark${scrolled ? " on" : ""}`}>{PROFILE.initials}</span>
          <span className={`nav-name${scrolled ? " off" : ""}`}>{PROFILE.name}</span>
        </a>
        <nav aria-label="Primary">
          <div className={`nav-pill${scrolled ? " glass" : ""}`} ref={pill}>
            {ind && <span className="nav-ind" aria-hidden="true" style={{ width: ind.w, transform: `translateX(${ind.x}px)` }} />}
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} ref={(el) => { links.current[n.id] = el; }}
                className={`nav-link${active === n.id ? " act" : ""}`} aria-current={active === n.id ? "true" : undefined} onClick={go(n.id)}>{n.label}</a>
            ))}
          </div>
          <button className="nav-menu" aria-expanded={open} aria-controls="overlay" onClick={() => setOpen(true)}>Menu</button>
        </nav>
      </header>
      <div id="overlay" className={`ov${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button className="ov-close" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Close</button>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} style={{ ["--i" as string]: i }} tabIndex={open ? 0 : -1} onClick={go(n.id)}>
            <span>{String(i + 1).padStart(2, "0")}</span>{n.label}
          </a>
        ))}
      </div>
    </>
  );
}
