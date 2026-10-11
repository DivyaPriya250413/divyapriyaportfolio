"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import SectionHead from "../ui/SectionHead";
import { prefersReducedMotion } from "@/lib/hooks";

const css = `
.ab-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(28px,4vw,64px);align-items:stretch;margin-top:56px}
.ab-col{display:flex;flex-direction:column;justify-content:center;gap:22px}
.ab-hi{font-size:clamp(32px,3.4vw,52px);font-weight:700;letter-spacing:-.045em;line-height:1}
.ab-p{color:var(--ink-2);font-size:clamp(16px,1.2vw,18px);line-height:1.6}
.ab-edu{font-family:var(--font-mono);font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.ab-btns{display:flex;flex-wrap:wrap;gap:10px}
.facts{border-top:1px solid var(--line)}
.facts div{display:flex;justify-content:space-between;gap:16px;padding:14px 0;border-bottom:1px solid var(--line);font-size:15px}
.facts dt{font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);padding-top:3px;flex:none}
.facts dd{margin:0;text-align:right;font-weight:500;overflow-wrap:anywhere}
.quote{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2vw,30px);line-height:1.2;color:var(--ink-2);letter-spacing:-.01em}
.lan{position:relative;display:flex;justify-content:center;min-height:560px}
.lan-sw{position:absolute;top:-20px;left:50%;width:0;transform-origin:0 0;will-change:transform}
.lan-ring{position:absolute;top:-6px;left:-5px;width:10px;height:10px;border-radius:50%;box-shadow:inset 0 0 0 2px var(--ink);background:var(--paper)}
.lan-cord{position:absolute;left:-.5px;top:4px;width:1px;height:36px;background:var(--ink)}
.lan-strap{position:absolute;left:-15px;top:40px;width:30px;height:56px;background:var(--ink);color:#fff;overflow:hidden;border-radius:2px}
.lan-strap div{display:flex;flex-direction:column;animation:strap 9s linear infinite}
.lan-strap span{writing-mode:vertical-rl;text-orientation:mixed;font-family:var(--font-mono);font-size:8px;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;padding:4px 0 4px 11px;height:140px}
@keyframes strap{to{transform:translateY(-50%)}}
.lan-clip{position:absolute;left:-9px;top:94px;width:18px;height:26px;border-radius:3px 3px 6px 6px;background:linear-gradient(90deg,#c9c7c2,#f6f5f2 45%,#a9a6a0);box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.lan-clip::after{content:"";position:absolute;left:5px;right:5px;bottom:4px;height:6px;border-radius:3px;background:var(--paper);box-shadow:inset 0 0 0 1px rgba(0,0,0,.3)}
.idc{position:absolute;left:-150px;top:116px;width:300px;height:404px;perspective:1200px;cursor:pointer;border-radius:22px;outline-offset:6px}
.idc-in{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .9s var(--ease)}
.idc.flip .idc-in{transform:rotateY(180deg)}
.idc-f,.idc-b{position:absolute;inset:0;border-radius:22px;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:var(--card);overflow:hidden;
  box-shadow:inset 0 0 0 1px var(--line),0 30px 60px -28px rgba(0,0,0,.35)}
.idc-b{transform:rotateY(180deg);padding:26px 24px;display:flex;flex-direction:column;gap:12px}
.idc-band{background:var(--ink);color:#fff;text-align:center;font-family:var(--font-mono);font-size:11px;letter-spacing:.3em;padding:13px 0 12px}
.idc-slot{position:absolute;top:-1px;left:50%;width:44px;height:10px;margin-left:-22px;border-radius:0 0 8px 8px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--line)}
.idc-ph{position:relative;width:128px;height:156px;margin:14px auto 0;border-radius:20px;padding:4px;background:linear-gradient(160deg,#d8d6d1,#8f8d88 50%,#e7e5e1)}
.idc-ph::before{content:"";position:absolute;inset:-14px;border-radius:30px;background:radial-gradient(closest-side,rgba(13,13,13,.1),transparent);z-index:-1}
.idc-ph div{width:100%;height:100%;border-radius:16px;overflow:hidden;background:#fff}
.idc-ph img{width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease)}
.idc:hover .idc-ph img{transform:scale(1.07)}
.idc-nm{text-align:center;margin-top:12px;font-weight:700;letter-spacing:-.03em;font-size:21px;line-height:1.1}
.idc-rl{text-align:center;color:var(--mute);font-size:12.5px;margin-top:3px}
.idc-rows{margin:8px 22px 0;border-top:1px solid var(--line)}
.idc-rows div{display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-bottom:1px solid var(--line);font-size:11px}
.idc-rows dt{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);padding-top:1px}
.idc-rows dd{margin:0;font-weight:500;text-align:right}
.idc-foot{position:absolute;left:22px;right:22px;bottom:12px;display:flex;justify-content:space-between;align-items:flex-end}
.barcode{height:24px;width:140px;display:block}
.holo{width:34px;height:34px;border-radius:50%;background:conic-gradient(from 0deg,#e4e2dd,#8f8d88,#f6f5f2,#a9a6a0,#e4e2dd);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2);animation:holo 6s linear infinite}
@keyframes holo{to{transform:rotate(360deg)}}
.idc-b h3{font-weight:700;letter-spacing:-.03em;font-size:22px;line-height:1}
.idc-b li{font-size:12.5px;line-height:1.4;color:var(--ink-2);padding:6px 0;border-bottom:1px solid var(--line)}
.idc-b li b{font-family:var(--font-mono);font-weight:400;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute);display:block}
.idc-sig{margin-top:auto;font-family:var(--font-serif);font-style:italic;font-size:26px;line-height:1}
.idc-fnd{font-family:var(--font-mono);font-size:9.5px;color:var(--mute);overflow-wrap:anywhere}
@media (max-width:1100px){
  .ab-grid{grid-template-columns:minmax(0,1fr) 320px}
  .ab-grid>.ab-col:last-child{grid-column:1/-1}
}
@media (max-width:760px){
  .ab-grid{grid-template-columns:minmax(0,1fr)}
  .lan{min-height:560px}
}
`;

