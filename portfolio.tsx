/*
  PORTFOLIO SITE
  ─────────────────────────────────────────────────────
  To run locally:
    npm create vite@latest portfolio -- --template react
    npm install framer-motion
    Copy this file to src/App.jsx

  To deploy on Vercel:
    Push to GitHub → Import in vercel.com → Deploy (zero config for Vite/React)

  FONTS: Peace Sans and Open Sauce are loaded via @import below.
  COLORS: Edit the THEME object to change all colors site-wide.
  PROJECTS: Edit the PROJECTS array to update project data.
  ABOUT: Edit the ABOUT object to update personal info.
*/

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── THEME CONFIG ───────────────────────────────────────
const THEME = {
  carbonBlack: "#262620",
  palmLeaf:    "#899878",
  beige:       "#e4e6c3",
};

// ─── TYPES ──────────────────────────────────────────────
type Project = {
  id: string;
  title: string;
  industry: string;
  role: string;
  tools: string[];
  summary: string;
  description: string;
  responsibilities: string[];
  impact: string;
};

// ─── PROJECTS DATA ──────────────────────────────────────
const PROJECTS = [
  {
    id: "cybersecurity-saas",
    title: "Governed Data Access at Scale",
    industry: "Cybersecurity SaaS",
    role: "Data Analyst & BI Specialist",
    tools: ["Tableau", "Snowflake", "dbt"],
    summary: "Redesigned row-level security in Tableau, reducing 696 access paths to 12 maintainable rules and eliminating all risky data sources.",
    description: `The client's Tableau environment had grown organically, resulting in 696 disparate access paths, dozens of risky data sources with PII exposure, and a folder structure of ~30 team-specific spaces that made governance nearly impossible.

I began by analyzing Tableau usage data, user activity patterns, and data-source configurations to understand the full surface area of the problem. From this analysis I designed a new group-based Row Level Security model that reduced 696 access paths to 3 default cases and 9 special cases, while removing 100% of identified risky data sources.

Alongside the RLS redesign, I restructured content from ~30 team folders into 5 global, access-regulated folders — clearly separating Sandbox, Production, and Staging environments. I defined metrics for stale vs. active content, identified inactive users and leftover assets, and built admin monitoring dashboards that reduced admin workload by approximately 70%.

I also contributed light dbt work for metadata tagging in a dbt → Snowflake → Tableau stack, maintained the Data Catalog, and prepared documentation, demos, and onboarding materials so the entire user base could adopt the redesigned model smoothly.`,
    responsibilities: [
      "Analyzed Tableau usage data, user activity, and PII exposure across all data sources",
      "Designed group-based RLS model reducing 696 access paths to 12 rules",
      "Restructured ~30 team folders into 5 global, access-regulated folders",
      "Built admin monitoring dashboards reducing admin workload ~70%",
      "Maintained Data Catalog with dbt tagging and metadata in Snowflake",
      "Prepared documentation, demos, and onboarding materials for all users",
    ],
    impact: "696 → 12 access paths. 100% risky data sources removed. ~70% reduction in admin workload.",
  },
  {
    id: "automotive-bi-migration",
    title: "Legacy BI Migration for a Global Manufacturer",
    industry: "Automotive Manufacturing",
    role: "BI Developer",
    tools: ["Tableau"],
    summary: "Rebuilt ~15 legacy internal dashboards as modern Tableau views embedded into the client's internal portal, working from sketch-based designs.",
    description: `The client was migrating their internal BI tooling to Tableau and needed their existing dashboards — defined only as sketch-based designs — rebuilt as modern, embeddable views.

I was responsible for translating approximately 15 sketch-based designs into fully functional Tableau dashboards, working with datasets prepared by the data engineering team for each use case. Each dashboard went through iterative review cycles: I submitted completed work, the client provided feedback, and I refined until function and visuals matched both the original sketches and the client's expectations.

In parallel, I conducted R&D on Tableau Extensions to evaluate how third-party visual components could accelerate future development, offer richer chart types, and reduce reliance on complex calculated fields — simplifying both knowledge transfer and long-term maintenance.

I also collaborated closely with teammates responsible for embedding the dashboards into the client's internal portal, aligning on technical constraints and ensuring every dashboard was integration-ready.`,
    responsibilities: [
      "Rebuilt ~15 dashboards from sketch-based designs end-to-end in Tableau",
      "Worked with datasets prepared by the data engineering team per use case",
      "Iterated based on client feedback through multiple review cycles",
      "Researched Tableau Extensions to expand visual options and simplify maintenance",
      "Coordinated with embedding team on technical constraints and integration readiness",
    ],
    impact: "Full legacy dashboard suite migrated. Dashboards embedded and live in the client's internal portal.",
  },
  {
    id: "nonprofit-unified-analytics",
    title: "Unified Analytics for an Open Source Foundation",
    industry: "Non-Profit & Open Source",
    role: "BI Consultant",
    tools: ["Amazon QuickSight", "Snowflake"],
    summary: "Consolidated Salesforce, web analytics, and GitHub data into a single QuickSight environment with target-oriented KPI dashboards.",
    description: `The client's reporting was fragmented across Salesforce, Google Analytics, and GitHub — with no unified view of funnel performance, web engagement, or community activity. The goal was to bring all three sources together in one BI environment built on Amazon QuickSight and Snowflake.

Working from high-level requirements rather than detailed mockups, I designed and iterated on dashboard concepts, presented them in weekly reviews, and translated feedback into three production dashboards — one per data source. Each dashboard exposed target-oriented KPIs and growth indicators relevant to that source, giving the client's team a single place to monitor the full picture.

I also created a detailed specification document for the data engineering team, outlining the required fields, grain, and source systems for each dashboard to ensure upstream Snowflake models delivered exactly what reporting needed. After implementation I performed data validation and iterative refinement to ensure metrics matched source-system expectations before handoff.`,
    responsibilities: [
      "Designed and built three QuickSight dashboards on top of Snowflake data",
      "Gathered requirements and iterated through weekly client reviews",
      "Defined target-oriented KPIs including growth indicators for GitHub and user activity",
      "Created data specification documents for the data engineering team",
      "Performed data validation to ensure metrics matched source-system expectations",
    ],
    impact: "Three data sources unified in one BI environment. Client can monitor funnel, web, and community in a single view.",
  },
  {
    id: "energy-reporting-apps",
    title: "Revenue Reporting & Workflow Apps for an Energy Company",
    industry: "Energy & Digital Assets",
    role: "BI & Workflow Applications Developer",
    tools: ["Amazon QuickSight", "Retool", "AWS"],
    summary: "Built revenue reporting dashboards and interactive Retool workflow apps to automate manual processes and improve data quality.",
    description: `The client needed both reporting visibility and operational tooling — revenue dashboards in Amazon QuickSight and form-driven workflow applications in Retool to replace error-prone manual processes.

In QuickSight I designed and implemented scheduled revenue reports, working from high-level requirements and mockups co-created with a product designer and the client. In Retool I built highly interactive, data-entry-oriented applications with many dynamic fields, conditional logic, and validation rules to minimize user error and ensure data quality in complex operational workflows.

Requirements were gathered and refined through daily syncs and working sessions with the client's team. These sessions also served as live demos and training — walking the client through functionality, capturing feedback, and ensuring the team could use the tools confidently in daily operations. I also produced how-to guides and documentation to support ongoing adoption.`,
    responsibilities: [
      "Gathered and refined reporting and workflow requirements directly from the client",
      "Built QuickSight dashboards for fixed-schedule revenue reporting",
      "Developed Retool apps with dynamic fields, conditional logic, and validation rules",
      "Collaborated with a product designer on high-level mockups before implementation",
      "Led working sessions, demos, and training so the client's team could adopt the tools",
      "Produced how-to guides and documentation for ongoing use",
    ],
    impact: "Manual processes automated. Data quality improved through validation guardrails. Client team fully onboarded.",
  },
  {
    id: "email-client-salesforce",
    title: "Rationalized BI for an Email Client Product Team",
    industry: "Software Product — Email Client",
    role: "BI Consultant",
    tools: ["Amazon QuickSight", "Neon", "Salesforce"],
    summary: "Standardized a fragmented Salesforce reporting landscape by introducing QuickSight and consolidating many overlapping dashboards into flexible KPI views.",
    description: `The client had accumulated many disconnected Salesforce reports — standalone charts, overlapping dashboards, and separate versions for each time grain (daily, weekly, monthly, quarterly, annual). The goal was to rationalize this landscape and build a unified, flexible BI structure in Amazon QuickSight.

I helped evaluate BI tools and led the recommendation toward QuickSight based on the client's Salesforce setup and long-term needs. From there I designed KPI-oriented mockups largely from scratch, using existing Salesforce reports and continuous client feedback as input, and implemented a unified dashboard structure where users could switch between daily, weekly, monthly, quarterly, and yearly views — replacing the many near-duplicate dashboards with a small, flexible set.

I also built out the full QuickSight project structure: folders, user groups, core dashboards, data sources connected to Neon, and scheduled refreshes — ensuring a smooth, company-wide rollout with up-to-date data and minimal manual work for the client's team.`,
    responsibilities: [
      "Supported BI tool evaluation and recommended Amazon QuickSight",
      "Designed KPI-oriented mockups from scratch using Salesforce reports as input",
      "Built unified dashboards with flexible time-range switching (daily → yearly)",
      "Consolidated many overlapping dashboards into a small, maintainable set",
      "Designed full QuickSight structure: folders, user groups, data sources, schedules",
      "Configured Neon data sources with scheduled refreshes for reliable, timely data",
    ],
    impact: "Fragmented Salesforce reports consolidated. Company-wide QuickSight rollout delivered with full structure and governance.",
  },
];

