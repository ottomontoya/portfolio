import { useState, useEffect, useRef } from "react";
import {
  PROJECTS,
  Project,
  ProjectImage,
  getProjectMetric,
} from "../data/projects";
import { CONTACT } from "../data/contact";
import { PROTOTYPE_PREVIEW } from "../data/about";
import { EvidenceGraphic } from "./Evidence";
import { Nav } from "./Nav";
import { useScrollbarVisibility } from "../utils/useScrollbarVisibility";
import type { Theme } from "../utils/useTheme";

export function ProjectOverlay({
  project,
  theme,
  onToggleTheme,
  onClose,
  onNavigate,
}: {
  project: Project | null;
  theme: Theme;
  onToggleTheme: () => void;
  onClose: () => void;
  onNavigate: (id: string) => void;
}) {
  const projectId = project?.id ?? null;
  const [imageZoomed, setImageZoomed] = useState(false);
  const [originalBrightness, setOriginalBrightness] = useState(false);
  const [imageState, setImageState] = useState<{
    projectId: string | null;
    image: ProjectImage | null;
  }>({ projectId, image: null });
  // Reset during render so a history/project change cannot commit an old image
  // or focus trap under the new dialog identity, even for a single frame.
  if (imageState.projectId !== projectId) {
    setImageState({ projectId, image: null });
  }
  const lightbox = imageState.projectId === projectId ? imageState.image : null;
  const setLightbox = (image: ProjectImage | null) => {
    setImageZoomed(false);
    setOriginalBrightness(false);
    setImageState({ projectId, image });
  };
  const dialogRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxViewportRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openedFromPageRef = useRef(false);
  const imageOpenerRef = useRef<HTMLButtonElement | null>(null);
  const lastProjectIdRef = useRef<string | null>(project?.id ?? null);
  const isOpen = Boolean(project);
  useScrollbarVisibility(cardRef, isOpen);
  useScrollbarVisibility(lightboxViewportRef, Boolean(lightbox), imageZoomed);

  useEffect(() => {
    if (project) lastProjectIdRef.current = project.id;
  }, [project?.id]);

  useEffect(() => {
    if (!isOpen) return;
    openedFromPageRef.current = Boolean(window.history.state?.portfolioProject);
    const activeElement = document.activeElement;
    openerRef.current =
      activeElement instanceof HTMLElement &&
      activeElement !== document.body &&
      activeElement !== document.documentElement
        ? activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      const opener = openerRef.current;
      window.requestAnimationFrame(() => {
        const projectTrigger = lastProjectIdRef.current
          ? document.getElementById(
              `project-trigger-${lastProjectIdRef.current}`,
            )
          : null;
        const focusTarget =
          openedFromPageRef.current && opener?.isConnected
            ? opener
            : projectTrigger;
        focusTarget?.focus({ preventScroll: openedFromPageRef.current });
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    document.title = `${project.title} | Otto Montoya`;
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  useEffect(() => {
    imageOpenerRef.current = null;
    if (!project) return;
    const focusFrame = window.requestAnimationFrame(() => {
      cardRef.current?.scrollTo({ top: 0 });
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
        const focusable = Array.from(
          scope.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter(
          (element) =>
            element.getClientRects().length > 0 && !element.closest("[inert]"),
        );
        if (focusable.length === 0) {
          e.preventDefault();
          scope.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            !scope.contains(document.activeElement))
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (document.activeElement === last ||
            !scope.contains(document.activeElement))
        ) {
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
    const focusFrame = window.requestAnimationFrame(() =>
      lightboxCloseRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(focusFrame);
  }, [lightbox]);

  const closeLightbox = () => {
    setLightbox(null);
    window.requestAnimationFrame(() => imageOpenerRef.current?.focus());
  };

  if (!project) return null;
  const metric = getProjectMetric(project.evidence);
  const projectIndex = PROJECTS.findIndex((item) => item.id === project.id);
  const previousProject =
    PROJECTS[(projectIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];
  const contactHref = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Project inquiry — ${project.title}`)}`;

  return (
    <div
      className="case-page"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-title-${project.id}`}
      tabIndex={-1}
    >
      <div
        className="case-navigation"
        aria-hidden={Boolean(lightbox)}
        {...(lightbox ? { inert: "" } : {})}
      >
        <Nav
          theme={theme}
          onToggleTheme={onToggleTheme}
          projectNavigation={{
            onClose,
            closeRef,
            previous: { title: previousProject.title, onSelect: () => onNavigate(previousProject.id) },
            next: { title: nextProject.title, onSelect: () => onNavigate(nextProject.id) },
          }}
        />
      </div>
      <div
        ref={cardRef}
        className="case-scroll"
        aria-hidden={Boolean(lightbox)}
        {...(lightbox ? { inert: "" } : {})}
      >
        <article className="case-article">
          <header className="case-header shell">
            <div className="case-index mono">
              Project {Number(project.n)} / {project.industry} / {project.client}
            </div>
            <h1 className="case-title" id={`project-title-${project.id}`}>
              {project.title}
            </h1>
            <div className="case-header-bottom">
              <p className="case-result">{project.decisionRecord.result}</p>
              <dl className="case-facts">
                <div>
                  <dt>Role</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>Scope</dt>
                  <dd>{project.scope}</dd>
                </div>
                <div>
                  <dt>Timeline</dt>
                  <dd>{project.timeline}</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>{project.tools.join(" · ")}</dd>
                </div>
              </dl>
            </div>
          </header>
          {project.images?.[0] && (
            <figure className="case-cover shell">
              <button
                type="button"
                className="overlay-image-trigger"
                aria-label={`Enlarge image 1 of ${project.images.length} for ${project.title}`}
                onClick={(event) => {
                  imageOpenerRef.current = event.currentTarget;
                  setLightbox(project.images![0]);
                }}
              >
                <img
                  src={project.images[0].src}
                  srcSet={project.images[0].srcSet}
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1500px) 90vw, 1380px"
                  width={project.images[0].width}
                  height={project.images[0].height}
                  alt={project.images[0].alt}
                />
                <span className="image-enlarge">
                  Inspect image <span className="action-arrow" aria-hidden="true">↗</span>
                </span>
              </button>
              <figcaption>
                <p>{PROTOTYPE_PREVIEW.credit}</p>
                <span>{PROTOTYPE_PREVIEW.boundary}</span>
              </figcaption>
            </figure>
          )}
          <div className="case-reading shell">
            <aside
              className="case-evidence-panel"
              aria-label="Project evidence"
            >
              <div className="case-index mono">The evidence</div>
              <EvidenceGraphic evidence={project.evidence} showIllustrationCaption />
              <p className="case-metric">
                <span>{metric.value}</span>
                {metric.label}
              </p>
              <p className="case-disclosure">
                {project.decisionRecord.boundary}
              </p>
              {project.caseStudy && (
                <a
                  href={project.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  Published case study <span className="action-arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </aside>
            <div className="case-narrative">
              {[
                {
                  title: "The constraint",
                  body: project.decisionRecord.constraint,
                },
                {
                  title: "The decision",
                  body: project.decisionRecord.decision,
                },
                {
                  title: "How it was checked",
                  body: project.decisionRecord.validation,
                },
              ].map((chapter) => (
                <section className="case-chapter" key={chapter.title}>
                  <h2>{chapter.title}</h2>
                  <p>{chapter.body}</p>
                </section>
              ))}
            </div>
          </div>
          {project.images && (
            <section
              className="case-gallery shell"
              aria-labelledby="case-gallery-title"
            >
              <div className="case-gallery-head">
                <h2 id="case-gallery-title">Inside the prototype.</h2>
                <p>{project.decisionRecord.boundary}</p>
              </div>
              {project.images.slice(1).map((image, i) => (
                <figure key={image.src}>
                  <button
                    type="button"
                    className="overlay-image-trigger"
                    aria-label={`Enlarge image ${i + 2} of ${project.images!.length} for ${project.title}`}
                    onClick={(event) => {
                      imageOpenerRef.current = event.currentTarget;
                      setLightbox(image);
                    }}
                  >
                    <img
                      src={image.src}
                      srcSet={image.srcSet}
                      sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1500px) 85vw, 1200px"
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="image-enlarge">
                      Inspect image <span className="action-arrow" aria-hidden="true">↗</span>
                    </span>
                  </button>
                  <figcaption>
                    <span className="mono">0{i + 2} / 04</span>
                    <p>{image.alt}</p>
                  </figcaption>
                </figure>
              ))}
            </section>
          )}
          <section
            className="case-depth-section shell"
            aria-label="Full project context"
          >
            <details className="case-depth" key={project.id}>
              <summary>
                <span>Full context & responsibilities</span>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="case-depth-grid">
                <div className="case-prose">
                  {project.description.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div>
                  <h2>Responsibilities</h2>
                  <ul>
                    {project.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  <h2>Impact</h2>
                  <p>{project.impact}</p>
                </div>
              </div>
            </details>
          </section>
          <footer className="case-footer shell">
            <a href={contactHref} className="case-contact">
              Discuss a similar project <span className="action-arrow" aria-hidden="true">↗</span>
            </a>
            <nav className="case-pagination" aria-label="Project navigation">
              <button
                onClick={() => onNavigate(previousProject.id)}
                aria-label={`Previous project ${previousProject.n}: ${previousProject.title}`}
              >
                <span className="mono"><span className="action-arrow action-arrow-left" aria-hidden="true">←</span> Previous / {previousProject.n}</span>
                <span>{previousProject.title}</span>
              </button>
              <button
                onClick={() => onNavigate(nextProject.id)}
                aria-label={`Next project ${nextProject.n}: ${nextProject.title}`}
              >
                <span className="mono">Next / {nextProject.n} <span className="action-arrow action-arrow-right" aria-hidden="true">→</span></span>
                <span>{nextProject.title}</span>
              </button>
            </nav>
          </footer>
        </article>
      </div>
      {lightbox && (
        <div
          ref={lightboxRef}
          className="lightbox"
          data-dimmed-media={theme === "dark" ? "" : undefined}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged project image for ${project.title}`}
          tabIndex={-1}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <button
            ref={lightboxCloseRef}
            className="lightbox-x"
            onClick={closeLightbox}
          >
            <span aria-hidden="true">×</span> Close image
          </button>
          <button
            className="lightbox-zoom"
            onClick={() => setImageZoomed((value) => !value)}
            aria-pressed={imageZoomed}
          >
            {imageZoomed ? "Fit image" : "Zoom image"}
          </button>
          <div
            ref={lightboxViewportRef}
            className={`lightbox-viewport${imageZoomed ? " is-zoomed" : ""}`}
            tabIndex={imageZoomed ? 0 : -1}
            role="region"
            aria-label="Dashboard image. When zoomed, scroll to inspect details."
          >
            <img
              src={lightbox.src}
              srcSet={lightbox.srcSet}
              sizes={
                imageZoomed
                  ? "(min-width: 1280px) 150vw, 1920px"
                  : "(max-width: 760px) calc(100vw - 32px), calc(100vw - 96px)"
              }
              alt={lightbox.alt}
              width={lightbox.width}
              height={lightbox.height}
              className="lightbox-img"
              data-original-brightness={originalBrightness ? "" : undefined}
              decoding="async"
            />
          </div>
          {theme === "dark" && (
            <button
              type="button"
              className="lightbox-brightness"
              aria-pressed={originalBrightness}
              onClick={() => setOriginalBrightness((value) => !value)}
              title={originalBrightness ? "Use dimmed brightness" : "Show original brightness"}
            >
              Original brightness
            </button>
          )}
        </div>
      )}
    </div>
  );
}
