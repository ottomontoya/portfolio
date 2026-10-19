import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getProjectMetric, type ProjectEvidence } from "../data/projects";
import { SIGNAL } from "../data/about";
import { createAccessFieldHover } from "../utils/accessFieldHover";
import { useEvidenceMotion } from "../utils/useEvidenceMotion";

// Ordered-dither thresholds spread each wavefront into a halftone pattern.
// Fixed ranks keep entry and Replay identical, without random flicker.
const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const ACCESS_COLUMNS = 29;

function ditherThreshold(index: number) {
  const column = index % ACCESS_COLUMNS;
  const row = Math.floor(index / ACCESS_COLUMNS);
  return (BAYER_4[(row % 4) * 4 + (column % 4)] + 0.5) / 16;
}

function ditherDelay(index: number) {
  const column = index % ACCESS_COLUMNS;
  const row = Math.floor(index / ACCESS_COLUMNS);
  const wave = (1 + Math.sin(row * 0.35 - column * 0.08)) * 0.1;
  return (column / (ACCESS_COLUMNS - 1)) * 0.95 + wave + ditherThreshold(index) * 0.28;
}

/** A count illustration, never a reconstruction of client access topology. */
export function AccessField({
  evidence,
  animate = false,
  showCaption = true,
}: {
  evidence: Extract<ProjectEvidence, { kind: "delta" }>;
  animate?: boolean;
  showCaption?: boolean;
}) {
  const root = useRef<SVGSVGElement>(null);
  const replay = useRef<(() => void) | null>(null);

  useEffect(() => {
    const svg = root.current;
    if (!animate || !svg) return;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const dots = svg.querySelectorAll(".access-dot");
        const groups = svg.querySelectorAll(".access-group");
        const hover = createAccessFieldHover(svg, ditherThreshold);
        // All marks remain present. The wave changes their texture, never the
        // counts or their relationship to the separate group outlines.
        const timeline = gsap
          .timeline({ paused: true })
          .fromTo(
            dots,
            {
              scale: 0.3,
              opacity: 0.24,
              transformOrigin: "center center",
            },
            {
              scale: 1.45,
              opacity: 1,
              duration: 0.27,
              ease: "steps(3)",
              stagger: ditherDelay,
            },
          )
          .to(
            dots,
            {
              scale: 1,
              duration: 0.45,
              ease: "power3.out",
              stagger: ditherDelay,
            },
            0.27,
          )
          .fromTo(
            groups,
            { strokeDasharray: "0.8 5.2", opacity: 0.4 },
            {
              // Keep the six-unit dash period fixed: the gaps close in place
              // instead of chasing around the perimeter like a loading state.
              strokeDasharray: "6 0",
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              stagger: (i) => (i % 3) * 0.15 + Math.floor(i / 3) * 0.04,
            },
            1.1,
          )
          // Remove the dash pattern entirely to avoid antialiasing seams at
          // small sizes, even when a zero-length gap is mathematically solid.
          .set(groups, { strokeDasharray: "none" });
        let inView = false;
        const syncPlayback = () => {
          const visible = inView && !document.hidden;
          if (visible) timeline.play();
          else timeline.pause();
          hover.setEnabled(visible && timeline.progress() === 1);
        };
        timeline.eventCallback("onComplete", () => hover.setEnabled(inView && !document.hidden));
        replay.current = () => {
          hover.setEnabled(false);
          timeline.restart();
          syncPlayback();
        };
        const observer = new IntersectionObserver(
          ([entry]) => {
            inView = entry.isIntersecting && entry.intersectionRatio >= 0.3;
            syncPlayback();
          },
          { threshold: 0.3 },
        );
        observer.observe(svg);
        document.addEventListener("visibilitychange", syncPlayback);
        return () => {
          hover.destroy();
          observer.disconnect();
          document.removeEventListener("visibilitychange", syncPlayback);
          replay.current = null;
        };
      },
      root,
    );
    return () => media.revert();
  }, [animate, evidence.from, evidence.to]);

  return (
    <div className="access-field">
      <div className="access-counts">
        <div>
          <span>{evidence.from}</span>
          <small>{SIGNAL.fromLabel}</small>
        </div>
        <span className="access-arrow" aria-hidden="true">
          ↘
        </span>
        <div>
          <span>{evidence.to}</span>
          <small>{SIGNAL.toLabel}</small>
        </div>
      </div>
      <svg
        ref={root}
        className="access-drawing"
        viewBox="0 0 540 272"
        aria-hidden="true"
        focusable="false"
      >
        {Array.from({ length: evidence.from }, (_, i) => (
          <circle
            className="access-dot"
            key={i}
            cx={12 + (i % ACCESS_COLUMNS) * 10.5}
            cy={14 + Math.floor(i / ACCESS_COLUMNS) * 10.5}
            r="2.35"
            fill="currentColor"
          />
        ))}
        {Array.from({ length: evidence.to }, (_, i) => (
          <rect
            className="access-group"
            key={i}
            x={380 + (i % 3) * 53}
            y={49 + Math.floor(i / 3) * 45}
            width="43"
            height="29"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        ))}
      </svg>
      {showCaption && <div className="evidence-caption">
        <span>{SIGNAL.disclosure}</span>
        {animate && (
          <button
            type="button"
            className="replay-evidence"
            onClick={() => replay.current?.()}
            aria-label="Replay the evidence illustration"
          >
            Replay <span aria-hidden="true">↻</span>
          </button>
        )}
      </div>}
    </div>
  );
}