// ─── ABOUT DATA ─────────────────────────────────────────
const ABOUT = {
  name: "Data Analyst",
  tagline: "Turning complex data into clear, reliable insights.",
  bio: `I'm a Data Analyst with a Bachelor's in Informatics Engineering and Digital Business. I work end-to-end across the BI stack — from understanding business questions and defining KPIs, to designing dashboards, to building the governance models that keep data secure and trustworthy.

I specialize in Tableau and Amazon QuickSight, and I've built interactive reporting and internal tools with Retool across industries including e-commerce, education, non-profit, energy, and cybersecurity.

What I enjoy most is the combination of problem-solving and communication — translating messy requirements into clean data models and intuitive dashboards, and working closely with stakeholders so solutions fit real workflows. I care deeply about data quality, documentation, and governance so insights are reliable and repeatable, not just interesting.`,
  interests: ["Data governance", "Analytics engineering", "Dashboard design", "Stakeholder collaboration", "Data quality"],
  workStyle: [
    "I gather requirements through working sessions and daily syncs, turning high-level ideas into concrete specs.",
    "I validate metrics against source systems before any dashboard goes to production.",
    "I write documentation and run demos so teams can actually use what I build.",
    "I adapt quickly to different industries and domains — the data problems are often more similar than they appear.",
  ],
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ottomontoya/", icon: "ti-brand-linkedin" },
  ],
  experience: [
    { role: "Data Analyst", company: "STX Next", period: "Present" },
    { role: "Jr. Data Analyst", company: "STX Next", period: "2024-2025" },
    { role: "Jr. Data Analyst", company: "Inquire Business Consulting", period: "2023-2024" },
    { role: "Software Engineer Intern", company: "Inquire Business Consulting", period: "Internship - 2023" },
  ],
};

