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
  { value: String(INDUSTRY_COUNT), label: "Industries served", suffix: INDUSTRIES.join(" · ") },
  { value: "~70%", label: "Admin workload reduced", suffix: "manual reviews consolidated into one monitoring dashboard" },
  { value: "3+", label: "Years end-to-end BI", suffix: "from KPI to delivery" },
];

/** The room's headline. Lives here so the static generator emits it too. */
export const ABOUT_HEADLINE = "I turn messy data into reliable insights.";
export const ABOUT_EMPHASIS = "into reliable insights.";

export const ABOUT_BODY = [
  "I work client-side at STX Next — multiple clients at a time, each with its own systems, vocabulary, and definition of a good number. Requirements arrive in working sessions and daily syncs, not as a written spec.",
  "The starting point is usually someone else's artifact: a sketch, a design team's mockup, an existing Salesforce report used only as a KPI reference. So the first real task is deciding what the numbers should mean before anything gets modeled.",
  "What I hand over reflects that. The dashboard is the middle of the job, not the end of it.",
];

/** Two verified figures, in the Stat Block pattern: serif value, plain label, mono qualifier. */
export interface LedgerEntry {
  value: string;
  label: string;
  note: string;
}

export const ABOUT_LEDGER: LedgerEntry[] = [
  {
    value: "100%",
    label: "of identified PII-exposed data sources retired",
    note: "Tableau access governance · ~1,500 users",
  },
  {
    value: "3 wks – ~12 mos",
    label: "Engagement range, kickoff to handover",
    note: "multiple clients · shortest to longest",
  },
];

export const HANDOVER = [
  "A written KPI definition, agreed in working sessions before anything gets built, so the metric reads the same to everyone.",
  "A specification the data engineering team can build against — the model, the grain, and the fields the report needs.",
  "A validation pass against the source systems, every metric reconciled before the dashboard reaches production.",
  "How-to guides, a live demo, and training — so the work keeps running after the engagement ends.",
];
