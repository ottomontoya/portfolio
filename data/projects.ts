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
  images?: string[];
  caseStudy?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    n: "01",
    title: "Governed Data Access at Scale",
    client: "Global Cybersecurity Platform",
    role: "Data Analyst & BI Specialist",
    summary: "Redesigned Tableau row-level security for a 1,500-user environment, consolidating 696 ad-hoc access paths into 12 maintainable access groups and retiring every PII-exposed data source.",
    tools: ["Tableau", "Snowflake", "dbt"],
    scope: "End-to-end",
    timeline: "~12 months",
    metric: { value: "696 → 12", label: "Access groups" },
    chart: "areaDown",
    description: "The Tableau environment had grown organically over years, leaving 696 ad-hoc access paths across ~1,500 active users, multiple data sources with PII exposure, and roughly 30 team-specific folders that made governance nearly impossible.\n\nWorking from a usage and risk analysis of the site, I designed a new group-based Row Level Security model that collapsed 696 access paths into 12 access groups (3 default cases and 9 special cases) and retired 100% of the identified risky data sources. Every active user was migrated to the new model with no loss of legitimate access.\n\nAlongside the RLS redesign, I restructured ~30 team folders into 5 global, access-regulated folders, clearly separating Sandbox, Production, and Staging environments. I defined metrics for stale vs. active content and for inactive users and orphaned assets, then consolidated several manual review processes into a single admin monitoring dashboard, cutting ongoing admin workload by approximately 70%.",
    responsibilities: [
      "Designed a group-based RLS model collapsing 696 access paths into 12 access groups across ~1,500 users",
      "Migrated every active user to the new RLS model with no loss of legitimate access",
      "Retired 100% of identified PII-exposed data sources",
      "Restructured ~30 team folders into 5 global, access-regulated folders separating Sandbox, Production, and Staging",
      "Maintained the data catalog with dbt tagging and Snowflake metadata to support RLS enforcement",
      "Unified multiple manual admin review processes into a single Tableau monitoring dashboard for stale content, inactive users, and orphaned assets",
      "Authored governance documentation, admin demos, and user onboarding materials to roll the model out across all teams",
    ],
    impact: "696 ad-hoc access paths consolidated into 12 access groups across ~1,500 users. 100% of PII-exposed data sources removed. ~70% reduction in ongoing admin workload through process unification.",
  },
  {
    id: "p2",
    n: "02",
    title: "Market Research Dashboards for a Global Automotive Manufacturer",
    client: "Leading German Automotive Manufacturer",
    role: "BI Developer",
    summary: "Built the Tableau visualization layer of a custom market research analytics platform, delivering ~15 dashboards from sketch-based designs that surface customer insights by market segment.",
    tools: ["Tableau"],
    scope: "Implementation",
    timeline: "6 mo",
    metric: { value: "15", label: "Dashboards delivered" },
    chart: "bars",
    description: "The client, one of the largest globally recognized German automotive manufacturers, commissioned a custom market research analytics platform to uncover why specific customer segments prefer particular products and inform targeted marketing and production strategies. The platform combined automated data ingestion from sources like SPSS files, a research-oriented data warehouse supporting longitudinal analysis, and cross-tabulation tools for exploring behavioral patterns and trends. My work covered the visualization layer.\n\nI translated approximately 15 sketch-based designs into fully functional Tableau dashboards, working with datasets prepared by the data engineering team for each market research use case. Each dashboard went through iterative review cycles where I submitted completed work, the client provided feedback, and I refined until function and visuals matched both the original sketches and the client's expectations. The dashboards were then embedded into the client's internal portal as part of the platform's enterprise integration.\n\nIn parallel, I conducted R&D on Tableau Extensions to evaluate how third-party visual components could accelerate future development, offer richer chart types, and reduce reliance on complex calculated fields, simplifying both knowledge transfer and long-term maintenance.",
    responsibilities: [
      "Built the Tableau visualization layer for a custom market research analytics platform",
      "Translated ~15 sketch-based designs into production Tableau dashboards end-to-end",
      "Worked with datasets prepared by the data engineering team across multiple market research use cases",
      "Iterated through multiple client review cycles to align function and visuals with expectations",
      "Researched Tableau Extensions to expand visual options and simplify long-term maintenance",
      "Coordinated with the embedding team on technical constraints and integration readiness",
    ],
    impact: "Delivered the full dashboard suite for the platform, live and embedded in the client's internal portal, enabling cross-tabulation and longitudinal analysis of customer behavior to support targeted marketing and production decisions.",
    caseStudy: "https://www.stxnext.com/case-study/market-research-platform",
  },
  {
    id: "p3",
    n: "03",
    title: "BI Layer for an Open Source Foundation's Salesforce Migration",
    client: "Major Open Source Software Foundation",
    role: "BI Consultant",
    summary: "Designed and built three QuickSight dashboards on a Snowflake-backed data layer covering CRM, web analytics, and community activity, all redesigned from scratch as part of the client's move off Salesforce reporting.",
    tools: ["Amazon QuickSight", "Snowflake"],
    scope: "End-to-end",
    timeline: "3 mo",
    metric: { value: "3 → 1", label: "Sources unified" },
    chart: "lines",
    description: "The client, a major open source software foundation, was rebuilding their analytics and reporting away from Salesforce to gain full ownership of their data and reduce platform dependency. The data engineering team migrated source systems into Snowflake, and I was brought in to build the QuickSight dashboard layer that surfaced that data back to the business.\n\nWorking from high-level requirements rather than detailed mockups, I designed and iterated on dashboard concepts, presented them in weekly client reviews, and translated feedback into three production QuickSight dashboards covering Salesforce CRM, web analytics, and GitHub community activity. All three were designed from scratch. For the CRM and web analytics views, existing reports served as reference material for understanding which KPIs the team tracked, but the visualizations, structure, and chart choices were my own design, switched out to be clearer and more concise. The GitHub dashboard had no reference to anchor against and was designed end-to-end from client requirements alone.\n\nI authored a detailed specification document for the data engineering team, outlining required fields, grain, and source systems for each dashboard so the upstream Snowflake models delivered exactly what reporting needed. After implementation I ran data validation and iterative refinement to ensure metrics matched source-system expectations before handoff.",
    responsibilities: [
      "Designed and built three QuickSight dashboards on Snowflake-backed data for CRM, web, and community reporting, iterating through weekly client review cycles",
      "Redesigned the CRM and web analytics views from scratch, using existing reports only as reference for KPI selection and switching out visualizations for clearer, more concise versions",
      "Designed a net-new GitHub community activity dashboard end-to-end from client requirements with no prior dashboard to reference",
      "Authored data specification documents for the data engineering team to align upstream Snowflake models with reporting needs",
      "Performed data validation against source systems to confirm metric accuracy before handoff",
    ],
    impact: "Three data sources unified in a single controlled BI environment, giving the client's team a consolidated view of funnel, web, and community performance independent of Salesforce reporting.",
    caseStudy: "https://www.stxnext.com/case-study/salesforce-optimization",
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
  {
    id: "p6",
    n: "06",
    title: "Real-Time Manufacturing Analytics for a Global Heavy Industry Manufacturer",
    client: "Global Heavy Industry Manufacturer",
    role: "BI Developer",
    summary: "Implemented a four-view real-time manufacturing analytics suite natively in AWS QuickSight from production design mockups, covering furnace process monitoring and a 2,000+ asset rotating equipment fleet.",
    tools: ["Amazon QuickSight"],
    scope: "Implementation",
    timeline: "3 wk",
    metric: { value: "2,000+", label: "Assets monitored" },
    chart: "bars",
    description: "The client, a global manufacturer running highly complex industrial operations, needed a real-time monitoring tool built ground-up to replace standard BI templates that struggled to prioritize critical signals across millions of raw sensor readings. The production design team partnered with subject matter experts to translate physical plant infrastructure into an intuitive digital ecosystem grounded in cognitive UI principles, and I owned the implementation of that design in AWS QuickSight.\n\nI built the full interactive dashboard layer across four interconnected views: a Furnace Process Overview surfacing high-level situational awareness for safety calls, a Detailed Metrics view exposing point diagnostics without visual clutter, a Rotating Equipment Fleet view monitoring 2,000+ assets with intelligent status prioritization, and an Asset Deep Dive that walks operators through a clear diagnostic narrative tied to direct work order actions.\n\nMy implementation work covered visual formatting and layout, conditional formatting tied to operational thresholds, interactive filtering, cross-view drill-down navigation, and every other in-dashboard behavior end users interact with. The result was a fully native QuickSight build that preserved the design system's nuance while handling production-scale fleet data.",
    responsibilities: [
      "Built the full QuickSight dashboard suite end-to-end from production design team mockups",
      "Implemented conditional formatting tied to operational thresholds for at-a-glance status reads",
      "Wired up interactive filtering and cross-view navigation between fleet, asset, and process views",
      "Translated the design system's cognitive UI principles into native QuickSight components within the tool's constraints",
      "Iterated alongside the design team to preserve visual nuance and intent through implementation",
    ],
    impact: "Delivered a fully native Amazon QuickSight dashboard suite implementing the cognitive UI design system at production scale, giving operators real-time visibility into furnace process health and a 2,000+ asset rotating equipment fleet.",
    caseStudy: "https://drive.google.com/file/d/1cEBafEFpml5bAGyRRCeVfIlInrbt4Eu0/view?usp=sharing",
    images: [
      "/assets/projects/p6/FPO.webp",
      "/assets/projects/p6/FPDV.webp",
      "/assets/projects/p6/ADD.webp",
      "/assets/projects/p6/REF.webp",
    ],
  },
];
