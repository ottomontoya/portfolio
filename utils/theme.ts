const THEME_STORAGE_KEY = "portfolio-theme";

export function getInitialTheme(): boolean {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Storage may be unavailable in hardened or private browser contexts.
  }
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function initializeTheme(): boolean {
  const dark = getInitialTheme();
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  return dark;
}

export function applyTheme(dark: boolean) {
  const theme = dark ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The visual theme still applies when persistence is unavailable.
  }
}
