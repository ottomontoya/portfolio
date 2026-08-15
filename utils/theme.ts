const THEME_STORAGE_KEY = "portfolio-theme";

export function getStoredTheme(): boolean | null {
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    // Storage may be unavailable in hardened or private browser contexts.
  }
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return null;
}

export function getInitialTheme(): boolean {
  const stored = getStoredTheme();
  if (stored !== null) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function initializeTheme(): boolean {
  const dark = getInitialTheme();
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  return dark;
}

export function applyTheme(dark: boolean) {
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

export function persistTheme(dark: boolean) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    // The visual theme still applies when persistence is unavailable.
  }
}
