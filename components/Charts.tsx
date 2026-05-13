import { ChartKind } from "../data/projects";

function Spark({ data = [4,6,5,8,7,10,9,12,11,14,13,16], color = "currentColor", w = 240, h = 60, fill = false }: {
  data?: number[]; color?: string; w?: number; h?: number; fill?: boolean;
}) {
  const max = Math.max(...data), min = Math.min(...data);
  const xs = data.map((_, i) => (i / (data.length - 1)) * w);
  const ys = data.map(v => h - ((v - min) / (max - min || 1)) * (h - 4) - 2);
  const path = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {fill && <path d={area} fill={color} fillOpacity={0.15} />}
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {xs.map((x, i) => i === xs.length - 1 && <circle key={i} cx={x} cy={ys[i]} r="3" fill={color} />)}
    </svg>
  );
}

function Bars({ data = [3,5,4,7,6,9,8,5,11,9,12,14], color = "currentColor", w = 240, h = 80 }: {
  data?: number[]; color?: string; w?: number; h?: number;
}) {
  const max = Math.max(...data);
  const bw = w / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none">
      {data.map((v, i) => {
        const bh = (v / max) * (h - 4);
        return <rect key={i} x={i * bw + 1.5} y={h - bh} width={bw - 3} height={bh} fill={color} opacity={0.4 + (i / data.length) * 0.6} />;
      })}
    </svg>
  );
}

function ScatterChart({ color = "currentColor", w = 240, h = 120, n = 28 }: {
  color?: string; w?: number; h?: number; n?: number;
}) {
  const pts = Array.from({ length: n }, (_, i) => {
    const a = Math.sin(i * 13.37) * 0.5 + 0.5;
    const b = Math.cos(i * 7.91) * 0.5 + 0.5;
    return { x: a * (w - 8) + 4, y: b * (h - 8) + 4, r: 1.5 + (Math.sin(i * 2.1) * 0.5 + 0.5) * 2.5 };
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none">
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={color} opacity={0.4 + (i % 4) * 0.15} />)}
    </svg>
  );
}

function LinesChart({ color = "currentColor", w = 240, h = 100 }: {
  color?: string; w?: number; h?: number;
}) {
  const series = [
    [3,4,5,4,6,5,7,6,8,7,9,10],
    [2,3,3,5,4,6,7,7,9,9,11,12],
    [5,4,6,5,7,8,7,9,8,10,11,13],
  ];
  const max = 14, min = 2;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {series.map((data, si) => {
        const xs = data.map((_, i) => (i / (data.length - 1)) * w);
        const ys = data.map(v => h - ((v - min) / (max - min)) * (h - 6) - 3);
        const path = xs.map((x, i) => `${i ? "L" : "M"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
        return <path key={si} d={path} stroke={color} strokeWidth="1.5" fill="none" opacity={1 - si * 0.3} strokeDasharray={si === 1 ? "3 3" : "0"} />;
      })}
    </svg>
  );
}

export function ProjectChart({ kind, color }: { kind: ChartKind; color: string }) {
  switch (kind) {
    case "areaDown": return <Spark data={[16,15,14,12,11,9,8,7,6,5,4,3]} color={color} fill />;
    case "areaUp":   return <Spark data={[3,4,4,6,5,8,7,10,9,12,13,15]} color={color} fill />;
    case "bars":     return <Bars color={color} />;
    case "lines":    return <LinesChart color={color} />;
    case "scatter":  return <ScatterChart color={color} />;
    default:         return <Spark color={color} fill />;
  }
}
