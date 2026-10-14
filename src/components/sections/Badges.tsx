import { BADGES } from "@/lib/data";
import SectionHead from "../ui/SectionHead";

const css = `
.ce-band{background:var(--card);border-block:1px solid var(--line)}
.ce{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:clamp(28px,5vw,80px);align-items:start}
.ce-l{position:sticky;top:110px}
.ce-cnt{margin-top:24px;font-family:var(--font-mono);font-size:13px;color:var(--mute);letter-spacing:.04em}
.cl{border-top:1px solid var(--line)}
.cr{position:relative;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;align-items:baseline;padding:clamp(20px,2.4vw,32px) clamp(10px,1.4vw,22px);border-bottom:1px solid var(--line);overflow:hidden;outline-offset:-3px;isolation:isolate}
.cr::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease);z-index:-1}
.cr:hover::before,.cr:focus-visible::before{transform:scaleX(1)}
.cr:hover,.cr:focus-visible{color:#fff}
.cr .i{font-family:var(--font-mono);font-size:13px;color:var(--mute);transition:color .5s var(--ease)}
.cr:hover .i,.cr:focus-visible .i{color:#bdbbb6}
.cr h3{font-size:clamp(19px,1.9vw,27px);font-weight:600;letter-spacing:-.03em;line-height:1.2;transition:transform .7s var(--ease)}
.cr:hover h3,.cr:focus-visible h3{transform:translateX(10px)}
.cr p{margin-top:6px;font-size:14px;color:var(--mute);transition:color .5s,transform .7s var(--ease)}
.cr:hover p,.cr:focus-visible p{color:#bdbbb6;transform:translateX(10px)}
@media (max-width:860px){.ce{grid-template-columns:minmax(0,1fr)}.ce-l{position:relative;top:auto}}
`;

export default function Badges() {
  return (
    <section id="badges" className="section ce-band" aria-labelledby="badge-h">
      <style>{css}</style>
      <div className="wrap ce">
        <div className="ce-l">
          <SectionHead id="badge-h" num="04" label="Badges" lead="Always" em="learning." />
          <p className="ce-cnt rv">{String(BADGES.length).padStart(2, "0")} badges</p>
        </div>
        <ol className="cl">
          {BADGES.map((b, i) => (
            <li key={b.title} className="cr rv" tabIndex={0} style={{ ["--i" as string]: i }}>
              <span className="i">{String(i + 1).padStart(2, "0")}</span>
              <div><h3>{b.title}</h3><p>{b.issuer}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
