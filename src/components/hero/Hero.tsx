"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

const css = `
.hero{position:relative;overflow:clip;padding-top:56px;min-height:100svh}
.hero-ghost{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);font-weight:800;letter-spacing:-.06em;line-height:.8;white-space:nowrap;
  font-size:clamp(60px,14.4vw,250px);color:transparent;-webkit-text-stroke:1.5px rgba(13,13,13,.14);user-select:none;pointer-events:none;
  animation:ghost 14s ease-in-out infinite alternate}
@keyframes ghost{from{transform:translate(-50%,-50%)}to{transform:translate(-50%,-52%)}}
.hero-stage{position:relative;display:flex;justify-content:center}
.hero-video{height:min(96svh,1040px);aspect-ratio:768/960;width:auto;max-width:100%;mix-blend-mode:multiply;background:transparent;object-fit:cover;-webkit-mask-image:linear-gradient(90deg,transparent,#000 22%,#000 78%,transparent);mask-image:linear-gradient(90deg,transparent,#000 22%,#000 78%,transparent)}
.hero-copy{position:absolute;left:var(--gutter);bottom:12vh;max-width:min(520px,34vw);z-index:2}
.hero-copy h1{font-weight:700;letter-spacing:-.045em;line-height:1;font-size:clamp(38px,4.8vw,78px)}
.hero-ctas{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.hero-side{position:absolute;right:var(--gutter);bottom:12vh;z-index:2;text-align:right;display:grid;gap:6px;justify-items:end}
.hero-side p{font-family:var(--font-mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.snd{position:relative;width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;transition:transform .4s var(--ease)}
.snd:hover{transform:scale(1.08)}
.snd.blocked::after{content:"";position:absolute;inset:0;border-radius:50%;box-shadow:0 0 0 0 rgba(13,13,13,.35);animation:ping 2s var(--ease) infinite}
@keyframes ping{to{box-shadow:0 0 0 18px rgba(13,13,13,0)}}
.snd svg{width:16px;height:16px;fill:currentColor}
@media (max-width:900px){
  .hero{padding-top:72px}
  .hero-video{height:62svh}
  .hero-copy{position:relative;left:auto;bottom:auto;max-width:none;padding:8px var(--gutter) 0;margin-top:-24px}
  .hero-copy h1{font-size:clamp(40px,11vw,64px)}
  .hero-side{position:absolute;right:var(--gutter);top:calc(72px + 62svh - 64px);bottom:auto}
  .hero-side p{display:none}
  .hero{padding-bottom:56px;min-height:0}
  .hero-ghost{top:30%}
}
`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const visible = useRef(true);
  const wantSound = useRef(true);

  const play = useCallback(async () => {
    const v = vid.current; if (!v) return;
    try { await v.play(); setOn(!v.muted); setBlocked(v.muted && wantSound.current); }
    catch { v.muted = true; setOn(false); try { await v.play(); } catch {} setBlocked(wantSound.current); }
  }, []);

  useEffect(() => {
    const v = vid.current, h = ref.current; if (!v || !h) return;
    v.muted = false; v.volume = 1; play();
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.intersectionRatio >= 0.35;
      if (visible.current) play(); else v.pause();
    }, { threshold: [0, 0.35, 0.5, 1] });
    io.observe(h);
    const unlock = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-snd]")) return;
      if (wantSound.current && v.muted) { v.muted = false; if (visible.current) play(); setBlocked(false); }
      ["pointerdown", "keydown", "touchend"].forEach((t) => removeEventListener(t, unlock));
    };
    ["pointerdown", "keydown", "touchend"].forEach((t) => addEventListener(t, unlock, { passive: true }));
    const vis = () => { if (document.hidden) v.pause(); else if (visible.current) play(); };
    document.addEventListener("visibilitychange", vis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", vis);
      ["pointerdown", "keydown", "touchend"].forEach((t) => removeEventListener(t, unlock)); };
  }, [play]);

  const toggle = () => {
    const v = vid.current; if (!v) return;
    if (v.muted || blocked) { wantSound.current = true; v.muted = false; setOn(true); setBlocked(false); play(); }
    else { wantSound.current = false; v.muted = true; setOn(false); setBlocked(false); }
  };

  return (
    <section id="top" ref={ref} className="hero" aria-label="Introduction">
      <style>{css}</style>
      <div className="hero-ghost" aria-hidden="true">{PROFILE.firstName.toUpperCase()}</div>
      <div className="hero-stage">
        <video ref={vid} className="hero-video" muted loop playsInline preload="auto"
          aria-label={`${PROFILE.name} introducing herself (looping video)`}>
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-copy">
        <h1><span className="rv-mask is-in"><span style={{ transform: "none", animation: "up 1.1s var(--ease) both" }}>Aspiring Software</span></span>
          <span className="rv-mask is-in"><span style={{ transform: "none", animation: "up 1.1s .1s var(--ease) both" }}>Developer<span className="em">.</span></span></span></h1>
        <div className="hero-ctas rv is-in" style={{ animation: "up 1.1s .25s var(--ease) both" }}>
          <a className="btn btn-primary" href="#work" onClick={(e) => { e.preventDefault(); scrollToTarget("work"); }}>Explore work</a>
          <a className="btn btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); scrollToTarget("contact"); }}>Let&apos;s talk</a>
          <a className="btn btn-ghost" href={PROFILE.resume} download>Résumé ↓</a>
        </div>
      </div>
      <div className="hero-side">
        <button data-snd className={`snd${blocked ? " blocked" : ""}`} onClick={toggle} aria-label={on ? "Mute intro voice" : "Play intro with sound"} aria-pressed={on}>
          {on ? <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.4" height="12" rx="1" /><rect x="9.6" y="2" width="3.4" height="12" rx="1" /></svg>
              : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.2v11.6L13.6 8z" /></svg>}
        </button>
        <p>{PROFILE.degree}</p>
        <p>{PROFILE.college}</p>
      </div>
      <style>{`@keyframes up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
