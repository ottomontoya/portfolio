export type ChartKind = "areaDown" | "areaUp" | "bars" | "lines" | "scatter";

export interface Project {
  id: string;
  n: string;
  title: string;
  client: string;
  role: string;
  summary: string;
  tools: string[];
  scope: string;
  timeline: string;
  metric: { value: string; label: string };
  chart: ChartKind;
  description: string;
  responsibilities: string[];
  impact: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    n: "01",
    title: "Governed Data Access at Scale",
    client: "Cybersecurity SaaS",
    role: "Data Analyst & BI Specialist",
    summary: "Redesigned row-level security in Tableau, reducing 696 access paths to 12 maintainable rules and eliminating all risky data sources.",
    tools: ["Tableau", "Snowflake", "dbt"],
    scope: "End-to-end",
    timeline: "1 yr",
    metric: { value: "696 → 12", label: "Access paths" },
    chart: "areaDown",
    description: "The client's Tableau environment had grown organically, resulting in 696 disparate access paths, dozens of risky data sources with PII exposure, and a folder structure of ~30 team-specific spaces that made governance nearly impossible.\n\nI began by analyzing Tableau usage data, user activity patterns, and data-source configurations to understand the full surface area of the problem. From this analysis I designed a new group-based Row Level Security model that reduced 696 access paths to 3 default cases and 9 special cases, while removing 100% of identified risky data sources.\n\nAlongside the RLS redesign, I restructured content from ~30 team folders into 5 global, access-regulated folders — clearly separating Sandbox, Production, and Staging environments. I defined metrics for stale vs. active content, identified inactive users and leftover assets, and built admin monitoring dashboards that reduced admin workload by approximately 70%.",
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
    id: "p2",
    n: "02",
    title: "Legacy BI Migration for a Global Manufacturer",
    client: "Automotive Manufacturing",
    role: "BI Developer",
    summary: "Rebuilt ~15 legacy internal dashboards as modern Tableau views embedded into the client's internal portal, working from sketch-based designs.",
    tools: ["Tableau"],
    scope: "Implementation",
    timeline: "6 mo",
    metric: { value: "15", label: "Dashboards rebuilt" },
    chart: "bars",
    description: "The client was migrating their internal BI tooling to Tableau and needed their existing dashboards — defined only as sketch-based designs — rebuilt as modern, embeddable views.\n\nI was responsible for translating approximately 15 sketch-based designs into fully functional Tableau dashboards, working with datasets prepared by the data engineering team for each use case. Each dashboard went through iterative review cycles: I submitted completed work, the client provided feedback, and I refined until function and visuals matched both the original sketches and the client's expectations.\n\nIn parallel, I conducted R&D on Tableau Extensions to evaluate how third-party visual components could accelerate future development, offer richer chart types, and reduce reliance on complex calculated fields — simplifying both knowledge transfer and long-term maintenance.",
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
    id: "p3",
    n: "03",
    title: "Unified Analytics for an Open Source Foundation",
    client: "Non-Profit & Open Source",
    role: "BI Consultant",
    summary: "Consolidated Salesforce, web analytics, and GitHub data into a single QuickSight environment with target-oriented KPI dashboards.",
    tools: ["Amazon QuickSight", "Snowflake"],
    scope: "End-to-end",
    timeline: "3 mo",
    metric: { value: "3 → 1", label: "Sources unified" },
    chart: "lines",
    description: "The client's reporting was fragmented across Salesforce, Google Analytics, and GitHub — with no unified view of funnel performance, web engagement, or community activity. The goal was to bring all three sources together in one BI environment built on Amazon QuickSight and Snowflake.\n\nWorking from high-level requirements rather than detailed mockups, I designed and iterated on dashboard concepts, presented them in weekly reviews, and translated feedback into three production dashboards — one per data source. Each dashboard exposed target-oriented KPIs and growth indicators relevant to that source, giving the client's team a single place to monitor the full picture.\n\nI also created a detailed specification document for the data engineering team, outlining the required fields, grain, and source systems for each dashboard to ensure upstream Snowflake models delivered exactly what reporting needed. After implementation I performed data validation and iterative refinement to ensure metrics matched source-system expectations before handoff.",
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
    id: "p4",
    n: "04",
    title: "Revenue Reporting & Workflow Apps for an Energy Company",
    client: "Energy & Digital Assets",
    role: "BI & Workflow Applications Developer",
    summary: "Built revenue reporting dashboards and interactive Retool workflow apps to automate manual processes and improve data quality.",
    tools: ["Amazon QuickSight", "Retool", "AWS"],
    scope: "End-to-end",
    timeline: "Ongoing",
    metric: { value: "Auto.", label: "Manual workflows" },
    chart: "areaUp",
    description: "The client needed both reporting visibility and operational tooling — revenue dashboards in Amazon QuickSight and form-driven workflow applications in Retool to replace error-prone manual processes.\n\nIn QuickSight I designed and implemented scheduled revenue reports, working from high-level requirements and mockups co-created with a product designer and the client. In Retool I built highly interactive, data-entry-oriented applications with many dynamic fields, conditional logic, and validation rules to minimize user error and ensure data quality in complex operational workflows.\n\nRequirements were gathered and refined through daily syncs and working sessions with the client's team. These sessions also served as live demos and training — walking the client through functionality, capturing feedback, and ensuring the team could use the tools confidently in daily operations. I also produced how-to guides and documentation to support ongoing adoption.",
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
    id: "p5",
    n: "05",
    title: "Rationalized BI for an Email Client Product Team",
    client: "Software Product — Email Client",
    role: "BI Consultant",
    summary: "Standardized a fragmented Salesforce reporting landscape by introducing QuickSight and consolidating many overlapping dashboards into flexible KPI views.",
    tools: ["Amazon QuickSight", "Neon", "Salesforce"],
    scope: "End-to-end",
    timeline: "3 mo",
    metric: { value: "Many → Few", label: "Rationalized" },
    chart: "scatter",
    description: "The client had accumulated many disconnected Salesforce reports — standalone charts, overlapping dashboards, and separate versions for each time grain (daily, weekly, monthly, quarterly, annual). The goal was to rationalize this landscape and build a unified, flexible BI structure in Amazon QuickSight.\n\nI helped evaluate BI tools and led the recommendation toward QuickSight based on the client's Salesforce setup and long-term needs. From there I designed KPI-oriented mockups largely from scratch, using existing Salesforce reports and continuous client feedback as input, and implemented a unified dashboard structure where users could switch between daily, weekly, monthly, quarterly, and yearly views — replacing the many near-duplicate dashboards with a small, flexible set.\n\nI also built out the full QuickSight project structure: folders, user groups, core dashboards, data sources connected to Neon, and scheduled refreshes — ensuring a smooth, company-wide rollout with up-to-date data and minimal manual work for the client's team.",
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
