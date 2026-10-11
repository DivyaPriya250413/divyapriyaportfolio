export default function SectionHead({ num, label, lead, em, id }: { num: string; label: string; lead: React.ReactNode; em: string; id: string }) {
  return (
    <header>
      <p className="tag rv"><b>{num}</b> — {label}</p>
      <h2 className="h2" id={id}>
        <span className="rv-mask"><span>{lead}</span></span>
        <span className="rv-mask" style={{ ["--i" as string]: 1 }}><span><span className="em">{em}</span></span></span>
      </h2>
    </header>
  );
}
