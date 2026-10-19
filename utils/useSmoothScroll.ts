import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Match mkdir.directory: default wheel damping and cubic in/out anchor motion.
const ANCHOR_MOTION = {
  duration: 1.2,
  easing: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export function useSmoothScroll(isProjectOpen: boolean) {
  useEffect(() => {
    // The case reader and image viewer keep their native, independent scrolling.
    if (isProjectOpen) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let pendingAnchorUrl: string | null = null;
    let clearAnchorFocus = () => {};
    const syncMotion = () => {
      lenis?.destroy();
      lenis = motion.matches
        ? null
        : new Lenis({ autoRaf: true, lerp: 0.1, syncTouch: false });
    };
    syncMotion();
    motion.addEventListener("change", syncMotion);

    const onClick = (event: MouseEvent) => {
      if (
        !lenis || event.defaultPrevented || event.button !== 0 ||
        event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
      ) return;

      const link = event.composedPath().find(
        (node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement,
      );
      if (!link || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
        url.search !== location.search || !url.hash) return;

      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      const start = window.scrollY;
      // Native hash navigation records the outgoing position for Back/Forward.
      // Restore it before paint, then let Lenis animate to the destination.
      if (url.hash !== location.hash) {
        pendingAnchorUrl = url.href;
        window.location.hash = url.hash;
      }
      window.scrollTo({ top: start, behavior: "instant" });
      clearAnchorFocus();
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        clearAnchorFocus = () => {
          target.removeEventListener("blur", clearAnchorFocus);
          target.removeAttribute("tabindex");
          clearAnchorFocus = () => {};
        };
        target.addEventListener("blur", clearAnchorFocus, { once: true });
      }
      target.focus({ preventScroll: true });
      // Native scrolling can precede its scroll event (touch, focus, history).
      // Measure the destination from the current document position.
      lenis.scrollTo(lenis.actualScroll, { immediate: true });
      lenis.scrollTo(target, ANCHOR_MOTION);
    };

    // Native keyboard scrolling and history restoration must interrupt inertia.
    const reset = () => lenis?.scrollTo(lenis.actualScroll, { immediate: true });
    const onScrollbarPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(".os-scrollbar")) reset();
    };
    const onHistoryNavigation = (event: PopStateEvent | HashChangeEvent) => {
      if (pendingAnchorUrl === window.location.href) {
        if (event.type === "hashchange") pendingAnchorUrl = null;
        return;
      }
      pendingAnchorUrl = null;
      reset();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (["Tab", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape"].includes(event.key)) {
        reset();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onScrollbarPointerDown, true);
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("hashchange", onHistoryNavigation);

    return () => {
      clearAnchorFocus();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onScrollbarPointerDown, true);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", onHistoryNavigation);
      lenis?.destroy();
    };
  }, [isProjectOpen]);
}
