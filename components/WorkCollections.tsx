import { useEffect, useRef, useState, type PointerEvent } from "react";
import { PROJECTS, getProjectMetric, type Project } from "../data/projects";
import { PUBLISHED_WORK, WORK_INDEX } from "../data/workPresentation";
import { EvidenceGraphic } from "./Evidence";

const pointerQuery = "(min-width: 1100px) and (min-height: 540px) and (hover: hover) and (pointer: fine) and (forced-colors: none)";
const reducedQuery = "(prefers-reduced-motion: reduce)";
const indexed = WORK_INDEX.projects.map(entry => ({
  ...entry,
  project: PROJECTS.find(project => project.id === entry.id)!,
}));

function EvidencePreview({ project }: { project: Project }) {
  const metric = getProjectMetric(project.evidence);
  return <div className="evidence-preview-content" key={project.id}>
    <div className="preview-graphic-label"><span>{project.tools[0]}</span><span>{project.industry}</span></div>
    <div className="preview-graphic"><EvidenceGraphic evidence={project.evidence} /></div>
    <div className="preview-proof"><strong>{metric.value}</strong><span>{metric.label}</span></div>
  </div>;
}

function WorkIndex({ onOpen }: { onOpen: (id: string) => void }) {
  const [active, setActive] = useState<Project | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const activeRef = useRef<string | null>(null);
  const stop = () => { cancelAnimationFrame(raf.current); raf.current = 0; };
  const hide = () => { stop(); setActive(null); activeRef.current = null; };

  useEffect(() => {
    const onChange = () => hide();
    const motion = matchMedia(reducedQuery);
    const pointer = matchMedia(pointerQuery);
    motion.addEventListener("change", onChange);
    pointer.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    // Fixed previews should not remain over a different section after scrolling.
    window.addEventListener("scroll", onChange, { passive: true });
    const onVisibility = () => { if (document.hidden) hide(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      motion.removeEventListener("change", onChange);
      pointer.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const place = (clientX: number, clientY: number, immediate = false) => {
    const element = preview.current;
    if (!element) return;
    const maxX = innerWidth - element.offsetWidth - 32;
    target.current = {
      x: Math.max(16, Math.min(maxX, innerWidth * .44 + clientX / 3)),
      y: Math.max(104, Math.min(innerHeight - element.offsetHeight - 24, clientY - element.offsetHeight * .52)),
    };
    if (immediate || matchMedia(reducedQuery).matches) {
      stop(); position.current = { ...target.current };
      element.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      return;
    }
    if (raf.current) return;
    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * .16;
      position.current.y += (target.current.y - position.current.y) * .16;
      element.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      if (Math.abs(target.current.x - position.current.x) + Math.abs(target.current.y - position.current.y) > .2) raf.current = requestAnimationFrame(animate);
      else raf.current = 0;
    };
    raf.current = requestAnimationFrame(animate);
  };

  const enter = (event: PointerEvent<HTMLButtonElement>, project: Project) => {
    if (event.pointerType !== "mouse" || !matchMedia(pointerQuery).matches) return;
    const first = activeRef.current === null;
    activeRef.current = project.id;
    setActive(project);
    place(event.clientX, event.clientY, first);
  };
  const focus = (project: Project) => {
    if (!matchMedia(pointerQuery).matches) return;
    activeRef.current = project.id;
    setActive(project);
    place(innerWidth * .6, innerHeight * .62, true);
  };

  return <section className="work-index" aria-labelledby="work-index-title">
    <div className="collection-intro"><h3 id="work-index-title">{WORK_INDEX.title}</h3><p>{WORK_INDEX.description}</p></div>
    <div className="archive-list" onPointerLeave={hide} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) hide(); }}>
      {indexed.map(({ project, title }) => {
        const metric = getProjectMetric(project.evidence);
        return <button type="button" key={project.id} id={`project-trigger-${project.id}`} className="archive-row"
          data-active={active?.id === project.id || undefined} aria-haspopup="dialog"
          onPointerEnter={event => enter(event, project)}
          onPointerMove={event => { if (activeRef.current && event.pointerType === "mouse") place(event.clientX, event.clientY); }}
          onFocus={() => focus(project)} onClick={() => { hide(); onOpen(project.id); }}>
          <span className="archive-number">{project.n}</span>
          <span className="archive-title-group"><span className="archive-title">{title}</span><span className="archive-meta">{project.tools.join(" + ")}<span>{project.scope}</span></span></span>
          <span className="archive-metric"><strong>{metric.value}</strong><span>{metric.label}</span></span>
          <span className="archive-action"><span>View project</span><span className="archive-arrow" aria-hidden="true">↗</span></span>
        </button>;
      })}
    </div>
    <div className="index-bottom"><span>{WORK_INDEX.footer}</span><span className="index-hint">{WORK_INDEX.hint}</span></div>
    <div className="index-preview" ref={preview} data-visible={Boolean(active)} aria-hidden="true"><div>{active && <EvidencePreview project={active} />}</div></div>
  </section>;
}

function PublishedWork() {
  const [active, setActive] = useState<Project | null>(null);
  useEffect(() => {
    const hide = () => setActive(null);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => { window.removeEventListener("scroll", hide); window.removeEventListener("resize", hide); };
  }, []);
  return <section className="published-work" aria-labelledby="published-work-title">
    <div className="collection-intro"><h3 id="published-work-title">{PUBLISHED_WORK.title}</h3><p>{PUBLISHED_WORK.description}</p></div>
    <div className="published-list" onPointerLeave={() => setActive(null)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }}>
      {indexed.filter(({ project }) => project.caseStudy).map(({ project, title }) => <a className="published-row" data-active={active?.id === project.id || undefined} key={project.id}
        href={project.caseStudy} target="_blank" rel="noopener noreferrer"
        onPointerEnter={event => { if (event.pointerType === "mouse" && matchMedia(pointerQuery).matches) setActive(project); }} onFocus={() => { if (matchMedia(pointerQuery).matches) setActive(project); }}>
        <span className="published-title">{title}</span>
        <span className="published-source"><span>STX Next</span><span className="source-roll"><span>Case study</span><span aria-hidden="true">Read the story</span></span></span>
        <span className="published-arrow" aria-hidden="true">↗</span>
      </a>)}
    </div>
    <div className="published-bottom"><p>{PUBLISHED_WORK.contribution}<br />{PUBLISHED_WORK.context}</p><span>{PUBLISHED_WORK.linkLabel} <span aria-hidden="true">↗</span></span></div>
    <aside className="published-preview" data-visible={Boolean(active)} aria-hidden="true">{active && <EvidencePreview project={active} />}</aside>
  </section>;
}

export function WorkCollections({ onOpen }: { onOpen: (id: string) => void }) {
  return <><WorkIndex onOpen={onOpen} /><PublishedWork /></>;
}