export function EvidenceGraphic({
  evidence,
  showIllustrationCaption = false,
}: {
  evidence: ProjectEvidence;
  showIllustrationCaption?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEvidenceMotion(root, evidence);
  const metric = getProjectMetric(evidence);
  if (evidence.kind === "delta") return <AccessField evidence={evidence} />;
  if (evidence.kind === "convergence")
    return (
      <div className="convergence-evidence" ref={root}>
        <ul>
          {evidence.sources.map((source) => (
            <li key={source}>
              <span>{source}</span>
              <i aria-hidden="true">
                <span className="source-line" />
                <span className="source-packet" />
              </i>
            </li>
          ))}
        </ul>
        <div className="convergence-outcome">
          <span className="convergence-arrow" aria-hidden="true">→</span>
          <span>{evidence.outcome}</span>
        </div>
      </div>
    );
  const count =
    typeof evidence.units === "number" ? evidence.units : evidence.units.length;
  if (evidence.illustration?.kind === "reports-and-apps" && Array.isArray(evidence.units)) {
    return (
      <div className="delivery-evidence" ref={root}>
        <div className="delivery-labels">
          {evidence.units.map((label) => <span key={label}>{label}</span>)}
        </div>
        <svg className="delivery-drawing" viewBox="0 0 560 212" aria-hidden="true" focusable="false">
          <g className="report-sheet">
            <path className="report-paper" d="M72 16H204V170H72Z" />
          </g>
          <g className="report-sheet">
            <path className="report-paper" d="M58 30H190V184H58Z" />
          </g>
          <g className="report-sheet">
            <path className="report-paper" d="M44 44H176V198H44Z" />
            <path className="delivery-detail" d="M65 67H107M65 145H155M65 163H138M65 181H155" />
          </g>
          {/* Four abstract motifs for the four applications, never their real UI or logic. */}
          <g className="workflow-module" data-motif="step">
            <rect x="310" y="28" width="94" height="74" rx="2" />
            <path className="delivery-detail" d="M328 53H358V77H377" />
            <rect className="workflow-stop" x="377" y="72" width="10" height="10" />
          </g>
          <g className="workflow-module" data-motif="branch">
            <rect x="428" y="28" width="94" height="74" rx="2" />
            <path className="delivery-detail" d="M446 65H469M469 65V48H496M469 65V82H495" />
            <rect className="delivery-detail" x="496" y="44" width="8" height="8" />
            <rect className="workflow-stop" x="495" y="77" width="10" height="10" />
          </g>
          <g className="workflow-module" data-motif="merge">
            <rect x="310" y="124" width="94" height="74" rx="2" />
            <path className="delivery-detail" d="M331 144H348V161H377M331 178H348V161" />
            <circle className="delivery-detail" cx="328" cy="144" r="3" />
            <circle className="delivery-detail" cx="328" cy="178" r="3" />
            <rect className="workflow-stop" x="377" y="156" width="10" height="10" />
          </g>
          <g className="workflow-module" data-motif="validation">
            <rect x="428" y="124" width="94" height="74" rx="2" />
            <path className="delivery-detail" d="M446 145H480M446 161H470M446 177H484M493 141H506V181H493" />
            <rect className="workflow-stop" x="495" y="156" width="10" height="10" />
          </g>
        </svg>
        {showIllustrationCaption && <p className="delivery-caption">{evidence.illustration.caption}</p>}
      </div>
    );
  }
  if (evidence.mark === "dot" && count > 30) {
    return (
      <svg
        className="asset-count-field"
        viewBox="0 0 400 240"
        aria-hidden="true"
        focusable="false"
      >
        {Array.from({ length: count }, (_, i) => (
          <circle
            key={i}
            cx={4 + (i % 50) * 8}
            cy={3 + Math.floor(i / 50) * 6}
            r="1.5"
            fill="currentColor"
          />
        ))}
      </svg>
    );
  }
  return (
    <div
      className={`unit-evidence${Array.isArray(evidence.units) ? " unit-evidence-named" : ""}`}
      ref={root}
    >
      <div className="unit-marks" aria-hidden="true">
        {Array.from({ length: Math.min(count, 30) }, (_, i) => (
          <span key={i} className={Array.isArray(evidence.units) ? "delivery-track" : "dashboard-tile"}>
            {Array.isArray(evidence.units) ? evidence.units[i] : ""}
            <i className={Array.isArray(evidence.units) ? "track-outline" : "dashboard-rule"} />
          </span>
        ))}
      </div>
      <p>
        {metric.value} <span>{metric.label.toLowerCase()}</span>
      </p>
    </div>
  );
}
