import { useState, useEffect, useCallback } from "react";
import "./portfolio.css";
import { PROJECTS } from "./data/projects";
import { NOT_FOUND } from "./data/about";
import { Nav } from "./components/Nav";
import {
  HeroSection,
  AboutSection,
  WorkSection,
  SkillsSection,
  ExperienceSection,
  SiteFooter,
} from "./components/Sections";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { useSmoothScroll } from "./utils/useSmoothScroll";
import { useScrollbarVisibility } from "./utils/useScrollbarVisibility";
import { useTheme } from "./utils/useTheme";

const PROJECT_HISTORY_KEY = "portfolioProject";

function projectIdFromHash() {
  const id = window.location.hash.slice(1);
  return PROJECTS.some((project) => project.id === id) ? id : null;
}

function historyStateWithProject(value: boolean) {
  const current = window.history.state;
  const state = current && typeof current === "object" ? current : {};
  return { ...state, [PROJECT_HISTORY_KEY]: value };
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [openId, setOpenId] = useState<string | null>(projectIdFromHash);
  const project = PROJECTS.find((p) => p.id === openId) ?? null;
  useSmoothScroll(Boolean(project));
  useScrollbarVisibility(undefined, !project);

  useEffect(() => {
    const syncProjectFromUrl = () => setOpenId(projectIdFromHash());
    window.addEventListener("hashchange", syncProjectFromUrl);
    window.addEventListener("popstate", syncProjectFromUrl);
    return () => {
      window.removeEventListener("hashchange", syncProjectFromUrl);
      window.removeEventListener("popstate", syncProjectFromUrl);
    };
  }, []);

  const openProject = useCallback((id: string) => {
    window.history.pushState(historyStateWithProject(true), "", `#${id}`);
    setOpenId(id);
  }, []);

  const navigateProject = useCallback((id: string) => {
    const openedFromPage = Boolean(window.history.state?.[PROJECT_HISTORY_KEY]);
    window.history.replaceState(
      historyStateWithProject(openedFromPage),
      "",
      `#${id}`,
    );
    setOpenId(id);
  }, []);

  const closeProject = useCallback(() => {
    if (window.history.state?.[PROJECT_HISTORY_KEY]) {
      window.history.back();
      return;
    }

    window.history.replaceState(
      historyStateWithProject(false),
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    setOpenId(null);
  }, []);

  if (!["/", "/index.html"].includes(window.location.pathname)) {
    return (
      <main className="not-found">
        <a href="/" className="not-found-name">
          Otto Montoya
        </a>
        <div className="not-found-code" aria-hidden="true">
          4<span>0</span>4
        </div>
        <h1>{NOT_FOUND.title}</h1>
        <p>{NOT_FOUND.body}</p>
        <a className="cta cta-primary" href="/">
          {NOT_FOUND.action}
          <span className="arr" aria-hidden="true">
            ↗
          </span>
        </a>
      </main>
    );
  }

  return (
    <>
      <div
        className="site-content"
        aria-hidden={Boolean(project)}
        {...(project ? { inert: "" } : {})}
      >
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main id="main-content" tabIndex={-1}>
          <HeroSection onOpen={openProject} />
          <WorkSection onOpen={openProject} />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
        </main>
        <SiteFooter />
      </div>
      <ProjectOverlay
        project={project}
        theme={theme}
        onClose={closeProject}
        onNavigate={navigateProject}
      />
    </>
  );
}