const SKILLS = {
  education: [
    {
      title: "Data Science and Machine Learning: Making Data-Driven Decisions",
      institution: "MIT Schwarzman College of Computing",
      period: "Recent",
      desc: "Advanced modeling, experimentation, and decision-making with data.",
    },
    {
      title: "Python Data Structure",
      institution: "Universidad Austral",
      period: "Prior",
      desc: "Foundations of Python data structures for analytics workflows.",
    },
    {
      title: "Bachelor's Degree in Informatics Engineering and Digital Business",
      institution: "Universidad Anáhuac Mayab",
      period: "Undergraduate",
      desc: "Core computing, systems, and digital business foundations.",
    },
  ],
  toolGroups: [
    {
      label: "BI & Visualization",
      tools: ["Tableau", "Tableau Online", "Amazon QuickSight", "Power BI"],
    },
    {
      label: "Data & Cloud",
      tools: ["Snowflake", "Amazon Athena", "Amazon S3", "Neon", "Azure ETL"],
    },
    {
      label: "Dev & Workflow",
      tools: ["Retool", "SQL", "Python", "Pandas", "Jupyter", "dbt", "ETL pipelines"],
    },
    {
      label: "Supporting",
      tools: ["Excel-based BI", "Laravel / PHP", "Dashboard embedding", "Tableau Extensions"],
    },
  ],
  soft: [
    "Translate ambiguous requirements into concrete data models and dashboards through structured discovery.",
    "Run working sessions, live demos, and walkthroughs that build stakeholder confidence.",
    "Communicate complex data topics in plain language — adapting depth for technical and non-technical audiences.",
    "Take ownership from discovery through implementation and adoption, not just delivery.",
    "Collaborate across product, data engineering, design, and business teams.",
    "Coach users on new tools and dashboards to ensure adoption sticks.",
    "Maintain strong attention to detail in data quality, documentation, and governance.",
    "Adapt quickly to new industries — delivering reliable insights regardless of domain.",
  ],
};

