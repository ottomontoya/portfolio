import { useLayoutEffect, useState, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

function subscribeToSystemTheme(onChange: () => void) {
  systemTheme.addEventListener("change", onChange);
  return () => systemTheme.removeEventListener("change", onChange);
}

export function useTheme() {
  // Each page load follows the system; manual overrides last for this visit only.
  const [preference, setPreference] = useState<Theme | null>(null);
  const systemDark = useSyncExternalStore(subscribeToSystemTheme, () => systemTheme.matches);
  const theme: Theme = preference ?? (systemDark ? "dark" : "light");

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content", theme === "dark" ? "#1d2922" : "#c5d5be",
    );
  }, [theme]);

  const toggleTheme = () => {
    setPreference(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}
