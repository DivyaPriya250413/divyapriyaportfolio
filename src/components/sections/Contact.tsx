"use client";
import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const css = `
.ct{padding-bottom:40px}
.ct-h{font-weight:700;letter-spacing:-.055em;line-height:.95;font-size:clamp(46px,10vw,168px);margin-top:22px}
.ct-h .l{display:inline-block;transition:transform .5s var(--ease)}
.ct-h .l:hover{animation:hop .6s var(--ease)}
@keyframes hop{35%{transform:translateY(-.14em)}100%{transform:none}}
.ct-h .w{display:inline-block;white-space:nowrap}
.ct-row{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:40px;margin-top:clamp(40px,6vw,80px)}
.mail{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.mail a.big{font-size:clamp(22px,3.6vw,52px);font-weight:600;letter-spacing:-.04em;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:.15em;overflow-wrap:anywhere}
.copy{height:34px;padding:0 14px;border-radius:999px;font-family:var(--font-mono);font-size:12px;box-shadow:inset 0 0 0 1px rgba(13,13,13,.25);transition:background .4s,color .4s}
.copy:hover{background:var(--ink);color:#fff}
.ct-links{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.badge{position:relative;width:150px;height:150px;flex:none}
.badge svg{width:100%;height:100%;animation:spin 18s linear infinite}
.badge span{position:absolute;inset:0;display:grid;place-items:center;font-size:28px}
@keyframes spin{to{transform:rotate(360deg)}}
.ft-bar{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;margin-top:clamp(64px,10vw,140px);padding-top:24px;border-top:1px solid var(--line);font-size:13.5px;color:var(--mute)}
.ft-bar a:hover{color:var(--ink)}
`;

function Hop({ text }: { text: string }) {
  return <>{text.split(" ").map((w, wi, a) => (
    <span key={wi}><span className="w" aria-hidden="true">{[...w].map((c, i) => <span key={i} className="l">{c}</span>)}</span>{wi < a.length - 1 ? " " : ""}</span>
  ))}</>;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROFILE.email); } catch {
      const t = document.createElement("textarea"); t.value = PROFILE.email; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch {} t.remove();
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="section ct" aria-labelledby="contact-h">
      <style>{css}</style>
      <div className="wrap">
        <p className="tag rv"><b>06</b> — Contact</p>
        <h2 className="ct-h" id="contact-h" aria-label="Let's build something together.">
          <span className="rv-mask"><span><Hop text="Let's build" /></span></span>
          <span className="rv-mask" style={{ ["--i" as string]: 1 }}><span><Hop text="something" /> <span className="em"><Hop text="together." /></span></span></span>
        </h2>
        <div className="ct-row">
          <div>
            <div className="mail rv">
              <a className="big" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button className="copy" onClick={copy} aria-label="Copy email address"><span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span></button>
            </div>
            <div className="ct-links rv" style={{ ["--i" as string]: 1 }}>
              <a className="btn btn-primary" href={PROFILE.phoneHref}>{PROFILE.phone}</a>
              <a className="btn btn-ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <div className="badge" aria-hidden="true">
            <svg viewBox="0 0 150 150"><defs><path id="c" d="M75 75m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0" /></defs>
              <text fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="3.6" fill="#0d0d0d"><textPath href="#c">SAY HELLO • SAY HELLO • SAY HELLO • </textPath></text></svg>
            <span>↗</span>
          </div>
        </div>
        <footer className="ft-bar">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); scrollToTarget("top"); }}>Back to top ↑</a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
