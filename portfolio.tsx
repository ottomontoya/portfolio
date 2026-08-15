import { useState, useEffect, useCallback } from "react";
import "./portfolio.css";
import { PROJECTS } from "./data/projects";
import { Nav } from "./components/Nav";
import { Divider } from "./components/Divider";
import { HeroSection, AboutSection, WorkSection, SkillsSection, ExperienceSection, SiteFooter } from "./components/Sections";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { applyTheme, getInitialTheme, getStoredTheme, persistTheme } from "./utils/theme";

const PROJECT_HISTORY_KEY = "portfolioProject";

function projectIdFromHash() {
  const id = window.location.hash.slice(1);
  return PROJECTS.some(project => project.id === id) ? id : null;
}

function historyStateWithProject(value: boolean) {
  const current = window.history.state;
  const state = current && typeof current === "object" ? current : {};
  return { ...state, [PROJECT_HISTORY_KEY]: value };
}

export default function App() {
  const [dark, setDark] = useState(getInitialTheme);
  const [themeIsExplicit, setThemeIsExplicit] = useState(() => getStoredTheme() !== null);
  const [openId, setOpenId] = useState<string | null>(projectIdFromHash);
  const project = PROJECTS.find(p => p.id === openId) ?? null;

  useEffect(() => { applyTheme(dark); }, [dark]);

  useEffect(() => {
    if (themeIsExplicit) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = (event: MediaQueryListEvent) => setDark(event.matches);
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, [themeIsExplicit]);

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
    window.history.replaceState(historyStateWithProject(openedFromPage), "", `#${id}`);
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

  const toggleTheme = useCallback(() => {
    const next = !dark;
    applyTheme(next);
    persistTheme(next);
    setDark(next);
    setThemeIsExplicit(true);
  }, [dark]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Nav dark={dark} onToggleDark={toggleTheme} />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <Divider from="var(--beige)" to="var(--green)" variant="diagonal" />
        <AboutSection />
        <Divider from="var(--green)" to="var(--beige)" variant="curve" />
        <WorkSection onOpen={openProject} />
        <Divider from="var(--beige)" to="var(--burgundy)" variant="wave" />
        <SkillsSection />
        <Divider from="var(--burgundy)" to="var(--wall-exp)" variant="sine" />
        <ExperienceSection />
      </main>
      <SiteFooter />
      <ProjectOverlay project={project} onClose={closeProject} onNavigate={navigateProject} />
    </>
  );
}
