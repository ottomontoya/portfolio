export function Eyebrow({ children, dot }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <div className="eyebrow">
      {dot && <span className="eyebrow-dot" />}
      <span>{children}</span>
    </div>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="a-pill">{children}</span>;
}
