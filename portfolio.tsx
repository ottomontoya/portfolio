import { useState, useEffect } from "react";
import "./portfolio.css";
import { PROJECTS } from "./data/projects";
import { Nav } from "./components/Nav";
import { Divider } from "./components/Divider";
import { HeroSection, AboutSection, WorkSection, SkillsSection, ExperienceSection } from "./components/Sections";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { applyTheme } from "./utils/theme";

export default function App() {
  const [dark, setDark] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const project = PROJECTS.find(p => p.id === openId) ?? null;

  useEffect(() => { applyTheme(dark); }, [dark]);

  return (
    <>
      <Nav dark={dark} onToggleDark={() => setDark(d => !d)} />
      <main>
        <HeroSection />
        <Divider from="var(--beige)" to="var(--green)" variant="diagonal" />
        <AboutSection />
        <Divider from="var(--green)" to="var(--beige)" variant="curve" />
        <WorkSection onOpen={setOpenId} />
        <Divider from="var(--beige)" to="var(--burgundy)" variant="wave" />
        <SkillsSection />
        <Divider from="var(--burgundy)" to="var(--ink)" variant="sine" />
        <ExperienceSection />
      </main>
      <ProjectOverlay project={project} onClose={() => setOpenId(null)} />
    </>
  );
}
