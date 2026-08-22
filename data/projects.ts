export type ProjectEvidence =
  | {
      kind: "delta";
      from: number;
      to: number;
      label: string;
    }
  | {
      kind: "units";
      units: number | readonly string[];
      label: string;
      mark: "bar" | "dot";
      qualifier?: "approximate" | "minimum";
    }
  | {
      kind: "convergence";
      sources: readonly string[];
      outcome: string;
      label: string;
    };

export interface ProjectImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectDecisionRecord {
  context: string;
  constraint: string;
  decision: string;
  result: string;
  validation: string;
  boundary: string;
}

export interface FeaturedProject {
  order: number;
  proof: string;
}

export interface Project {
  id: string;
  n: string;
  title: string;
  client: string;
  industry: string;
  role: string;
  summary: string;
  tools: string[];
  scope: string;
  timeline: string;
  evidence: ProjectEvidence;
  description: string;
  responsibilities: string[];
  impact: string;
  decisionRecord: ProjectDecisionRecord;
  featured?: FeaturedProject;
  images?: ProjectImage[];
  caseStudy?: string;
}

const NUMBER_FORMAT = new Intl.NumberFormat("en-US");

export function getProjectMetric(evidence: ProjectEvidence): { value: string; label: string } {
  if (evidence.kind === "delta") {
    return {
      value: `${NUMBER_FORMAT.format(evidence.from)} → ${NUMBER_FORMAT.format(evidence.to)}`,
      label: evidence.label,
    };
  }

  if (evidence.kind === "convergence") {
    return {
      value: `${evidence.sources.length} → 1`,
      label: evidence.label,
    };
  }

  const count = typeof evidence.units === "number" ? evidence.units : evidence.units.length;
  const prefix = evidence.qualifier === "approximate" ? "~" : "";
  const suffix = evidence.qualifier === "minimum" ? "+" : "";
  return {
    value: `${prefix}${NUMBER_FORMAT.format(count)}${suffix}`,
    label: evidence.label,
  };
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    n: "01",
    title: "Governed Data Access at Scale",
    client: "Global Cybersecurity Platform",
    industry: "cybersecurity",
    role: "Data Analyst & BI Specialist",
    summary: "Redesigned Tableau row-level security for a 1,500-user environment, consolidating 696 ad-hoc access paths into 12 maintainable access groups and retiring every identified PII-exposed data source.",
    tools: ["Tableau", "Snowflake", "dbt"],
    scope: "End-to-end",
    timeline: "~12 months",
    evidence: { kind: "delta", from: 696, to: 12, label: "Access paths → groups" },
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
    impact: "696 ad-hoc access paths consolidated into 12 access groups across ~1,500 users. 100% of identified PII-exposed data sources removed. ~70% reduction in ongoing admin workload through process unification.",
    decisionRecord: {
      context: "A Tableau environment serving ~1,500 active users had grown to 696 ad-hoc access paths and roughly 30 team-specific folders.",
      constraint: "Reduce PII exposure and administrative complexity without removing legitimate access.",
      decision: "Replace ad-hoc paths with 12 group-based RLS cases, consolidate folders into five regulated global spaces, and unify admin monitoring.",
      result: "Every active user migrated with no loss of legitimate access; 100% of identified PII-exposed sources were retired; ongoing administration fell by approximately 70%.",
      validation: "Usage and risk analysis, access-preserving migration, dbt and Snowflake metadata, and a monitoring dashboard for stale content, inactive users, and orphaned assets.",
      boundary: "Client identity, group and folder names, schemas, data-source names, and user-level access details removed.",
    },
    featured: { order: 1, proof: "Governance & scale" },
  },
  {
    id: "p2",
    n: "02",
    title: "Market Research Dashboards for a Global Automotive Manufacturer",
    client: "Leading German Automotive Manufacturer",
    industry: "automotive",
    role: "BI Developer",
    summary: "Built the Tableau visualization layer of a custom market research analytics platform, delivering ~15 dashboards from sketch-based designs that surface customer insights by market segment.",
    tools: ["Tableau"],
    scope: "Implementation",
    timeline: "6 mo",
    evidence: { kind: "units", units: 15, label: "Dashboards delivered", mark: "bar", qualifier: "approximate" },
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
    decisionRecord: {
      context: "A custom market-research platform needed a Tableau visualization layer for approximately 15 sketch-based dashboard concepts.",
      constraint: "Preserve each sketch's analytical intent inside native Tableau and the client's internal portal integration.",
      decision: "Translate the sketches into production dashboards through iterative delivery, while evaluating Tableau Extensions for richer visuals and simpler maintenance.",
      result: "Approximately 15 dashboards went live inside the internal portal, supporting cross-tabulation and longitudinal customer analysis.",
      validation: "Multiple client review cycles compared function and visuals with the supplied sketches and expectations before final delivery.",
      boundary: "Client identity, source sketches, research data, portal implementation details, and proprietary calculations removed.",
    },
    featured: { order: 3, proof: "Design implementation" },
    caseStudy: "https://www.stxnext.com/case-study/market-research-platform",
  },
  {
    id: "p3",
    n: "03",
    title: "BI Layer for an Open Source Foundation's Salesforce Migration",
    client: "Major Open Source Software Foundation",
    industry: "non-profit",
    role: "BI Consultant",
    summary: "Designed and built three QuickSight dashboards on a Snowflake-backed data layer covering CRM, web analytics, and GitHub community activity, all redesigned from scratch as part of the client's move off Salesforce reporting.",
    tools: ["Amazon QuickSight", "Snowflake"],
    scope: "End-to-end",
    timeline: "3 mo",
    evidence: {
      kind: "convergence",
      sources: ["CRM", "Web analytics", "GitHub community activity"],
      outcome: "Controlled BI environment",
      label: "Sources unified",
    },
    description: "The client, a major open source software foundation, was rebuilding their analytics and reporting away from Salesforce to gain full ownership of their data and reduce platform dependency. The data engineering team migrated source systems into Snowflake, and I was brought in to build the QuickSight dashboard layer that surfaced that data back to the business.\n\nWorking from high-level requirements rather than detailed mockups, I designed and iterated on dashboard concepts, presented them in weekly client reviews, and translated feedback into three production QuickSight dashboards covering Salesforce CRM, web analytics, and GitHub community activity. All three were designed from scratch. For the CRM and web analytics views, existing reports served as reference material for understanding which KPIs the team tracked, but the visualizations, structure, and chart choices were my own design, switched out to be clearer and more concise. The GitHub dashboard had no reference to anchor against and was designed end-to-end from client requirements alone.\n\nI authored a detailed specification document for the data engineering team, outlining required fields, grain, and source systems for each dashboard so the upstream Snowflake models delivered exactly what reporting needed. After implementation I ran data validation and iterative refinement to ensure metrics matched source-system expectations before handoff.",
    responsibilities: [
      "Designed and built three QuickSight dashboards on Snowflake-backed data for CRM, web, and community reporting, iterating through weekly client review cycles",
      "Redesigned the CRM and web analytics views from scratch, using existing reports only as reference for KPI selection and switching out visualizations for clearer, more concise versions",
      "Designed a net-new GitHub community activity dashboard end-to-end from client requirements with no prior dashboard to reference",
      "Authored data specification documents for the data engineering team to align upstream Snowflake models with reporting needs",
      "Performed data validation against source systems to confirm metric accuracy before handoff",
    ],
    impact: "Three data sources unified in a single controlled BI environment, giving the client's team a consolidated view of funnel, web, and community performance independent of Salesforce reporting.",
    decisionRecord: {
      context: "An open-source foundation was moving reporting away from Salesforce while its source systems were being migrated into Snowflake.",
      constraint: "Work from high-level requirements: existing CRM and web reports were KPI references only, and the GitHub view had no prior dashboard to follow.",
      decision: "Design three QuickSight dashboards from scratch and write a reporting specification covering required fields, grain, and source systems for data engineering.",
      result: "CRM, web analytics, and GitHub community activity were unified in one controlled BI environment independent of Salesforce reporting.",
      validation: "Weekly client reviews, source-system reconciliation, and iterative refinement confirmed metric accuracy before handoff.",
      boundary: "Client identity, specification documents, source fields, schemas, KPI logic, and underlying data removed.",
    },
    featured: { order: 2, proof: "End-to-end delivery" },
    caseStudy: "https://www.stxnext.com/case-study/salesforce-optimization",
  },
  {
    id: "p4",
    n: "04",
    title: "Revenue Reporting & Workflow Apps for an Energy Company",
    client: "Energy & Digital Assets",
    industry: "energy",
    role: "BI & Workflow Applications Developer",
    summary: "Delivered two connected tracks — scheduled revenue reporting and four interactive workflow applications — to automate manual processes and improve data quality.",
    tools: ["Amazon QuickSight", "Retool", "AWS"],
    scope: "End-to-end",
    timeline: "Ongoing",
    evidence: {
      kind: "units",
      units: ["Scheduled revenue reporting", "Retool workflow applications"],
      label: "Delivery tracks",
      mark: "bar",
    },
    description: "The work had two connected delivery tracks: scheduled revenue reporting in Amazon QuickSight and four form-driven workflow applications in Retool to replace error-prone manual processes.\n\nIn QuickSight I designed and implemented scheduled revenue reports, working from high-level requirements and mockups co-created with a product designer and the client. In Retool I built highly interactive, data-entry-oriented applications with many dynamic fields, conditional logic, and validation rules to minimize user error and ensure data quality in complex operational workflows.\n\nRequirements were gathered and refined through daily syncs and working sessions with the client's team. These sessions also served as live demos and training — walking the client through functionality, capturing feedback, and ensuring the team could use the tools confidently in daily operations. I also produced how-to guides and documentation to support ongoing adoption.",
    responsibilities: [
      "Gathered and refined reporting and workflow requirements directly from the client",
      "Built QuickSight dashboards for fixed-schedule revenue reporting",
      "Developed four Retool workflow applications with dynamic fields, conditional logic, and validation rules",
      "Collaborated with a product designer on high-level mockups before implementation",
      "Led working sessions, demos, and training so the client's team could adopt the tools",
      "Produced how-to guides and documentation for ongoing use",
    ],
    impact: "Four manual workflows automated. Data quality improved through validation guardrails. Client team fully onboarded.",
    decisionRecord: {
      context: "Revenue reporting and four operational workflows depended on manual, error-prone processes.",
      constraint: "Support scheduled reporting and complex data entry with evolving requirements, dynamic fields, and strong validation.",
      decision: "Use QuickSight for scheduled revenue reporting and Retool for four form-driven workflows with conditional logic and validation guardrails.",
      result: "Four manual workflows were automated, data quality improved through input guardrails, and the client team was onboarded to the new tools.",
      validation: "Daily working sessions, validation rules, live demonstrations, training, and how-to documentation supported refinement and adoption.",
      boundary: "Client identity, revenue figures, workflow fields, business rules, operational data, and internal documentation removed.",
    },
  },
  {
    id: "p5",
    n: "05",
    title: "Rationalized BI for an Email Client Product Team",
    client: "Software Product — Email Client",
    industry: "SaaS",
    role: "BI Consultant",
    summary: "Rationalized approximately 20–25 fragmented Salesforce reports by unifying five separate time grains in one flexible QuickSight dashboard set.",
    tools: ["Amazon QuickSight", "Neon", "Salesforce"],
    scope: "End-to-end",
    timeline: "3 mo",
    evidence: {
      kind: "convergence",
      sources: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      outcome: "Flexible dashboard set",
      label: "Time grains unified",
    },
    description: "The client had accumulated approximately 20–25 disconnected Salesforce reports — standalone charts, overlapping dashboards, and separate versions for each time grain (daily, weekly, monthly, quarterly, yearly). The goal was to rationalize this landscape and build one unified, flexible dashboard set in Amazon QuickSight.\n\nI helped evaluate BI tools and led the recommendation toward QuickSight based on the client's Salesforce setup and long-term needs. From there I designed KPI-oriented mockups largely from scratch, using existing Salesforce reports and continuous client feedback as input, and implemented one flexible dashboard set where users could switch between daily, weekly, monthly, quarterly, and yearly views — replacing the near-duplicate dashboards with one maintainable structure.\n\nI also built out the full QuickSight project structure: folders, user groups, core dashboards, data sources connected to Neon, and scheduled refreshes — ensuring a smooth, company-wide rollout with up-to-date data and minimal manual work for the client's team.",
    responsibilities: [
      "Supported BI tool evaluation and recommended Amazon QuickSight",
      "Designed KPI-oriented mockups from scratch using Salesforce reports as input",
      "Built unified dashboards with flexible time-range switching (daily → yearly)",
      "Consolidated many overlapping dashboards into a small, maintainable set",
      "Designed full QuickSight structure: folders, user groups, data sources, schedules",
      "Configured Neon data sources with scheduled refreshes for reliable, timely data",
    ],
    impact: "Approximately 20–25 fragmented Salesforce reports rationalized into one flexible dashboard set. Company-wide QuickSight rollout delivered with full structure and governance.",
    decisionRecord: {
      context: "Approximately 20–25 disconnected Salesforce reports repeated similar analysis across daily, weekly, monthly, quarterly, and yearly views.",
      constraint: "Reduce duplication while preserving access to all five time grains and establishing a maintainable reporting environment.",
      decision: "Recommend QuickSight, design a flexible time-switching dashboard set, and build the surrounding folders, groups, Neon data sources, and refresh schedules.",
      result: "Five time grains and approximately 20–25 reports were rationalized into one flexible dashboard set with a company-wide governed rollout.",
      validation: "Continuous client feedback shaped the KPI views, while scheduled refreshes kept the delivered reporting structure current.",
      boundary: "Client identity, report names, KPIs, folder and group configuration, source structures, and business data removed.",
    },
  },
  {
    id: "p6",
    n: "06",
    title: "Manufacturing Analytics Prototype in QuickSight",
    client: "Manufacturing Analytics Case Study",
    industry: "manufacturing",
    role: "QuickSight Prototype Developer",
    summary: "Recreated a four-view manufacturing analytics experience from a supplied mockup using dummy data in STX Next's internal QuickSight environment, including a 2,000+ asset scenario.",
    tools: ["Amazon QuickSight"],
    scope: "Internal prototype",
    timeline: "3 wk",
    evidence: { kind: "units", units: 2000, label: "Assets represented in prototype", mark: "dot", qualifier: "minimum" },
    description: "I received a four-view manufacturing analytics mockup and dummy data, then recreated the experience in STX Next's internal Amazon QuickSight environment. This was an internal implementation prototype: I did not work in the client's QuickSight environment, use real company data or resources, contact the client, or participate in a production deployment.\n\nThe prototype covered four interconnected views: a Furnace Process Overview for high-level situational awareness, a Detailed Metrics view for point diagnostics, a Rotating Equipment Fleet view representing 2,000+ assets with status prioritization, and an Asset Deep Dive organized around a diagnostic narrative and work-order actions.\n\nMy implementation work covered visual formatting and layout, conditional formatting tied to dummy-data thresholds, interactive filtering, and cross-view drill-down navigation. The result demonstrated how the supplied cognitive-UI design could be brought to life using native QuickSight components and representative data.",
    responsibilities: [
      "Recreated the supplied four-view mockup as a working prototype in STX Next's internal QuickSight environment",
      "Implemented conditional formatting against thresholds represented in dummy data",
      "Wired interactive filtering and cross-view navigation between fleet, asset, and process views",
      "Translated the mockup's cognitive UI principles into native QuickSight components within the tool's constraints",
      "Used only dummy data and internal resources; no client environment or production data was accessed",
    ],
    impact: "Delivered a working internal QuickSight prototype that demonstrated the supplied four-view design, interactions, and 2,000+ asset scenario using dummy data. No production deployment or client adoption is claimed.",
    decisionRecord: {
      context: "A supplied manufacturing case-study mockup described four connected analytical views and a 2,000+ asset scenario.",
      constraint: "Bring the mockup to life using native QuickSight components in an internal environment, with dummy data and no access to client systems or resources.",
      decision: "Implement four connected views with conditional status formatting, interactive filters, cross-view drill-down, and the mockup's cognitive-UI hierarchy.",
      result: "A working internal QuickSight prototype demonstrated how the supplied design and interactions could behave with representative data.",
      validation: "Implementation was checked against the supplied mockup and exercised with dummy-data thresholds and navigation paths.",
      boundary: "Internal prototype only: no client contact, real company data, client environment, production deployment, operator use, or adoption claim.",
    },
    images: [
      {
        src: "/assets/projects/p6/FPO.webp",
        srcSet: "/assets/projects/p6/FPO-640.webp 640w, /assets/projects/p6/FPO-1280.webp 1280w, /assets/projects/p6/FPO.webp 1920w",
        width: 1920,
        height: 1018,
        alt: "Internal QuickSight prototype of a furnace process overview using dummy data for feed, temperature, heat duty, gas composition, coil readings, and operating-limit status.",
      },
      {
        src: "/assets/projects/p6/FPDV.webp",
        srcSet: "/assets/projects/p6/FPDV-640.webp 640w, /assets/projects/p6/FPDV-1280.webp 1280w, /assets/projects/p6/FPDV.webp 1920w",
        width: 1920,
        height: 1019,
        alt: "Internal QuickSight prototype of detailed furnace metrics using dummy data for firebox readings, stack temperatures, inlet pressures, burner status, draft profile, and fuel composition.",
      },
      {
        src: "/assets/projects/p6/ADD.webp",
        srcSet: "/assets/projects/p6/ADD-640.webp 640w, /assets/projects/p6/ADD-1280.webp 1280w, /assets/projects/p6/ADD.webp 1920w",
        width: 1920,
        height: 1540,
        alt: "Internal QuickSight prototype of an asset deep dive using dummy data for machine status, pressure trends, vital signs, alerts, contributing factors, and work-order history.",
      },
      {
        src: "/assets/projects/p6/REF.webp",
        srcSet: "/assets/projects/p6/REF-640.webp 640w, /assets/projects/p6/REF-1280.webp 1280w, /assets/projects/p6/REF.webp 1920w",
        width: 1920,
        height: 1015,
        alt: "Internal QuickSight prototype of a rotating-equipment fleet using dummy data for pump health scores, operating status, alerts, vibration scores, and selected-pair details.",
      },
    ],
  },
];

export const PROJECT_COUNT = PROJECTS.length;
export const FEATURED_PROJECTS = PROJECTS
  .filter((project): project is Project & { featured: FeaturedProject } => Boolean(project.featured))
  .sort((a, b) => a.featured.order - b.featured.order);
export const INDUSTRIES = [...new Set(PROJECTS.map(project => project.industry))];
export const INDUSTRY_COUNT = INDUSTRIES.length;
