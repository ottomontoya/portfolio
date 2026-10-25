import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Match mkdir.directory: default wheel damping and cubic in/out anchor motion.
const ANCHOR_MOTION = {
  duration: 1.2,
  easing: (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

export function useSmoothScroll({
  enabled = true,
  suspended = false,
  wrapperRef,
  contentRef,
  resetKey,
}: {
  enabled?: boolean;
  suspended?: boolean;
  wrapperRef?: RefObject<HTMLElement>;
  contentRef?: RefObject<HTMLElement>;
  // Recreate the controller when the active case changes, cancelling inertia.
  resetKey?: string | null;
} = {}) {
  const controller = useRef<Lenis | null>(null);
  const suspendedRef = useRef(suspended);
  useLayoutEffect(() => {
    suspendedRef.current = suspended;
    if (suspended) controller.current?.stop();
    else controller.current?.start();
  }, [suspended]);

  useEffect(() => {
    if (!enabled) return;
    const wrapper = wrapperRef?.current;
    const content = contentRef?.current;
    if ((wrapperRef && !wrapper) || (contentRef && !content)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let pendingAnchorUrl: string | null = null;
    let clearAnchorFocus = () => {};
    const syncMotion = () => {
      lenis?.destroy();
      lenis = motion.matches
        ? null
        : new Lenis({
          autoRaf: true,
          lerp: 0.1,
          syncTouch: false,
          ...(wrapper ? { wrapper } : {}),
          ...(content ? { content } : {}),
        });
      controller.current = lenis;
      if (suspendedRef.current) lenis?.stop();
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
      // An explicit menu selection can arrive before the menu's suspension clears.
      lenis.start();
      lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
      lenis.scrollTo(target, { ...ANCHOR_MOTION, force: true });
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
    // Only the homepage owns section anchors and document history scrolling.
    if (!wrapper) {
      document.addEventListener("click", onClick);
      window.addEventListener("popstate", onHistoryNavigation);
      window.addEventListener("hashchange", onHistoryNavigation);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onScrollbarPointerDown, true);

    return () => {
      clearAnchorFocus();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onScrollbarPointerDown, true);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", onHistoryNavigation);
      lenis?.destroy();
      controller.current = null;
    };
  }, [enabled, wrapperRef, contentRef, resetKey]);
}
