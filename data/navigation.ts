export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const NAV_PROJECT_IDS = ["p1", "p6", "p2", "p3", "p5", "p4"] as const;

export const NAV_MENU = {
  open: "Open menu",
  close: "Close menu",
  label: "Portfolio navigation",
  primaryLabel: "Primary navigation",
  projectControlsLabel: "Project controls",
  initialProjectCount: 5,
  allProjects: "All six projects",
  selectedProjects: "Show selected projects",
  projectAction: "View case study",
} as const;

export const FOOTER_NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
] as const;

export const PROJECT_NAV_LABELS = {
  allWork: "All work",
  previous: "Previous",
  previousShort: "Prev",
  next: "Next",
};
