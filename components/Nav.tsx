import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent, RefObject } from "react";
import { CONTACT } from "../data/contact";
import { NAV_ITEMS, NAV_MENU, NAV_PROJECT_IDS, PROJECT_NAV_LABELS } from "../data/navigation";
import { PROJECTS, getProjectMetric } from "../data/projects";
import { WORK_INDEX } from "../data/workPresentation";
import { animateMenu, animateProjects } from "../utils/navMenuMotion";
import type { Theme } from "../utils/useTheme";
import "./Nav.css";

type ProjectNavigation = {
  projectId: string;
  onClose: () => void;
  closeRef: RefObject<HTMLButtonElement>;
  previous: { title: string; onSelect: () => void };
  next: { title: string; onSelect: () => void };
};

const menuProjects = NAV_PROJECT_IDS.map(id => {
  const project = PROJECTS.find(item => item.id === id)!;
  return { ...project, menuTitle: WORK_INDEX.projects.find(item => item.id === id)?.title ?? project.title };
});

function Arrow() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" /></svg>;
}

function isPlainClick(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function Nav({ theme, onToggleTheme, onOpenProject, onOpenChange, projectNavigation }: {
  theme: Theme;
  onToggleTheme: () => void;
  onOpenProject: (id: string) => void;
  onOpenChange: (open: boolean) => void;
  projectNavigation?: ProjectNavigation;
}) {
  const [open, setOpen] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("");
  const [width, setWidth] = useState(() => window.innerWidth);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const releaseLock = useRef(() => {});
  const initialized = useRef(false);
  const projectsInitialized = useRef(false);
  const id = useId();
  const compact = width <= 768;
  const isProject = Boolean(projectNavigation);

  const close = useCallback((restoreFocus = true) => {
    // Release before a destination opens its own dialog or focuses an anchor.
    releaseLock.current();
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  }, []);

  useLayoutEffect(() => { onOpenChange(open); }, [open, onOpenChange]);
  useEffect(() => () => onOpenChange(false), [onOpenChange]);
  useLayoutEffect(() => { close(false); }, [projectNavigation?.projectId, close]);
  useEffect(() => {
    const onHistory = () => close(false);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("hashchange", onHistory);
    return () => {
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("hashchange", onHistory);
    };
  }, [close]);

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changeMotion = () => setReduced(motion.matches);
    window.addEventListener("resize", resize);
    motion.addEventListener("change", changeMotion);
    return () => {
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", changeMotion);
    };
  }, []);

  useEffect(() => {
    if (isProject) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-10% 0px -60% 0px" });
    ["home", "work", "about", "skills", "experience", "contact"].forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [isProject]);

  useLayoutEffect(() => {
    if (!root.current) return;
    if (!initialized.current && !open) { initialized.current = true; return; }
    const timeline = animateMenu(root.current, open, compact, reduced, setShowProjects);
    return () => { timeline.kill(); };
  }, [open, width, compact, reduced]);

  useLayoutEffect(() => {
    if (!root.current) return;
    if (!projectsInitialized.current && !showProjects) { projectsInitialized.current = true; return; }
    const timeline = animateProjects(root.current, showProjects && !compact, !open, reduced);
    return () => { timeline.kill(); };
  }, [showProjects, compact, expanded, reduced]);

  useLayoutEffect(() => {
    if (!open || !root.current) return;
    const header = root.current;
    const scope = header.closest(isProject ? ".case-page" : ".site-content");
    const siblings = Array.from(scope?.children ?? []).filter(
      (element): element is HTMLElement => element instanceof HTMLElement && !element.contains(header),
    );
    const headerContent = header.querySelector<HTMLElement>(".header-inner");
    if (headerContent) siblings.push(headerContent);
    const wasInert = siblings.map(element => element.inert);
    const previousOverflow = document.body.style.overflow;
    let released = false;
    document.body.style.overflow = "hidden";
    siblings.forEach(element => { element.inert = true; });

    const release = () => {
      if (released) return;
      released = true;
      document.body.style.overflow = previousOverflow;
      siblings.forEach((element, index) => { element.inert = wasInert[index]; });
    };
    releaseLock.current = release;
    const focusTimer = window.setTimeout(() => {
      if (!released && document.activeElement === trigger.current) {
        panel.current?.querySelector<HTMLElement>(".menu-link")?.focus({ preventScroll: true });
      }
    }, reduced ? 0 : 500);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        close();
      } else if (event.key === "Tab") {
        const focusable = Array.from(header.querySelectorAll<HTMLElement>(
          '.menu-layer a[href], .menu-layer button:not([disabled])',
        )).filter(element => !element.closest("[inert]") && element.getClientRects().length > 0);
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        event.preventDefault();
        event.stopImmediatePropagation();
        if (focusable.length) {
          const next = index < 0 ? (event.shiftKey ? focusable.length - 1 : 0)
            : (index + (event.shiftKey ? -1 : 1) + focusable.length) % focusable.length;
          focusable[next].focus();
        }
      }
    };
    const preventBackgroundScroll = (event: WheelEvent | TouchEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(".menu-project-stack, .menu-body")) event.preventDefault();
    };
    document.addEventListener("keydown", onKey, true);
    document.addEventListener("wheel", preventBackgroundScroll, { capture: true, passive: false });
    document.addEventListener("touchmove", preventBackgroundScroll, { capture: true, passive: false });
    return () => {
      window.clearTimeout(focusTimer);
      release();
      document.removeEventListener("keydown", onKey, true);
      document.removeEventListener("wheel", preventBackgroundScroll, true);
      document.removeEventListener("touchmove", preventBackgroundScroll, true);
    };
  }, [open, reduced, isProject, close]);

  const selectProject = (event: MouseEvent<HTMLAnchorElement>, projectId: string) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    close(false);
    // Keep a persistent return target; selecting the current case has no new heading to focus.
    if (!isProject || projectId === projectNavigation?.projectId) trigger.current?.focus({ preventScroll: true });
    onOpenProject(projectId);
  };
  const act = (callback: () => void) => { close(false); callback(); };
  const projectActions = projectNavigation ? [
    { label: PROJECT_NAV_LABELS.allWork, action: projectNavigation.onClose, description: PROJECT_NAV_LABELS.allWork },
    { label: PROJECT_NAV_LABELS.previous, action: projectNavigation.previous.onSelect, description: `Previous project: ${projectNavigation.previous.title}` },
    { label: PROJECT_NAV_LABELS.next, action: projectNavigation.next.onSelect, description: `Next project: ${projectNavigation.next.title}` },
  ] : [];

  return <header ref={root} className="site-header menu-header" data-menu-open={open}>
    <div className="shell header-inner">
      <a className="nav-brand" href={isProject ? "#work" : "#home"}
        aria-label={`${CONTACT.name}, ${isProject ? "back to work" : "home"}`}
        onClick={projectNavigation ? event => { event.preventDefault(); projectNavigation.onClose(); } : undefined}>
        <img src={theme === "dark" ? "/assets/logo-light.svg" : "/assets/logo.svg"} alt="" width="28" height="28" />
        <span>{CONTACT.name}</span>
      </a>
      {projectNavigation && <button type="button" className="menu-back" ref={projectNavigation.closeRef} onClick={projectNavigation.onClose}>← {PROJECT_NAV_LABELS.allWork}</button>}
      <div className="menu-control-space" aria-hidden="true" />
    </div>
    <div className="menu-backdrop" aria-hidden="true" onClick={() => close()} />
    <div className="menu-layer" role={open ? "dialog" : undefined} aria-modal={open && !isProject ? true : undefined} aria-label={open ? NAV_MENU.label : undefined} data-lenis-prevent>
      <div id={`${id}-projects`} className={`menu-project-stack${expanded ? " expanded" : ""}`}
        aria-hidden={!showProjects || compact} {...(!showProjects || compact ? { inert: "" } : {})}>
        {(expanded ? menuProjects : menuProjects.slice(0, NAV_MENU.initialProjectCount)).map(project => {
          const metric = getProjectMetric(project.evidence);
          return <a key={project.id} href={`#${project.id}`} className="menu-project-card" onClick={event => selectProject(event, project.id)}>
            <div className="menu-project-copy">
              <span className="mono">{project.industry} · {project.tools[0]}</span>
              <h3>{project.menuTitle}</h3>
              <span className="menu-case-label">{NAV_MENU.projectAction} <Arrow /></span>
            </div>
            <div className="menu-project-metric"><span>{metric.value}</span><small>{metric.label}</small></div>
          </a>;
        })}
        <button type="button" className="menu-more" aria-expanded={expanded} aria-controls={`${id}-projects`} onClick={() => setExpanded(!expanded)}>
          <span>{expanded ? NAV_MENU.selectedProjects : NAV_MENU.allProjects}</span><Arrow />
        </button>
      </div>
      <div className="menu-shell">
        <div ref={panel} id={id} className="menu-body" aria-hidden={!open} {...(!open ? { inert: "" } : {})}>
          <nav className="menu-primary" aria-label={isProject ? NAV_MENU.projectControlsLabel : NAV_MENU.primaryLabel}>
            {isProject ? projectActions.map(item =>
              <button type="button" key={item.label} className="menu-link" aria-label={item.description} onClick={() => act(item.action)}>
                <span className="menu-link-row"><span>{item.label}</span><Arrow /></span><span className="menu-rule" />
              </button>,
            ) : NAV_ITEMS.map(item =>
              <a key={item.id} className="menu-link" href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}
                onClick={event => { if (isPlainClick(event)) close(false); }}>
                <span className="menu-link-row"><span>{item.label}</span><Arrow /></span><span className="menu-rule" />
              </a>,
            )}
          </nav>
          <div className="menu-footer">
            <div className="menu-social">
              <span className="mono">{CONTACT.contactEyebrow}</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}<span aria-hidden="true">↗</span></a>
              <a href={CONTACT.linkedInUrl} target="_blank" rel="noreferrer">{CONTACT.linkedInLabel}<span aria-hidden="true">↗</span></a>
            </div>
            <div className="menu-social menu-bottom"><span>{CONTACT.location}</span></div>
          </div>
        </div>
      </div>
      <div className="menu-controls">
        <button type="button" className="theme-toggle" aria-label="Dark mode" aria-pressed={theme === "dark"}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} onClick={onToggleTheme}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></> : <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5a8.5 8.5 0 1 0 10.6 10.6Z" />}
          </svg>
        </button>
        <button ref={trigger} type="button" className="menu-trigger" aria-label={open ? NAV_MENU.close : NAV_MENU.open} aria-expanded={open} aria-controls={id} onClick={() => open ? close() : setOpen(true)}>
          <span /><span />
        </button>
      </div>
    </div>
  </header>;
}
