/* Brand logos: devicon (MIT) + simple-icons (CC0) in /public/logos. Concepts: custom thin line icons. */
export const BRAND: Record<string, { name: string; tint: string }> = {
  java: { name: "Java", tint: "#e76f00" }, c: { name: "C", tint: "#5c6bc0" }, html5: { name: "HTML5", tint: "#e34f26" },
  css3: { name: "CSS3", tint: "#1572b6" }, javascript: { name: "JavaScript", tint: "#f7df1e" }, react: { name: "React", tint: "#61dafb" },
  angular: { name: "Angular", tint: "#dd0031" }, nodejs: { name: "Node.js", tint: "#5fa04e" }, mysql: { name: "MySQL", tint: "#00758f" },
  mongodb: { name: "MongoDB", tint: "#47a248" }, git: { name: "Git", tint: "#f05032" }, github: { name: "GitHub", tint: "#181717" },
  vscode: { name: "VS Code", tint: "#007acc" }, androidstudio: { name: "Android Studio", tint: "#3ddc84" }, figma: { name: "Figma", tint: "#f24e1e" },
  canva: { name: "Canva", tint: "#00c4cc" }, firebase: { name: "Firebase", tint: "#ffca28" }, express: { name: "Express", tint: "#444" },
  googlemaps: { name: "Google Maps", tint: "#4285f4" },
};
const P = (d: string) => <path d={d} />;
export const CONCEPT: Record<string, React.ReactNode> = {
  responsive: <><rect x="3" y="5" width="13" height="10" rx="1.5" /><rect x="14" y="9" width="7" height="11" rx="1.5" /><path d="M7 19h4" /></>,
  sql: <><ellipse cx="12" cy="5.5" rx="7" ry="2.8" />{P("M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8")}</>,
  oop: <><rect x="3" y="3" width="8" height="8" rx="2" /><rect x="13" y="13" width="8" height="8" rx="2" />{P("M11 7h4a2 2 0 0 1 2 2v4")}</>,
  exception: <>{P("M12 3 2.5 20h19z")}{P("M12 10v4.5M12 17.2v.1")}</>,
  dsa: <><circle cx="12" cy="5" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="18" r="2.2" />{P("M11 7 7 16M13 7l4 9")}</>,
  problem: <>{P("M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z")}</>,
  adapt: <>{P("M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5")}</>,
  team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.4" />{P("M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15.5 14.3c2.9-.4 5.5 1.6 5.5 4.7")}</>,
  comm: <>{P("M4 5h16v11H9l-5 4z")}{P("M8 9.5h8M8 12.5h5")}</>,
};
export const isBrand = (k: string) => k in BRAND;
export const logoName = (k: string) => BRAND[k]?.name ?? k;

export default function TechLogo({ k, size = 24, glow = false }: { k: string; size?: number; glow?: boolean }) {
  const b = BRAND[k];
  const inner = b ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/logos/${k}.svg`} width={size} height={size} alt="" loading="lazy" decoding="async" style={{ width: size, height: size }} />
  ) : (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {CONCEPT[k]}
    </svg>
  );
  if (!glow) return inner;
  return (
    <span className="tl-glow" style={{ ["--t" as string]: b?.tint ?? "#0d0d0d", width: size * 1.6, height: size * 1.6 }}>
      <style>{`.tl-glow{position:relative;display:inline-grid;place-items:center;flex:none}
      .tl-glow::before{content:"";position:absolute;inset:-10%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--t) 22%,transparent),transparent);filter:blur(6px)}
      .tl-glow>*{position:relative}`}</style>
      {inner}
    </span>
  );
}
