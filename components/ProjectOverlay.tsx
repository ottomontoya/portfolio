import { useState, useEffect, useRef } from "react";
import { PROJECTS, Project, ProjectImage, getProjectMetric } from "../data/projects";
import { CONTACT } from "../data/contact";
import { Pill } from "./ui";
import { ProjectChart } from "./Charts";

export function ProjectOverlay({
  project,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const imageOpenerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = Boolean(project);

  useEffect(() => {
    if (!isOpen) return;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      const opener = openerRef.current;
      window.requestAnimationFrame(() => {
        if (opener?.isConnected) opener.focus();
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!project) return;
    const focusFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.scrollTo({ top: 0 });
      closeRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(focusFrame);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (lightbox) {
          setLightbox(null);
          window.requestAnimationFrame(() => imageOpenerRef.current?.focus());
        } else {
          onClose();
        }
        return;
      }

      if (e.key === "Tab") {
        const scope = lightboxRef.current ?? dialogRef.current;
        if (!scope) return;
        const focusable = Array.from(scope.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(element => !element.hasAttribute("hidden"));
        if (focusable.length === 0) {
          e.preventDefault();
          scope.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && (document.activeElement === first || !scope.contains(document.activeElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !scope.contains(document.activeElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose, lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const focusFrame = window.requestAnimationFrame(() => lightboxCloseRef.current?.focus());
    return () => window.cancelAnimationFrame(focusFrame);
  }, [lightbox]);

  const closeLightbox = () => {
    setLightbox(null);
    window.requestAnimationFrame(() => imageOpenerRef.current?.focus());
  };

  if (!project) return null;
  const metric = getProjectMetric(project.evidence);
  const projectIndex = PROJECTS.findIndex(item => item.id === project.id);
  const previousProject = PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={dialogRef}
        className="overlay-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-title-${project.id}`}
        tabIndex={-1}
      >
        <button ref={closeRef} className="overlay-x" onClick={onClose} aria-label="Close project details">×</button>
        {project.images && project.images.length > 0 && (
          <div className="overlay-images" aria-label={`${project.title} image previews`}>
            {project.images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className="overlay-image-trigger"
                aria-label={`Enlarge image ${i + 1} of ${project.images!.length} for ${project.title}`}
                onClick={event => {
                  imageOpenerRef.current = event.currentTarget;
                  setLightbox(image);
                }}
              >
                <img
                  src={image.src}
                  srcSet={image.srcSet}
                  sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1280px) 50vw, 600px"
                  alt={image.alt}
                  className="overlay-img"
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
        {lightbox && (
          <div
            ref={lightboxRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Enlarged project image for ${project.title}`}
            tabIndex={-1}
            onMouseDown={e => { if (e.target === e.currentTarget) closeLightbox(); }}
          >
            <button ref={lightboxCloseRef} className="lightbox-x" onClick={closeLightbox}>
              <span aria-hidden="true">×</span>
              <span>Close image</span>
            </button>
            <img
              src={lightbox.src}
              srcSet={lightbox.srcSet}
              sizes="(max-width: 760px) calc(100vw - 32px), calc(100vw - 96px)"
              alt={lightbox.alt}
              width={lightbox.width}
              height={lightbox.height}
              className="lightbox-img"
              decoding="async"
            />
          </div>
        )}
        <div className="overlay-grid">
          <div className="overlay-header">
            <div className="mono overlay-eb">{project.n} · {project.client}</div>
            <h2 className="overlay-title" id={`project-title-${project.id}`}>{project.title}</h2>
            <div className="mono overlay-role">{project.role}</div>
          </div>
          <div className="overlay-story">
            <div className="overlay-body">
              {project.description.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <h3 className="overlay-section-label">Responsibilities</h3>
            <ul className="overlay-resp">
              {project.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="overlay-side">
            <div className="overlay-metric">
              <div className="proj-mv ov-mv">{metric.value}</div>
              <div className="proj-ml mono">{metric.label}</div>
            </div>
            <div className="overlay-chart">
              <ProjectChart evidence={project.evidence} color="var(--accent-on-panel)" />
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
              <h3 className="overlay-section-label">Impact</h3>
              <div className="overlay-impact">{project.impact}</div>
            </div>
            {project.tools.length > 1 && (
              <div className="overlay-side-section">
                <h3 className="overlay-section-label">Tools</h3>
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
        <nav className="overlay-actions" aria-label="Project navigation and contact">
          <button
            type="button"
            className="overlay-project-link overlay-project-previous"
            onClick={() => onNavigate(previousProject.id)}
            aria-label={`Previous project: ${previousProject.title}`}
            title={previousProject.title}
          >
            <span className="overlay-project-number mono">← {previousProject.n}</span>
            <span className="overlay-project-title">{previousProject.title}</span>
          </button>
          <a href={contactHref} className="cta cta-primary overlay-contact">
            Discuss a similar project <span className="arr">→</span>
          </a>
          <button
            type="button"
            className="overlay-project-link overlay-project-next"
            onClick={() => onNavigate(nextProject.id)}
            aria-label={`Next project: ${nextProject.title}`}
            title={nextProject.title}
          >
            <span className="overlay-project-number mono">{nextProject.n}</span>
            <span className="overlay-project-title">{nextProject.title}</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
