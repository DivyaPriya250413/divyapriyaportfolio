"use client";
import { useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import TechLogo, { BRAND } from "../ui/TechLogo";

const LOGO: Record<string, string> = { "Java": "java", "Android Studio": "androidstudio", "Firebase": "firebase", "Google Maps API": "googlemaps",
  "Node.js": "nodejs", "MongoDB": "mongodb", "HTML5": "html5", "CSS3": "css3", "JavaScript": "javascript" };

const css = `
.wk{display:flex;gap:10px;margin-top:56px;height:min(78svh,600px)}
.pn{position:relative;flex:1 1 0;min-width:0;border-radius:26px;background:var(--card);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;cursor:pointer;
  transition:flex-grow .9s var(--ease),box-shadow .6s var(--ease);text-align:left;display:block}
.pn.open{flex-grow:8;cursor:default;box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -34px rgba(0,0,0,.3)}
.pn:focus-visible{outline-offset:-3px}
.sp{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:24px 0;transition:opacity .4s var(--ease)}
.pn.open .sp{opacity:0;pointer-events:none}
.sp .n,.wpl{font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.sp .t{writing-mode:vertical-rl;transform:rotate(180deg);font-weight:600;font-size:clamp(18px,1.8vw,26px);letter-spacing:-.03em;white-space:nowrap}
.wpl{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;box-shadow:inset 0 0 0 1px rgba(13,13,13,.2);font-size:18px;transition:transform .6s var(--ease),background .4s,color .4s}
.pn:hover .wpl{transform:rotate(90deg);background:var(--ink);color:#fff}
.bd{position:absolute;inset:0;min-width:820px;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:28px;padding:clamp(24px,2.6vw,40px);opacity:0;transition:opacity .5s var(--ease);pointer-events:none}
.pn.open .bd{opacity:1;transition-delay:.25s;pointer-events:auto}
.bd-l{display:flex;flex-direction:column;gap:16px;min-height:0}
.bd .k{font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.bd .k b{color:var(--ink);font-weight:500;margin-right:10px}
.bd h3{font-size:clamp(30px,3.4vw,52px);font-weight:700;letter-spacing:-.045em;line-height:1}
.bd p.d{color:var(--ink-2);font-size:15.5px;line-height:1.55;max-width:52ch}
.ft{display:grid;grid-template-columns:1fr 1fr;gap:4px 20px;font-size:13.5px}
.ft li{display:flex;gap:8px;padding:5px 0;border-bottom:1px solid var(--line)}
.ft li::before{content:"";width:5px;height:5px;border-radius:50%;background:var(--ink);margin-top:8px;flex:none}
.tc{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto}
.tc span{display:inline-flex;align-items:center;gap:7px;height:30px;padding:0 12px 0 9px;border-radius:999px;font-size:12px;font-weight:500;box-shadow:inset 0 0 0 1px rgba(13,13,13,.16)}
.tc img{width:15px;height:15px}
.bd-r{position:relative;border-radius:20px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;clip-path:inset(0 0 0 100%);transition:clip-path 1s var(--ease)}
.pn.open .bd-r{clip-path:inset(0);transition-delay:.3s}
.ill{position:absolute;top:12px;right:12px;font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);background:#fff;border-radius:999px;padding:4px 10px;box-shadow:inset 0 0 0 1px var(--line);z-index:2}
.ui{position:absolute;inset:44px 20px 20px;display:flex;flex-direction:column;gap:10px}
.sk{background:var(--soft);border-radius:8px;height:10px}
.bx{background:#fff;border-radius:14px;box-shadow:inset 0 0 0 1px var(--line);padding:12px;display:flex;flex-direction:column;gap:8px}
.lb{font-size:11.5px;font-weight:600;letter-spacing:-.01em}
.map{position:relative;flex:1;min-height:0;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);overflow:hidden;
  background-image:linear-gradient(var(--soft) 1px,transparent 1px),linear-gradient(90deg,var(--soft) 1px,transparent 1px);background-size:34px 34px}
.dot{position:absolute;width:12px;height:12px;border-radius:50%;background:var(--ink);animation:mv 7s ease-in-out infinite alternate}
.dot::after{content:"";position:absolute;inset:-6px;border-radius:50%;box-shadow:0 0 0 1.5px var(--ink);animation:rp 2s var(--ease) infinite}
.dot.b{background:#8f8d88;animation-duration:9s;animation-delay:-3s}.dot.b::after{box-shadow:0 0 0 1.5px #8f8d88}
@keyframes mv{from{left:12%;top:70%}to{left:78%;top:24%}}
@keyframes rp{from{transform:scale(.6);opacity:1}to{transform:scale(1.8);opacity:0}}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.prod{aspect-ratio:1/.85;border-radius:12px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);padding:10px;display:flex;flex-direction:column;gap:6px;justify-content:flex-end;position:relative}
.prod i{position:absolute;inset:10px 10px 38px;border-radius:8px;background:repeating-linear-gradient(135deg,var(--soft) 0 6px,#f6f5f2 6px 12px)}
.add{display:inline-block;align-self:flex-start;font-size:10.5px;font-weight:600;background:var(--ink);color:#fff;border-radius:99px;padding:3px 10px;z-index:1}
.stp{display:flex;align-items:center;gap:10px;font-size:12px}
.stp b{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font-family:var(--font-mono);font-weight:500;font-size:10.5px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.25);flex:none}
.stp.done b{background:var(--ink);color:#fff;box-shadow:none}
.stp.cur b{animation:cur 1.8s ease-in-out infinite}
@keyframes cur{50%{background:var(--soft)}}
.stp+.stp{margin-top:2px}
@media (max-width:900px){
  .wk{flex-direction:column;height:auto}
  .pn{flex:none;max-height:84px;transition:max-height .9s var(--ease),box-shadow .6s}
  .pn.open{max-height:1100px}
  .sp{flex-direction:row;padding:0 22px;height:84px;bottom:auto}
  .sp .t{writing-mode:horizontal-tb;transform:none;font-size:20px;margin-right:auto;margin-left:16px}
  .bd{position:relative;min-width:0;grid-template-columns:1fr;padding:96px 22px 22px}
  .pn.open .bd{padding-top:28px}
  .bd{padding:28px 22px}
  .bd-r{min-height:300px}
}
`;

function IllustrativeUI({ p }: { p: Project }) {
  if (p.ui === "map") return (
    <div className="ui">
      <div className="bx"><span className="lb">Search buses</span><div className="sk" style={{ width: "70%" }} /></div>
      <div className="map"><i className="dot" /><i className="dot b" /></div>
      <div className="bx"><span className="lb">Arrival / delay notification</span><div className="sk" style={{ width: "55%" }} /></div>
    </div>);
  if (p.ui === "shop") return (
    <div className="ui">
      <div className="row2" style={{ flex: 1 }}>
        <div className="prod"><i /><span className="lb">Product</span><span className="add">Order</span></div>
        <div className="prod"><i /><span className="lb">Product</span><span className="add">Order</span></div>
      </div>
      <div className="bx"><span className="lb">Admin · Product management</span><div className="sk" style={{ width: "80%" }} /><div className="sk" style={{ width: "50%" }} /></div>
    </div>);
  return (
    <div className="ui">
      <div className="bx"><span className="lb">Food menu</span><div className="sk" style={{ width: "75%" }} /><div className="sk" style={{ width: "45%" }} /></div>
      <div className="bx" style={{ flex: 1, justifyContent: "center" }}>
        <span className="lb">Order tracking</span>
        <div className="stp done"><b>✓</b>Order placement</div>
        <div className="stp cur"><b>2</b>Status update</div>
        <div className="stp"><b>3</b>Delivery tracking</div>
      </div>
    </div>);
}

export default function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="section" aria-labelledby="work-h">
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="work-h" num="03" label="Selected work" lead="Things I've" em="built." />
        <div className="wk rv" role="list">
          {PROJECTS.map((p, i) => (
            <article key={p.id} role="listitem" tabIndex={0} aria-expanded={open === i} aria-label={`${p.title}. ${p.kicker}`}
              className={`pn${open === i ? " open" : ""}`}
              onMouseEnter={(e) => { if (window.matchMedia("(hover:hover) and (min-width:901px)").matches) setOpen(i); }}
              onFocus={() => setOpen(i)} onClick={() => setOpen(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(i); } }}>
              <div className="sp" aria-hidden="true"><span className="n">{p.index}</span><span className="t">{p.title}</span><span className="wpl">+</span></div>
              <div className="bd">
                <div className="bd-l">
                  <p className="k"><b>{p.index}</b>{p.kicker}</p>
                  <h3>{p.title}</h3>
                  <p className="d">{p.description}</p>
                  <ul className="ft">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
                  <ul className="tc" aria-label="Tech stack">
                    {p.tech.map((t) => <li key={t} style={{ display: "contents" }}><span>{LOGO[t] && BRAND[LOGO[t]] ? <TechLogo k={LOGO[t]} size={15} /> : null}{t}</span></li>)}
                  </ul>
                  {p.github && <a className="btn btn-primary btn-sm" href={p.github} target="_blank" rel="noreferrer" style={{ alignSelf: "flex-start" }}>View on GitHub ↗</a>}
                </div>
                <div className="bd-r" role="img" aria-label={`Illustrative interface sketch for ${p.title}, not a real screenshot`}>
                  <span className="ill">Illustrative UI</span>
                  <IllustrativeUI p={p} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
