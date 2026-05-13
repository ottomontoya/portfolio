export function applyTheme(dark: boolean) {
  const r = document.documentElement.style;
  if (dark) {
    r.setProperty("--green", "#3d6b3f");
    r.setProperty("--burgundy", "#a8344a");
    r.setProperty("--beige", "#1a1a18");
    r.setProperty("--ink", "#f1ead8");
    r.setProperty("--paper", "#232220");
    r.setProperty("--nav-bg", "rgba(255,255,255,.06)");
    r.setProperty("--nav-border", "rgba(255,255,255,.12)");
    r.setProperty("--nav-active", "rgba(255,255,255,.14)");
  } else {
    r.setProperty("--green", "#2d4a2b");
    r.setProperty("--burgundy", "#6b1f2a");
    r.setProperty("--beige", "#f1ead8");
    r.setProperty("--ink", "#1a1a18");
    r.setProperty("--paper", "#f7f1de");
    r.setProperty("--nav-bg", "rgba(0,0,0,.04)");
    r.setProperty("--nav-border", "rgba(0,0,0,.08)");
    r.setProperty("--nav-active", "rgba(0,0,0,.08)");
  }
  document.body.style.background = dark ? "#1a1a18" : "#f1ead8";
  document.body.style.color = dark ? "#f1ead8" : "#1a1a18";
}
