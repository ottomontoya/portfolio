import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

const INTERACTIVE = 'a[href], button, summary, [role="button"], [role="link"]';
const NATIVE = [
  "input", "textarea", "select", "[contenteditable]:not([contenteditable='false'])",
  "[data-native-cursor]", "[draggable='true']", ".os-scrollbar", "iframe",
  "video[controls]", "audio[controls]", ":disabled", "[aria-disabled='true']",
].join(", ");

/** A decorative pointer layer, separate from the app's inert/modal surfaces. */
export function PointerCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    if (!dot || !CSS.supports("mix-blend-mode", "difference") ||
      !CSS.supports("translate", "1px 1px")) return;

    const root = document.documentElement;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = matchMedia("(forced-colors: active)");
    const events = new AbortController();
    const options = { signal: events.signal, passive: true };
    let position: { x: number; y: number } | null = null;
    let pressed = false;
    let pending: gsap.core.Tween | null = null;

    const hide = () => {
      root.removeAttribute("data-pointer-cursor");
      dot.removeAttribute("data-visible");
      dot.removeAttribute("data-hover");
      dot.removeAttribute("data-pressed");
    };

    const reset = () => {
      pending?.kill();
      pending = null;
      position = null;
      pressed = false;
      hide();
    };

    const refresh = () => {
      if (!position || !pointer.matches || motion.matches || contrast.matches ||
        document.hidden) {
        hide();
        return;
      }
      const target = document.elementFromPoint(position.x, position.y);
      const interactive = Boolean(target?.closest(INTERACTIVE));
      if (!target || target.closest(NATIVE)) {
        hide();
        return;
      }

      // Individual translate keeps the hotspot fixed while scale changes.
      dot.style.translate = `${position.x}px ${position.y}px`;
      dot.toggleAttribute("data-hover", interactive);
      dot.toggleAttribute("data-pressed", pressed && interactive);
      dot.setAttribute("data-visible", "");
      // Hide the native pointer only after this replacement is positioned.
      root.setAttribute("data-pointer-cursor", "");
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons > 1) {
        reset();
        return;
      }
      position = { x: event.clientX, y: event.clientY };
      pressed = event.buttons === 1;
      refresh();
    };

    // React can replace the hovered control with a dialog after the click.
    // Recheck once after that commit, using the existing animation clock.
    const afterClick = () => {
      if (!position) return;
      pending?.kill();
      pending = gsap.delayedCall(0, () => { pending = null; refresh(); });
    };
    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) reset();
    };
    const over = (event: PointerEvent) => {
      // Layout/keyboard scrolling can fire pointerover without mouse movement.
      if (position) move(event);
    };

    document.addEventListener("pointermove", move, options);
    document.addEventListener("pointerover", over, options);
    document.addEventListener("pointerdown", move, options);
    document.addEventListener("pointerup", move, options);
    document.addEventListener("pointerout", leave, options);
    document.addEventListener("pointercancel", reset, options);
    document.addEventListener("click", afterClick, options);
    document.addEventListener("keydown", reset, { ...options, capture: true });
    document.addEventListener("visibilitychange", reset, options);
    window.addEventListener("blur", reset, options);
    [pointer, motion, contrast].forEach(query => query.addEventListener("change", reset));

    return () => {
      events.abort();
      [pointer, motion, contrast].forEach(query => query.removeEventListener("change", reset));
      reset();
    };
  }, []);

  return createPortal(<div ref={ref} className="pointer-cursor" aria-hidden="true" />, document.body);
}
