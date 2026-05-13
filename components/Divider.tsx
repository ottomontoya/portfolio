export function Divider({ from, to, variant = "wave" }: {
  from: string; to: string; variant?: "wave" | "curve" | "diagonal" | "sine";
}) {
  if (variant === "diagonal") {
    return (
      <svg className="sec-divider" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="0,0 1440,80 1440,0" style={{ fill: from }} />
        <polygon points="0,0 1440,80 0,80" style={{ fill: to }} />
      </svg>
    );
  }
  if (variant === "curve") {
    return (
      <svg className="sec-divider" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="1440" height="120" style={{ fill: from }} />
        <path d="M0,120 C 360,40 1080,40 1440,120 L1440,120 L0,120 Z" style={{ fill: to }} />
      </svg>
    );
  }
  if (variant === "sine") {
    return (
      <svg className="sec-divider" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="0" width="1440" height="100" style={{ fill: from }} />
        <path d="M0,50 C87.4,18 152.6,18 240,50 C327.4,82 392.6,82 480,50 C567.4,18 632.6,18 720,50 C807.4,82 872.6,82 960,50 C1047.4,18 1112.6,18 1200,50 C1287.4,82 1352.6,82 1440,50 L1440,100 L0,100 Z" style={{ fill: to }} />
      </svg>
    );
  }
  return (
    <svg className="sec-divider" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="1440" height="140" style={{ fill: from }} />
      <path d="M0,80 C 240,140 480,30 720,80 C 960,130 1200,30 1440,80 L1440,140 L0,140 Z" style={{ fill: to }} />
    </svg>
  );
}