// ─── ANIMATION VARIANTS ─────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── STYLES ─────────────────────────────────────────────
const css = `
  @font-face {
    font-family: 'Peace Sans';
    src: url('/fonts/PeaceSans-Webfont.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Open Sauce Sans';
    src: url('/fonts/OpenSauceSans-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --carbon: #262620;
    --palm:   #899878;
    --beige:  #e4e6c3;
    --bg:     #e4e6c3;
    --fg:     #262620;
    --muted:  #5a5c4e;
    --accent: #899878;
    --card:   #d8dab0;
    --border: rgba(38,38,32,0.12);
  }
  [data-theme="dark"] {
    --bg:     #262620;
    --fg:     #e4e6c3;
    --muted:  #9a9c8a;
    --accent: #899878;
    --card:   #2e2e28;
    --border: rgba(228,230,195,0.1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root {
    background: var(--bg);
    color: var(--fg);
    font-family: 'Open Sauce Sans', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.7;
    transition: background 0.3s, color 0.3s;
    min-height: 100vh;
  }

  h1,h2,h3,h4 {
    font-family: 'Peace Sans', system-ui, sans-serif;
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  a { color: var(--accent); text-decoration: none; }
  a:hover { text-decoration: underline; }

  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
    transition: background 0.3s;
  }
  .nav-logo { font-weight: 600; font-size: 15px; color: var(--fg); cursor: pointer; letter-spacing: 0.03em; }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-link {
    font-size: 14px; color: var(--muted); background: none; border: none;
    cursor: pointer; font-family: inherit; padding: 0;
    transition: color 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--fg); }
  .nav-link.active { font-weight: 600; }
  .theme-btn {
    background: none; border: 1px solid var(--border); border-radius: 20px;
    padding: 4px 12px; font-size: 13px; cursor: pointer; color: var(--muted);
    font-family: inherit; transition: all 0.2s; margin-left: 1rem;
  }
  .theme-btn:hover { color: var(--fg); border-color: var(--accent); }

  .page { padding-top: 60px; min-height: 100vh; }
  .container { max-width: 900px; margin: 0 auto; padding: 0 2rem; }

  .hero {
    min-height: calc(100vh - 60px);
    display: flex; flex-direction: column; justify-content: center;
    padding: 5rem 0 3rem;
  }
  .hero-eyebrow {
    font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 1.5rem; font-weight: 600;
  }
  .hero-title { font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 600; margin-bottom: 1.5rem; }
  .hero-sub { font-size: 1.15rem; color: var(--muted); max-width: 540px; line-height: 1.8; margin-bottom: 2.5rem; }
  .cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 22px; border-radius: 4px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: inherit; transition: all 0.2s; border: none;
  }
  .btn-primary { background: var(--accent); color: var(--beige); }
  .btn-primary:hover { opacity: 0.88; }
  .btn-outline {
    background: none; border: 1.5px solid var(--border);
    color: var(--fg);
  }
  .btn-outline:hover { border-color: var(--accent); color: var(--accent); }

  .section { padding: 5rem 0; }
  .section-label {
    font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--accent); font-weight: 600; margin-bottom: 2.5rem;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .section-title { font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 1.5rem; }

  .teaser-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5px; margin-top: 1rem; }
  .teaser-card {
    background: var(--card); padding: 2rem;
    cursor: pointer; transition: background 0.2s;
    border-radius: 2px;
  }
  .teaser-card:hover { background: var(--accent); }
  .teaser-card:hover * { color: var(--beige) !important; }
  .teaser-card h3 { font-size: 1.05rem; margin-bottom: 0.5rem; }
  .teaser-card p { font-size: 14px; color: var(--muted); line-height: 1.6; }
  .teaser-arrow { font-size: 1.4rem; margin-top: 1.5rem; color: var(--accent); }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .bio-text { font-size: 1rem; color: var(--muted); line-height: 1.85; white-space: pre-line; }
  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 1.5rem; }
  .tag {
    padding: 4px 12px; border-radius: 2px;
    background: var(--card); font-size: 13px; color: var(--muted);
    border: 1px solid var(--border);
  }
  .work-style-list { list-style: none; }
  .work-style-list li {
    padding: 1rem 0; border-bottom: 1px solid var(--border);
    font-size: 15px; color: var(--muted); line-height: 1.7;
  }
  .work-style-list li:first-child { border-top: 1px solid var(--border); }
  .exp-list { margin-top: 1.5rem; }
  .exp-item { padding: 0.8rem 0; border-bottom: 1px solid var(--border); }
  .exp-role { font-weight: 600; font-size: 15px; }
  .exp-meta { font-size: 13px; color: var(--muted); }

  .edu-list { display: flex; flex-direction: column; gap: 1.5px; }
  .edu-card {
    background: var(--card); padding: 1.5rem 2rem;
    border-radius: 2px;
  }
  .edu-title { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
  .edu-inst { font-size: 13px; color: var(--accent); margin-bottom: 6px; }
  .edu-desc { font-size: 14px; color: var(--muted); }

  .tool-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5px; align-items: stretch; }
  .tool-grid > * { display: flex; }
  .tool-group { background: var(--card); padding: 1.5rem; border-radius: 2px; width: 100%; }
  .tool-group-label { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 1rem; }
  .tool-items { display: flex; flex-direction: column; gap: 6px; }
  .tool-item { font-size: 14px; color: var(--muted); }

  .soft-list { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; align-items: stretch; }
  .soft-list > * { display: flex; }
  .soft-item {
    background: var(--card); padding: 1.25rem 1.5rem;
    font-size: 14px; color: var(--muted); line-height: 1.65;
    border-radius: 2px; width: 100%;
  }
  .soft-item::before { content: '—'; color: var(--accent); margin-right: 8px; font-weight: 600; }

  .project-list { display: flex; flex-direction: column; gap: 1.5px; }
  .project-row {
    display: grid; grid-template-columns: 1fr auto;
    align-items: center; gap: 2rem;
    background: var(--card); padding: 1.75rem 2rem;
    cursor: pointer; transition: background 0.2s; border-radius: 2px;
  }
  .project-row:hover { background: var(--accent); }
  .project-row:hover * { color: var(--beige) !important; }
  .project-row-title { font-size: 1.05rem; font-weight: 600; margin-bottom: 4px; }
  .project-row-meta { font-size: 13px; color: var(--muted); }
  .project-row-tools { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .pill {
    font-size: 12px; padding: 2px 10px; border-radius: 10px;
    background: var(--border); color: var(--muted);
    border: 1px solid var(--border);
  }
  .project-row-arrow { font-size: 1.4rem; color: var(--accent); flex-shrink: 0; }

  .project-detail { max-width: 700px; margin: 0 auto; padding: 3rem 2rem 5rem; }
  .detail-back {
    background: none; border: none; cursor: pointer; font-family: inherit;
    font-size: 14px; color: var(--muted); display: flex; align-items: center; gap: 6px;
    padding: 0; margin-bottom: 3rem; transition: color 0.2s;
  }
  .detail-back:hover { color: var(--accent); }
  .detail-eyebrow { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 1rem; }
  .detail-title { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 2rem; }
  .detail-meta { display: flex; gap: 2rem; flex-wrap: wrap; padding: 1.5rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); margin-bottom: 2.5rem; }
  .detail-meta-item label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); display: block; font-weight: 600; margin-bottom: 4px; }
  .detail-meta-item span { font-size: 14px; color: var(--fg); }
  .detail-body { font-size: 15px; color: var(--muted); line-height: 1.85; white-space: pre-line; margin-bottom: 2.5rem; }
  .detail-section-title { font-size: 1rem; font-weight: 600; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.08em; font-size: 12px; color: var(--accent); }
  .resp-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 2.5rem; }
  .resp-list li { font-size: 15px; color: var(--muted); padding-left: 1.2rem; position: relative; line-height: 1.65; }
  .resp-list li::before { content: '—'; position: absolute; left: 0; color: var(--accent); }
  .impact-box { background: var(--card); padding: 1.5rem 2rem; border-radius: 2px; border-left: 3px solid var(--accent); }
  .impact-box p { font-size: 15px; color: var(--muted); }

  .contact-section { text-align: center; padding: 5rem 0 6rem; }
  .contact-title { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 1rem; }
  .contact-sub { color: var(--muted); margin-bottom: 2.5rem; font-size: 1.05rem; }

  @media (max-width: 700px) {
    .nav { padding: 0 1.2rem; }
    .nav-links { gap: 1rem; }
    .container { padding: 0 1.2rem; }
    .hero { padding: 3rem 0 2rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .soft-list { grid-template-columns: 1fr; }
    .project-row { grid-template-columns: 1fr; }
    .project-row-arrow { display: none; }
  }
`;

