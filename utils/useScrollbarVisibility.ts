import { useLayoutEffect, type RefObject } from "react";
import { OverlayScrollbars } from "overlayscrollbars";
import "overlayscrollbars/overlayscrollbars.css";

/** Overlay the handle without replacing the native document or element scroller. */
export function useScrollbarVisibility(
  targetRef?: RefObject<HTMLElement>,
  enabled = true,
  layoutKey?: unknown,
) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const target = targetRef ? targetRef.current : document.body;
    if (!target) return;

    const forcedColors = window.matchMedia("(forced-colors: active)");
    let instance: ReturnType<typeof OverlayScrollbars> | undefined;
    const sync = () => {
      instance?.destroy();
      instance = undefined;
      if (forcedColors.matches) return;

      instance = OverlayScrollbars(
        {
          target,
          // Keep React's existing scroll container and children in place.
          ...(targetRef ? { elements: { viewport: target } } : {}),
        },
        {
          scrollbars: {
            theme: "os-theme-portfolio",
            autoHide: "scroll",
            autoHideDelay: 1000,
            dragScroll: true,
            clickScroll: "instant",
          },
        },
      );
    };
    sync();
    forcedColors.addEventListener("change", sync);
    return () => {
      forcedColors.removeEventListener("change", sync);
      instance?.destroy();
    };
  }, [targetRef, enabled]);

  // Fit/zoom changes must accept the next wheel event without an observer delay.
  useLayoutEffect(() => {
    const target = targetRef ? targetRef.current : document.body;
    if (!enabled || !target) return;
    if (layoutKey !== undefined) target.scrollTo({ top: 0, left: 0, behavior: "instant" });
    OverlayScrollbars(target)?.update(true);
  }, [targetRef, enabled, layoutKey]);
}