function Barcode() {
  const bars = useMemo(() => {
    const out: { x: number; w: number }[] = []; let x = 0; let i = 0;
    const s = PROFILE.name;
    while (x < 140) { const w = 1 + ((s.charCodeAt(i % s.length) * (i + 3)) % 3); out.push({ x, w }); x += w + 1 + (i % 2); i++; }
    return out;
  }, []);
  return <svg className="barcode" viewBox="0 0 140 26" aria-hidden="true" preserveAspectRatio="none">{bars.map((b, i) => <rect key={i} x={b.x} width={b.w} height="26" fill="#0d0d0d" />)}</svg>;
}

function Lanyard() {
  const wrap = useRef<HTMLDivElement>(null);
  const sw = useRef<HTMLDivElement>(null);
  const [flip, setFlip] = useState(false);
  const label = `${PROFILE.name} · ${PROFILE.role} · `;

  useEffect(() => {
    const w = wrap.current, el = sw.current; if (!w || !el) return;
    const reduce = prefersReducedMotion();
    let th = 0, om = 0, raf = 0, last = 0, lx = 0, lt = 0, vis = false, t0 = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(.033, (now - last) / 1000 || .016); last = now;
      const idle = reduce ? 0 : Math.sin((now - t0) / 1700) * 0.9;
      om += (-60 * (th - idle) - 3.2 * om) * dt;   // spring toward idle sway, damped
      th += om * dt;
      el.style.transform = `rotate(${th.toFixed(3)}deg)`;
      raf = vis ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf && !reduce) { last = performance.now(); raf = requestAnimationFrame(loop); } });
    io.observe(w);
    const mv = (e: PointerEvent) => {
      const t = performance.now(); const v = (e.clientX - lx) / Math.max(8, t - lt); lx = e.clientX; lt = t;
      om = Math.max(-90, Math.min(90, om - v * 22));   // pointer velocity -> angular velocity
    };
    const sec = w.closest("section"); sec?.addEventListener("pointermove", mv as EventListener, { passive: true });
    return () => { io.disconnect(); sec?.removeEventListener("pointermove", mv as EventListener); cancelAnimationFrame(raf); };
  }, []);

  const toggleKey = (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlip((f) => !f); } };
  return (
    <div className="lan" ref={wrap}>
      <div className="lan-sw" ref={sw}>
        <i className="lan-ring" /><i className="lan-cord" />
        <div className="lan-strap" aria-hidden="true"><div><span>{label.repeat(3)}</span><span>{label.repeat(3)}</span></div></div>
        <i className="lan-clip" />
        <div className={`idc${flip ? " flip" : ""}`} role="button" tabIndex={0} aria-pressed={flip}
          aria-label={`Developer ID card for ${PROFILE.name}. Press to flip.`}
          onPointerEnter={(e) => e.pointerType === "mouse" && setFlip(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setFlip(false)}
          onPointerUp={(e) => e.pointerType !== "mouse" && setFlip((f) => !f)}
          onKeyDown={toggleKey}>
          <div className="idc-in">
            <div className="idc-f" aria-hidden={flip}>
              <i className="idc-slot" />
              <div className="idc-band">DEVELOPER ID</div>
              <div className="idc-ph"><div>{/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/portrait-bust.webp" width={480} height={600} alt={`Portrait of ${PROFILE.name}`} /></div></div>
              <p className="idc-nm">{PROFILE.name}</p>
              <p className="idc-rl">{PROFILE.role}</p>
              <dl className="idc-rows">
                <div><dt>College</dt><dd>EGS Pillay Engg.</dd></div>
                <div><dt>Dept.</dt><dd>Information Technology</dd></div>
                <div><dt>Valid till</dt><dd>{PROFILE.gradYear}</dd></div>
              </dl>
              <div className="idc-foot"><Barcode /><i className="holo" /></div>
            </div>
            <div className="idc-b" aria-hidden={!flip}>
              <h3>What I am</h3>
              <ul>
                <li><b>Role</b>{PROFILE.role}</li>
                <li><b>Degree</b>{PROFILE.degree} · CGPA {PROFILE.cgpa}</li>
                <li><b>Projects</b>Campus Bus Tracker, The Coffee &amp; Me, Train Food Delivery</li>
                <li><b>Internships</b>Google · AICTE</li>
              </ul>
              <p className="idc-sig">{PROFILE.name}</p>
              <p className="idc-fnd">If found, say hello · {PROFILE.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-h" style={{ overflow: "clip" }}>
      <style>{css}</style>
      <div className="wrap">
        <SectionHead id="about-h" num="01" label="About" lead="A little about" em="me." />
        <div className="ab-grid">
          <div className="ab-col">
            <p className="ab-hi rv">Hi, I&apos;m {PROFILE.firstName}.</p>
            <p className="ab-p rv" style={{ ["--i" as string]: 1 }}>{PROFILE.resumeSummary}</p>
            <p className="ab-edu rv" style={{ ["--i" as string]: 2 }}>{PROFILE.degree} · CGPA {PROFILE.cgpa} · 2022–{PROFILE.gradYear}</p>
            <div className="ab-btns rv" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-primary btn-sm" href={PROFILE.resume} download>Résumé ↓</a>
              <a className="btn btn-ghost btn-sm" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="btn btn-ghost btn-sm" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <Lanyard />
          <div className="ab-col">
            <p className="tag rv">Quick facts</p>
            <dl className="facts rv" style={{ ["--i" as string]: 1, margin: 0 }}>
              <div><dt>Education</dt><dd>{PROFILE.college}</dd></div>
              <div><dt>Degree</dt><dd>{PROFILE.degree}</dd></div>
              <div><dt>Role</dt><dd>{PROFILE.role}</dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
              <div><dt>Phone</dt><dd><a href={PROFILE.phoneHref}>{PROFILE.phone}</a></dd></div>
            </dl>
            <p className="quote rv" style={{ ["--i" as string]: 2 }}>“Eager to contribute to real-world projects in a technical role.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
