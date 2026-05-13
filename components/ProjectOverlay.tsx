import { useState, useEffect } from "react";
import { Project } from "../data/projects";
import { Pill } from "./ui";
import { ProjectChart } from "./Charts";

export function ProjectOverlay({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose, lightbox]);

  if (!project) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-card" onClick={e => e.stopPropagation()}>
        <button className="overlay-x" onClick={onClose} aria-label="Close">×</button>
        {project.images && project.images.length > 0 && (
          <div className="overlay-images">
            {project.images.map((src, i) => (
              <img key={i} src={src} alt="" className="overlay-img" onClick={() => setLightbox(src)} />
            ))}
          </div>
        )}
        {lightbox && (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <img src={lightbox} alt="" className="lightbox-img" />
          </div>
        )}
        <div className="overlay-grid">
          <div>
            <div className="mono overlay-eb">{project.n} · {project.client}</div>
            <h3 className="overlay-title">{project.title}</h3>
            <div className="mono overlay-role">{project.role}</div>
            <div className="overlay-body">
              {project.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="overlay-section-label">Responsibilities</div>
            <ul className="overlay-resp">
              {project.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="overlay-side">
            <div className="overlay-metric">
              <div className="proj-mv ov-mv">{project.metric.value}</div>
              <div className="proj-ml mono">{project.metric.label}</div>
            </div>
            <div className="overlay-chart">
              <ProjectChart kind={project.chart} color="var(--burgundy)" />
            </div>
            <div className="overlay-pieces">
              <div className="overlay-piece">
                <div className="mono">scope</div>
                <div>{project.scope}</div>
              </div>
              <div className="overlay-piece">
                <div className="mono">timeline</div>
                <div>{project.timeline}</div>
              </div>
              <div className="overlay-piece">
                <div className="mono">stack</div>
                <div>{project.tools[0]}</div>
              </div>
            </div>
            <div className="overlay-side-section">
              <div className="overlay-section-label">Impact</div>
              <div className="overlay-impact">{project.impact}</div>
            </div>
            {project.tools.length > 1 && (
              <div className="overlay-side-section">
                <div className="overlay-section-label">Tools</div>
                <div className="overlay-tools">
                  {project.tools.map(t => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
            )}
            {project.caseStudy && (
              <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" className="cta cta-ghost overlay-case-study">
                View case study <span className="arr">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
