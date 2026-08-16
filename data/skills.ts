export const CAPABILITY_STAGES = [
  {
    phase: "Discover",
    title: "Find the decision behind the request.",
    description: "I turn ambiguous asks into a shared understanding of the business question, the audience, and the workflow the answer needs to support.",
    capabilities: ["Requirements discovery", "Stakeholder working sessions", "Source-system analysis"],
  },
  {
    phase: "Define",
    title: "Make the metric unambiguous.",
    description: "I shape KPIs with business and technical teams, document their logic, and define what a trustworthy result must look like before implementation starts.",
    capabilities: ["KPI definition", "Metric logic", "Acceptance criteria"],
  },
  {
    phase: "Model & govern",
    title: "Build a trustworthy data foundation.",
    description: "I translate reporting needs into models and specifications, validate outputs against source systems, and design access rules that remain secure at scale.",
    capabilities: ["Data modeling", "Governance & RLS", "Data quality & validation"],
  },
  {
    phase: "Design & build",
    title: "Turn complexity into a useful interface.",
    description: "I structure information, choose the right visual form, and implement production dashboards within the real constraints of Tableau, QuickSight, and Power BI.",
    capabilities: ["Dashboard UX", "Information hierarchy", "Native BI implementation"],
  },
  {
    phase: "Enable",
    title: "Make the work stick.",
    description: "I carry delivery through documentation, live demos, training, and iteration so teams understand the result and can confidently use it in their workflow.",
    capabilities: ["Documentation", "Walkthroughs & training", "Adoption support"],
  },
];

export const SKILL_GROUPS = [
  { label: "BI platforms", items: ["Tableau", "Tableau Online", "Amazon QuickSight", "Power BI", "Retool"] },
  { label: "Analytics engineering", items: ["SQL", "dbt", "Python", "Pandas", "Jupyter", "ETL pipelines"] },
  { label: "Data platforms", items: ["Snowflake", "Amazon Athena", "Amazon S3", "Neon", "Azure ETL"] },
  { label: "Delivery & integration", items: ["Excel-based BI", "Dashboard embedding", "Tableau Extensions", "Laravel / PHP"] },
];
