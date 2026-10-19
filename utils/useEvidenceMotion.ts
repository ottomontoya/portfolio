import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import type { ProjectEvidence } from "../data/projects";

/** Organize the existing marks; project copy and quantities never animate. */
export function useEvidenceMotion(
  root: RefObject<HTMLDivElement>,
  evidence: ProjectEvidence,
) {
  useEffect(() => {
    const figure = root.current;
    if (!figure || evidence.kind === "delta") return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      if (evidence.kind === "convergence") {
        const packets = figure.querySelectorAll(".source-packet");
        const lines = figure.querySelectorAll(".source-line");
        // Time grains start at different moments and arrive together. Source
        // systems arrive in sequence. Neither timing represents measured data.
        const aligned = evidence.sources.length > 3;
        timeline.fromTo(lines,
          { scaleX: 0.35, opacity: 0.3, transformOrigin: "left center" },
          { scaleX: 1, opacity: 0.5, duration: 0.75, stagger: 0.07, immediateRender: true },
          0,
        );
        packets.forEach((packet, index) => {
          const start = 0.25 + index * 0.16;
          timeline.fromTo(packet,
            { xPercent: -100 },
            {
              xPercent: 0,
              duration: aligned ? 1.85 - start : 1.05,
              ease: "power3.inOut", immediateRender: true,
            },
            start,
          );
        });
        timeline.to(figure.querySelector(".convergence-arrow"),
          { x: 9, duration: 0.45, ease: "power3.inOut" },
          aligned ? 1.7 : 1.45,
        ).to(figure.querySelector(".convergence-arrow"), { x: 0, duration: 0.65 });
      } else if (evidence.illustration?.kind === "reports-and-apps") {
        timeline.fromTo(figure.querySelectorAll(".report-sheet"),
          { x: (i) => 16 - i * 8, y: (i) => -18 + i * 5, opacity: 0.45 },
          { x: 0, y: 0, opacity: 1, duration: 1.2, stagger: 0.13, immediateRender: true },
          0,
        ).fromTo(figure.querySelectorAll(".workflow-module"),
          {
            x: (i) => i % 2 ? 18 : -18,
            y: (i) => i < 2 ? -12 : 12,
            rotation: (i) => i % 2 ? 3 : -3,
            transformOrigin: "center center", opacity: 0.35,
          },
          { x: 0, y: 0, rotation: 0, opacity: 1, duration: 0.95, stagger: 0.14, immediateRender: true },
          0.3,
        ).fromTo(figure.querySelectorAll(".workflow-stop"),
          { scale: 0.5, transformOrigin: "left center" },
          { scale: 1, duration: 0.45, stagger: 0.14, immediateRender: true },
          1.1,
        );
      } else {
        const tiles = figure.querySelectorAll(".dashboard-tile");
        timeline.fromTo(tiles,
          { y: 16, scale: 0.94, opacity: 0.4, transformOrigin: "center bottom" },
          { y: 0, scale: 1, opacity: 1, duration: 0.85, stagger: 0.055, immediateRender: true },
        ).fromTo(figure.querySelectorAll(".dashboard-rule"),
          { scaleX: 0.15, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.75, stagger: 0.055, immediateRender: true },
          0.35,
        );
      }

      let inView = false;
      const surface = figure.closest(".work-study, .case-evidence-panel") ?? figure;
      const background = figure.closest(".site-content");
      const canPlay = () => inView && !document.hidden && !figure.closest("[inert]");
      const syncPlayback = () => {
        if (canPlay()) timeline.play();
        else timeline.pause();
      };
      const replay = () => {
        // Never snap back in the middle of a sequence on a pointer/focus change.
        if (canPlay() && timeline.progress() === 1) timeline.restart();
      };
      const onPointerEnter = (event: Event) => {
        if ((event as PointerEvent).pointerType === "mouse" &&
          window.matchMedia("(hover: hover) and (pointer: fine)").matches) replay();
      };
      const onFocus = (event: Event) => {
        if (!surface.contains((event as FocusEvent).relatedTarget as Node | null)) replay();
      };
      const observer = new IntersectionObserver(([entry]) => {
        const wasInView = inView;
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        if (inView && !wasInView) replay();
        syncPlayback();
      }, { threshold: [0, 0.3] });
      observer.observe(figure);
      // A modal can cover a visible home illustration without intersecting it.
      const inertObserver = new MutationObserver(syncPlayback);
      if (background) inertObserver.observe(background, { attributes: true, attributeFilter: ["inert"] });
      document.addEventListener("visibilitychange", syncPlayback);
      surface.addEventListener("pointerenter", onPointerEnter);
      surface.addEventListener("focusin", onFocus);

      return () => {
        observer.disconnect();
        inertObserver.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        surface.removeEventListener("pointerenter", onPointerEnter);
        surface.removeEventListener("focusin", onFocus);
      };
    }, root);

    return () => media.revert();
  }, [evidence, root]);
}