// ─── APP ─────────────────────────────────────────────────
export default function App() {
  const [theme, setTheme] = useState("light");
  const [page, setPage] = useState("home");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => { window.scrollTo(0, 0); }, [page, activeProject]);

  const nav = (p: string) => { setPage(p); setActiveProject(null); };

  return (
    <>
      <style>{css}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={() => nav("home")}>Otto Montoya</div>
        <div className="nav-links">
          {["home","about","skills","projects"].map(p => (
            <button key={p} className={`nav-link${page===p?" active":""}`} onClick={() => nav(p)}>
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
          <button className="theme-btn" onClick={() => setTheme(t => t==="light"?"dark":"light")}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </nav>

      <div className="page">
        <AnimatePresence mode="wait">
          {page === "home" && <HomePage key="home" nav={nav} />}
          {page === "about" && <AboutPage key="about" nav={nav} />}
          {page === "skills" && <SkillsPage key="skills" />}
          {page === "projects" && !activeProject && <ProjectsPage key="projects" onSelect={setActiveProject} />}
          {page === "projects" && activeProject && <ProjectDetail key={activeProject.id} project={activeProject} onBack={() => setActiveProject(null)} />}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────
function HomePage({ nav }: { nav: (p: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="container">
        <div className="hero">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="hero-eyebrow">Data Analyst · BI Specialist</motion.p>
            <motion.h1 variants={fadeUp} className="hero-title">
              Clear insights<br />from complex data.
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-sub">
              {ABOUT.tagline} I work end-to-end across the BI stack — from KPI definition to dashboard delivery and data governance.
            </motion.p>
            <motion.div variants={fadeUp} className="cta-row">
              <button className="btn btn-primary" onClick={() => nav("projects")}>View projects →</button>
              <button className="btn btn-outline" onClick={() => nav("about")}>About me</button>
            </motion.div>
          </motion.div>
        </div>

        <section className="section">
          <FadeIn><div className="section-label">What I do</div></FadeIn>
          <div className="teaser-grid">
            {[
              { title: "About", text: "Background, interests, and how I work.", page: "about" },
              { title: "Skills", text: "BI tools, data platforms, and soft skills.", page: "skills" },
              { title: "Projects", text: "Five projects across five industries.", page: "projects" },
            ].map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.08}>
                <div className="teaser-card" onClick={() => nav(t.page)}>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <div className="teaser-arrow">→</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="section">
          <FadeIn><div className="section-label">Selected projects</div></FadeIn>
          <div className="project-list">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.06}>
                <div className="project-row" onClick={() => { nav("projects"); }}>
                  <div>
                    <div className="project-row-title">{p.title}</div>
                    <div className="project-row-meta">{p.industry} · {p.role}</div>
                    <div className="project-row-tools">
                      {p.tools.map(t => <span key={t} className="pill">{t}</span>)}
                    </div>
                  </div>
                  <div className="project-row-arrow">→</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <FadeIn>
            <div className="section-label">Get in touch</div>
            <h2 className="contact-title">Let's work together.</h2>
            <p className="contact-sub">Open to new projects and collaborations.</p>
            <a href="mailto:ottomontoya.work@icloud.com" className="btn btn-primary">Say hello →</a>
          </FadeIn>
        </section>
      </div>
    </motion.div>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────
function AboutPage({ nav }: { nav: (p: string) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <FadeIn><div className="section-label">About</div></FadeIn>
        <FadeIn><h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3rem" }}>I turn messy data into reliable insights.</h1></FadeIn>

        <div className="about-grid">
          <div>
            <FadeIn>
              <p className="bio-text">{ABOUT.bio}</p>
              <div className="tag-row">
                {ABOUT.interests.map(i => <span key={i} className="tag">{i}</span>)}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ marginTop: "3rem" }}>
                <div className="section-label" style={{ marginBottom: "1rem" }}>Experience</div>
                <div className="exp-list">
                  {ABOUT.experience.map(e => (
                    <div key={e.role+e.company} className="exp-item">
                      <div className="exp-role">{e.role}</div>
                      <div className="exp-meta">{e.company} · {e.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.12}>
              <div className="section-label" style={{ marginBottom: "1rem" }}>How I work</div>
              <ul className="work-style-list">
                {ABOUT.workStyle.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div style={{ marginTop: "2.5rem" }}>
                <div className="section-label" style={{ marginBottom: "1rem" }}>Find me</div>
                {ABOUT.links.map(l => (
                  <a key={l.label} href={l.url} className="btn btn-outline" style={{ display: "inline-flex", marginRight: "10px" }}>{l.label} →</a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SKILLS PAGE ─────────────────────────────────────────
function SkillsPage() {
  const softListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const equalize = () => {
      if (!softListRef.current) return;
      const items = softListRef.current.querySelectorAll<HTMLElement>(".soft-item");
      items.forEach(el => { el.style.height = "auto"; });
      let max = 0;
      items.forEach(el => { max = Math.max(max, el.offsetHeight); });
      items.forEach(el => { el.style.height = `${max}px`; });
    };
    document.fonts.ready.then(equalize);
    window.addEventListener("resize", equalize);
    return () => window.removeEventListener("resize", equalize);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <FadeIn><div className="section-label">Skills</div></FadeIn>
        <FadeIn><h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3rem" }}>Tools, knowledge, and ways of working.</h1></FadeIn>

        <section className="section" style={{ paddingTop: "0" }}>
          <FadeIn><div className="section-label">Education & certifications</div></FadeIn>
          <div className="edu-list">
            {SKILLS.education.map((e, i) => (
              <FadeIn key={e.title} delay={i * 0.07}>
                <div className="edu-card">
                  <div className="edu-title">{e.title}</div>
                  <div className="edu-inst">{e.institution}</div>
                  <div className="edu-desc">{e.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: "0" }}>
          <FadeIn><div className="section-label">Tool skills</div></FadeIn>
          <div className="tool-grid">
            {SKILLS.toolGroups.map((g, i) => (
              <FadeIn key={g.label} delay={i * 0.07}>
                <div className="tool-group">
                  <div className="tool-group-label">{g.label}</div>
                  <div className="tool-items">
                    {g.tools.map(t => <span key={t} className="tool-item">— {t}</span>)}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingTop: "0" }}>
          <FadeIn><div className="section-label">Soft skills</div></FadeIn>
          <div className="soft-list" ref={softListRef}>
            {SKILLS.soft.map((s, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="soft-item">{s}</div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

// ─── PROJECTS PAGE ───────────────────────────────────────
function ProjectsPage({ onSelect }: { onSelect: (p: Project) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
        <FadeIn><div className="section-label">Projects</div></FadeIn>
        <FadeIn><h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "3rem" }}>Five projects across five industries.</h1></FadeIn>
        <div className="project-list">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07}>
              <div className="project-row" onClick={() => onSelect(p)}>
                <div>
                  <div className="project-row-title">{p.title}</div>
                  <div className="project-row-meta">{p.industry} · {p.role}</div>
                  <div style={{ marginTop: "6px", fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>{p.summary}</div>
                  <div className="project-row-tools">
                    {p.tools.map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                </div>
                <div className="project-row-arrow">→</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── PROJECT DETAIL ──────────────────────────────────────
function ProjectDetail({ project: p, onBack }: { project: Project; onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}>
      <div className="project-detail">
        <button className="detail-back" onClick={onBack}>← All projects</button>
        <div className="detail-eyebrow">{p.industry}</div>
        <h1 className="detail-title">{p.title}</h1>
        <div className="detail-meta">
          <div className="detail-meta-item"><label>Role</label><span>{p.role}</span></div>
          <div className="detail-meta-item">
            <label>Tools</label>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
              {p.tools.map(t => <span key={t} className="pill">{t}</span>)}
            </div>
          </div>
        </div>
        <div className="detail-body">{p.description}</div>
        <div className="detail-section-title">Responsibilities</div>
        <ul className="resp-list">
          {p.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <div className="detail-section-title">Impact</div>
        <div className="impact-box"><p>{p.impact}</p></div>
      </div>
    </motion.div>
  );
}
