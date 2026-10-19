import { INDUSTRIES, INDUSTRY_COUNT, PROJECTS, type ProjectEvidence } from "./projects.ts";

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
  { value: "3+", label: "Years end-to-end BI", suffix: "from KPI to delivery" },
  { value: String(INDUSTRY_COUNT), label: "Industries served", suffix: INDUSTRIES.join(" · ") },
  { value: "~70%", label: "Admin workload reduced", suffix: "manual reviews consolidated into one monitoring dashboard" },
];

/** The room's headline. Lives here so the static generator emits it too. */
export const ABOUT_HEADLINE = "I turn messy data into reliable insights.";
export const ABOUT_EMPHASIS = "into reliable insights.";

export const ABOUT_BODY = [
  "I work client-side at STX Next — multiple clients at a time, each with its own systems, vocabulary, and definition of a good number. Requirements don’t always arrive as a written spec; I help define them through working sessions and daily syncs.",
  "The starting point is usually someone else's artifact: a sketch, a design team's mockup, an existing Salesforce report used only as a KPI reference. So the first real task is deciding what the numbers should mean before anything gets modeled.",
];

/** Concrete examples supporting the About Me narrative. */
export const ABOUT_EXAMPLES = [
  {
    title: "From ambiguity to definition.",
    description: "Agree on what the KPIs mean before modeling begins.",
  },
  {
    title: "From sketch to dashboard.",
    description: "Translate supplied designs into working Tableau dashboards.",
  },
];

export const HANDOVER = [
  "A written KPI definition, agreed in working sessions before anything gets built, so the metric reads the same to everyone.",
  "A specification the data engineering team can build against — the model, the grain, and the fields the report needs.",
  "A validation pass against the source systems, every metric reconciled before the dashboard reaches production.",
  "How-to guides, a live demo, and training — so the work keeps running after the engagement ends.",
];

export const HERO = {
  lineOne: "Business intelligence,",
  lineTwo: "built end to end.",
  body: "I define the KPIs, shape the model and access rules, implement the dashboards, and support the handover with documentation and training.",
};
export const SIGNAL = {
  eyebrow: "Selected evidence / Tableau governance",
  fromLabel: "Access paths",
  toLabel: "Access groups",
  caption: "Access consolidated for ~1,500 users, with legitimate access preserved.",
  disclosure: "Count illustration, not an access map.",
  action: "Explore case study",
};
export const WORK_INTRO = "The access rules underneath. The decisions on screen. Six projects showing what I own, how I build, and how the work is checked.";
export const PROTOTYPE_PREVIEW = {
  label: "Internal prototype · dummy data",
  title: "From supplied mockup to native QuickSight.",
  credit: "Implementation from a supplied mockup, built in STX Next’s internal environment. Four connected views, with conditional formatting and drill-down navigation.",
  annotation: "Fleet view: status prioritization, health scores, and selected-pair details bring a 2,000+ asset scenario into one analytical view.",
  boundary: "No production deployment or adoption claim.",
};

export const NOT_FOUND = {
  title: "This page is outside the pattern.",
  body: "The link may have moved. The work is still here.",
  action: "Return to the portfolio",
};
