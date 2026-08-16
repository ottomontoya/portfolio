import { INDUSTRIES, INDUSTRY_COUNT, PROJECTS, type ProjectEvidence } from "./projects.ts";

const INDUSTRY_LIST = `${INDUSTRIES.slice(0, -1).join(", ")}, and ${INDUSTRIES[INDUSTRIES.length - 1]}`;

export interface Stat {
  value: string;
  label: string;
  suffix: string;
  /** Present on the lead stat only — the ledger draws its evidence mark. */
  evidence?: ProjectEvidence;
}

const accessGovernance = PROJECTS.find(project => project.id === "p1");

export const STATS: Stat[] = [
  {
    value: "696 → 12",
    label: "Access paths consolidated",
    suffix: "for one Tableau deployment · ~1,500 users",
    evidence: accessGovernance?.evidence,
  },
  { value: String(INDUSTRY_COUNT), label: "Industries served", suffix: INDUSTRIES.join(" · ") },
  { value: "~70%", label: "Admin workload reduced", suffix: "manual reviews consolidated into one monitoring dashboard" },
  { value: "3+", label: "Years end-to-end BI", suffix: "from KPI to delivery" },
];

export const ABOUT_BODY = [
  "I'm a Data Analyst with a Bachelor's in Informatics Engineering and Digital Business. From understanding business questions and defining KPIs, to designing dashboards, to building the governance models that keep data secure and trustworthy.",
  `I specialize in Tableau and Amazon QuickSight, and I've built interactive reporting and internal tools with Retool. The projects here span ${INDUSTRY_LIST}.`,
  "What I enjoy most is translating messy requirements into clean data models and intuitive dashboards — and working closely with stakeholders so the result actually fits their workflow.",
];

export const HOW_I_WORK = [
  "I gather requirements through working sessions and daily syncs — high-level ideas into concrete specs.",
  "I validate every metric against source systems before a dashboard goes to production.",
  "I write documentation and run demos so teams can actually use what I build.",
  "I adapt quickly to new industries — the data problems are often more similar than they appear.",
];
