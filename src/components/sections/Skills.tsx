"use client";
import { useMemo, useRef, useState } from "react";
import { PROJECTS, SKILL_GROUPS } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo, { isBrand } from "../ui/TechLogo";
import { useInView } from "@/lib/hooks";

const css = `
.sk-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:48px}
.chip{height:36px;padding:0 16px;border-radius:999px;font-size:13px;font-weight:500;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);transition:background .4s var(--ease),color .4s var(--ease)}
.chip:hover{background:var(--soft)}
.chip[aria-pressed=true]{background:var(--ink);color:#fff;box-shadow:none}
.sk-wrap{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:32px;margin-top:28px;align-items:start}
.pt{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:10px}
.el{position:relative;aspect-ratio:1;border-radius:14px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);padding:8px 9px;text-align:left;display:flex;flex-direction:column;justify-content:space-between;
  opacity:0;transform:translateY(14px) scale(.94);transition:opacity .8s var(--ease),transform .8s var(--ease),box-shadow .4s var(--ease),filter .5s,background .4s;transition-delay:var(--d8,0ms),var(--d8,0ms),0s,0s,0s}
.pt.in .el{opacity:1;transform:none}
.pt.in .el.dim{opacity:.28;filter:grayscale(1);transition-delay:0s}
.el:hover,.el.sel{box-shadow:inset 0 0 0 1.5px var(--ink),0 14px 30px -18px rgba(0,0,0,.4);transform:translateY(-3px);transition-delay:0s}
.el .n{font-family:var(--font-mono);font-size:10px;color:var(--mute)}
.el .s{font-size:clamp(20px,2.4vw,34px);font-weight:700;letter-spacing:-.05em;line-height:1}
.el .nm{font-size:clamp(8.5px,.8vw,11px);font-weight:500;line-height:1.15;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;color:var(--ink-2)}
.insp{position:sticky;top:96px;border-radius:26px;padding:28px;min-height:420px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px}
.insp .lg{width:150px;height:150px;display:grid;place-items:center;color:var(--ink);animation:pop .7s var(--ease)}
@keyframes pop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
.insp h3{font-size:28px;font-weight:700;letter-spacing:-.04em;line-height:1.05;margin-top:8px}
.insp .fam{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}
.insp .uses{margin-top:10px;padding-top:14px;border-top:1px solid var(--line);width:100%;font-size:13.5px;color:var(--ink-2)}
.insp .uses b{display:block;font-family:var(--font-mono);font-weight:400;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);margin-bottom:6px}
@media (max-width:980px){.sk-wrap{grid-template-columns:minmax(0,1fr)}.insp{position:relative;top:auto;min-height:0}}
@media (max-width:640px){.el{transition-delay:var(--d4,0ms),var(--d4,0ms),0s,0s,0s}.pt{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.el .s{font-size:22px}.el .nm{font-size:9px}}
`;

export default function Skills() {
  const flat = useMemo(() => SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ ...s, family: g.family }))), []);
  const fams = SKILL_GROUPS.map((g) => g.family);
  const [fam, setFam] = useState<string>("All");
  const [sel, setSel] = useState(0);
  const grid = useRef<HTMLDivElement>(null);
  const seen = useInView(grid, { once: true, threshold: 0.12 });
  const s = flat[sel];
  const uses = PROJECTS.filter((p) => p.tech.includes(s.name)).map((p) => p.title);


  return (
    <section id="skills" className="section" aria-labelledby="skills-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="skills-h" num="02" label="Skills" lead="The periodic table of my" em="stack." />
        <div className="sk-chips rv" role="group" aria-label="Filter by family">
          {["All", ...fams].map((f) => (
            <button key={f} className="chip" aria-pressed={fam === f} onClick={() => setFam(f)}>{f}</button>
          ))}
        </div>
        <div className="sk-wrap">
          <div ref={grid} className={`pt${seen ? " in" : ""}`} role="list" aria-label="Skills">
            {flat.map((k, i) => {
              const d8 = (Math.floor(i / 8) + (i % 8)) * 40, d4 = (Math.floor(i / 4) + (i % 4)) * 40;
              return (
                <button key={k.name} role="listitem" className={`el${sel === i ? " sel" : ""}${fam !== "All" && fam !== k.family ? " dim" : ""}`}
                  style={{ ["--d8" as string]: `${d8}ms`, ["--d4" as string]: `${d4}ms` }}
                  onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => setSel(i)}
                  aria-label={`${k.name}, ${k.family}, element ${i + 1}`}>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="s">{k.sym}</span>
                  <span className="nm">{k.name}<br /><span style={{ color: "var(--faint)" }}>{k.family}</span></span>
                </button>
              );
            })}
          </div>
          <aside className="insp card" aria-live="polite">
            <p className="fam">Element {String(sel + 1).padStart(2, "0")}</p>
            <div className="lg" key={s.name}>
              {isBrand(s.logo) ? <TechLogo k={s.logo} size={150} glow /> : <TechLogo k={s.logo} size={110} />}
            </div>
            <h3>{s.name}</h3>
            <p className="fam">{s.family}</p>
            <div className="uses"><b>Used in</b>{uses.length ? uses.join(" · ") : "Listed under technical skills in my résumé"}</div>
          </aside>
        </div>
      </div>
      
    </section>
  );
}
