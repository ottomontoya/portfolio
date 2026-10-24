/** Shared presentation copy for the live portfolio and its reading editions. */
export const WORK_INDEX = {
  title: "More work.",
  description: "Different problems. A connected approach to business intelligence.",
  footer: "Four projects. Explore the decisions behind each.",
  hint: "Hover to preview · Select to read",
  projects: [
    { id: "p2", title: "Market research analytics" },
    { id: "p3", title: "Beyond Salesforce reporting" },
    { id: "p4", title: "Revenue reporting & workflow tools" },
    { id: "p5", title: "One reporting framework" },
  ],
} as const;

export const PUBLISHED_WORK = {
  title: "Published work.",
  description: "Two public case studies from my work at STX Next.",
  contribution: "Dashboard implementation. Reporting architecture.",
  context: "The wider delivery story, documented by STX Next.",
  linkLabel: "Published case studies",
} as const;

export const PROTOTYPE_GALLERY = {
  projectId: "p6",
  title: "Inside the prototype.",
  description: "Four connected views, recreated from a supplied mockup in native QuickSight.",
  label: "Internal prototype · Dummy data",
  credit: "Implementation from a supplied mockup, built in STX Next’s internal environment.",
  chapters: [
    {
      imageIndex: 0,
      title: "The process, at a glance.",
      topic: "Furnace process overview",
      note: "A supplied process layout, recreated in native QuickSight with conditional formatting tied to dummy-data thresholds.",
    },
    {
      imageIndex: 1,
      title: "Find the reading that matters.",
      topic: "Detailed furnace metrics",
      note: "The same process, at a finer grain. Firebox readings, temperatures, pressures, and burner status sit together for inspection.",
    },
    {
      imageIndex: 3,
      title: "From the fleet to one asset.",
      topic: "Rotating equipment fleet",
      note: "Status prioritization and selected-pair details bring a 2,000+ asset scenario into one view, using representative dummy data.",
    },
    {
      imageIndex: 2,
      title: "Follow the diagnostic story.",
      topic: "Asset deep dive",
      note: "Machine status, pressure trends, vital signs, and contributing factors follow the supplied mockup’s diagnostic narrative.",
    },
  ],
} as const;
