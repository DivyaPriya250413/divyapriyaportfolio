"use client";
import { useRef } from "react";
import { TIMELINE } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import { useScrollProgress } from "@/lib/hooks";

const css = `
.tl{position:relative;margin-top:64px;padding-left:clamp(32px,6vw,96px)}
.spine,.spine-f{position:absolute;left:6px;top:8px;bottom:8px;width:2px;border-radius:2px}
.spine{background:var(--line)}
.spine-f{background:var(--ink);transform-origin:50% 0;transform:scaleY(var(--p,0))}
.st{position:relative;display:grid;grid-template-columns:minmax(120px,200px) minmax(0,1fr);gap:clamp(12px,3vw,48px);padding-bottom:clamp(40px,6vw,72px);opacity:.55;transition:opacity .8s var(--ease)}
.st::before{content:"";position:absolute;left:calc(-1 * clamp(32px,6vw,96px) + 0px);top:8px;width:14px;height:14px;border-radius:50%;background:var(--paper);box-shadow:inset 0 0 0 2px var(--faint);transition:background .6s var(--ease),box-shadow .6s var(--ease),transform .6s var(--ease)}
.st.lit{opacity:1}
.st.lit::before{background:var(--ink);box-shadow:inset 0 0 0 2px var(--ink),0 0 0 6px rgba(13,13,13,.08);transform:scale(1.1)}
.st .y{font-family:var(--font-mono);font-size:13px;letter-spacing:.04em;color:var(--mute);padding-top:6px}
.st .y em{display:block;font-style:normal;color:var(--mute);font-size:11px;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
.st h3{font-size:clamp(24px,2.8vw,40px);font-weight:700;letter-spacing:-.04em;line-height:1.05}
.st .pl{margin-top:8px;font-weight:500;color:var(--ink-2)}
.st .dt{margin-top:12px;color:var(--mute);max-width:62ch;line-height:1.6}
.nx{margin-top:8px;border-radius:26px;border:1.5px dashed rgba(13,13,13,.25);padding:clamp(24px,3vw,40px);display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.nx b{font-family:var(--font-mono);font-weight:400;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.nx p{font-size:clamp(26px,3.4vw,48px);font-weight:700;letter-spacing:-.045em;line-height:1}
@media (max-width:640px){.st{grid-template-columns:minmax(0,1fr);gap:8px}}
`;

export default function Experience() {
  const tl = useRef<HTMLDivElement>(null);
  useScrollProgress(tl, (p) => {
    const el = tl.current; if (!el) return;
    el.style.setProperty("--p", String(p));
    const total = el.getBoundingClientRect().height;
    el.querySelectorAll<HTMLElement>(".st").forEach((s) => s.classList.toggle("lit", s.offsetTop / total <= p));
  });
  return (
    <section id="experience" className="section" aria-labelledby="exp-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="exp-h" num="05" label="Education & experience" lead="The path" em="so far." />
        <div className="tl" ref={tl}>
          <span className="spine" aria-hidden="true" /><span className="spine-f" aria-hidden="true" />
          <ol>
            {TIMELINE.map((s) => (
              <li key={s.title} className="st">
                <p className="y">{s.year}<em>{s.kind}</em></p>
                <div><h3>{s.title}</h3><p className="pl">{s.place}</p><p className="dt">{s.detail}</p></div>
              </li>
            ))}
          </ol>
          <div className="nx rv"><div><b>Next</b><p>Your team?</p></div>
            <a className="btn btn-primary" href="#contact">Let&apos;s talk</a></div>
        </div>
      </div>
    </section>
  );
}
