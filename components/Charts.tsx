import { useId } from "react";
import { ProjectEvidence } from "../data/projects";

const WIDTH = 240;
const HEIGHT = 80;
const EDGE = 4;

function DeltaChart({ from, to, color }: {
  from: number;
  to: number;
  color: string;
}) {
  const max = Math.max(from, to, 1);
  const y = (value: number) => HEIGHT - EDGE - (value / max) * (HEIGHT - EDGE * 2);
  const path = `M${EDGE},${y(from).toFixed(1)} L${WIDTH - EDGE},${y(to).toFixed(1)}`;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeOpacity="0.45" strokeLinecap="round" />
      <circle cx={EDGE} cy={y(from)} r="2.5" fill={color} />
      <circle cx={WIDTH - EDGE} cy={y(to)} r="3" fill={color} />
    </svg>
  );
}

function UnitBars({ count, color }: {
  count: number;
  color: string;
}) {
  const slotWidth = WIDTH / count;
  const barWidth = Math.min(14, Math.max(4, slotWidth - 4));

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {Array.from({ length: count }, (_, index) => (
        <rect
          key={index}
          x={index * slotWidth + (slotWidth - barWidth) / 2}
          y={EDGE}
          width={barWidth}
          height={HEIGHT - EDGE * 2}
          fill={color}
          opacity="0.78"
        />
      ))}
    </svg>
  );
}

function UnitDots({ count, color }: {
  count: number;
  color: string;
}) {
  const patternId = `unit-dots-${useId().replace(/:/g, "")}`;
  const columns = Math.ceil(Math.sqrt(count * (WIDTH / HEIGHT)));
  const rows = Math.ceil(count / columns);
  const cellWidth = WIDTH / columns;
  const cellHeight = HEIGHT / rows;
  const radius = Math.max(0.45, Math.min(cellWidth, cellHeight) * 0.28);

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern
          id={patternId}
          width={cellWidth}
          height={cellHeight}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={cellWidth / 2}
            cy={cellHeight / 2}
            r={radius}
            fill={color}
          />
        </pattern>
      </defs>
      <rect width={WIDTH} height={HEIGHT} fill={`url(#${patternId})`} opacity="0.72" />
    </svg>
  );
}

function ConvergenceChart({ sourceCount, color }: {
  sourceCount: number;
  color: string;
}) {
  const sourceYs = Array.from(
    { length: sourceCount },
    (_, index) => ((index + 1) / (sourceCount + 1)) * HEIGHT,
  );
  const outcomeY = HEIGHT / 2;

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {sourceYs.map((sourceY, index) => (
        <g key={index}>
          <path
            d={`M${EDGE},${sourceY.toFixed(1)} C${WIDTH * 0.52},${sourceY.toFixed(1)} ${WIDTH * 0.62},${outcomeY} ${WIDTH - EDGE},${outcomeY}`}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            opacity="0.78"
          />
          <circle cx={EDGE} cy={sourceY} r="2.25" fill={color} />
        </g>
      ))}
      <circle cx={WIDTH - EDGE} cy={outcomeY} r="4" fill={color} />
    </svg>
  );
}

function evidenceUnitCount(evidence: Extract<ProjectEvidence, { kind: "units" }>) {
  return typeof evidence.units === "number" ? evidence.units : evidence.units.length;
}

function assertNever(value: never): never {
  throw new Error(`Unsupported project evidence: ${JSON.stringify(value)}`);
}

export function ProjectChart({ evidence, color }: {
  evidence: ProjectEvidence;
  color: string;
}) {
  switch (evidence.kind) {
    case "delta":
      return <DeltaChart from={evidence.from} to={evidence.to} color={color} />;
    case "units": {
      const count = evidenceUnitCount(evidence);
      return evidence.mark === "bar"
        ? <UnitBars count={count} color={color} />
        : <UnitDots count={count} color={color} />;
    }
    case "convergence":
      return <ConvergenceChart sourceCount={evidence.sources.length} color={color} />;
  }

  return assertNever(evidence);
}
