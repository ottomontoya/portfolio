const DOT_HOVER_RADIUS = 72;
const DOT_HOVER_SCALE = 2;
const GROUP_FILL_OPACITY = 0.12;

/** Decorative hover motion with a single, on-demand animation frame loop. */
export function createAccessFieldHover(
  svg: SVGSVGElement,
  thresholdAt: (index: number) => number,
) {
  const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  const dots = Array.from(svg.querySelectorAll<SVGCircleElement>(".access-dot"),
    (element, index) => ({
      element,
      x: element.cx.baseVal.value,
      y: element.cy.baseVal.value,
      radius: element.r.baseVal.value,
      threshold: thresholdAt(index),
      scale: 1,
      target: 1,
      changed: false,
    }),
  );
  const groups = Array.from(svg.querySelectorAll<SVGRectElement>(".access-group"),
    element => ({
      element,
      bounds: element.getBBox(),
      originalTransform: element.getAttribute("transform"),
      originalFill: element.style.fill,
      originalFillOpacity: element.style.fillOpacity,
      scale: 1,
      fromScale: 1,
      targetScale: 1,
      dash: 6,
      fromDash: 6,
      fill: 0,
      fromFill: 0,
      targetFill: 0,
      start: 0,
      duration: 320,
      moving: false,
      changed: false,
    }),
  );
  let enabled = false;
  let pointer: { x: number; y: number } | null = null;
  let pointerDirty = false;
  let activeGroup = -1;
  let frame = 0;
  let lastTime = 0;

  function restoreGroup(group: (typeof groups)[number]) {
    if (group.originalTransform === null) group.element.removeAttribute("transform");
    else group.element.setAttribute("transform", group.originalTransform);
    group.element.style.fill = group.originalFill;
    group.element.style.fillOpacity = group.originalFillOpacity;
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    pointer = null;
    pointerDirty = false;
    activeGroup = -1;
    for (const dot of dots) {
      if (dot.changed) dot.element.setAttribute("r", String(dot.radius));
      dot.scale = dot.target = 1;
      dot.changed = false;
    }
    for (const group of groups) {
      // Never touch the entrance timeline's dashes before a group is hovered.
      if (group.changed) {
        restoreGroup(group);
        group.element.style.strokeDasharray = "none";
      }
      group.scale = group.fromScale = group.targetScale = 1;
      group.dash = group.fromDash = 6;
      group.fill = group.fromFill = group.targetFill = 0;
      group.moving = group.changed = false;
    }
  }

  function schedule() {
    if (enabled && pointerMedia.matches && !frame) {
      lastTime = performance.now();
      frame = requestAnimationFrame(render);
    }
  }

  function changeGroup(next: number, now: number) {
    if (next === activeGroup) return;
    for (const index of [activeGroup, next]) {
      const group = groups[index];
      if (!group) continue;
      const entering = index === next;
      group.fromScale = group.scale;
      group.targetScale = entering ? 1.03 : 1;
      group.fromDash = entering ? 0.8 : group.dash;
      group.fromFill = group.fill;
      group.targetFill = entering ? GROUP_FILL_OPACITY : 0;
      group.start = now;
      group.duration = entering ? 320 : 250;
      group.moving = group.changed = true;
    }
    activeGroup = next;
  }

  function render(now: number) {
    frame = 0;
    if (pointerDirty) {
      const matrix = svg.getScreenCTM();
      const point = pointer && matrix
        ? new DOMPoint(pointer.x, pointer.y).matrixTransform(matrix.inverse())
        : null;
      for (const dot of dots) {
        const distance = point ? Math.hypot(point.x - dot.x, point.y - dot.y) : Infinity;
        // A small, dithered ripple; marks stay on their original coordinates.
        const strength = distance < DOT_HOVER_RADIUS
          ? (1 - distance / DOT_HOVER_RADIUS) * (0.65 + 0.35 * Math.cos(distance * 0.14))
          : 0;
        const level = strength * 4;
        const steps = Math.floor(level) + (level % 1 > dot.threshold ? 1 : 0);
        dot.target = 1 + (steps / 4) * (DOT_HOVER_SCALE - 1);
      }
      changeGroup(point ? groups.findIndex(({ bounds }) =>
        point.x >= bounds.x && point.x <= bounds.x + bounds.width &&
        point.y >= bounds.y && point.y <= bounds.y + bounds.height,
      ) : -1, now);
      pointerDirty = false;
    }

    const blend = 1 - Math.exp(-Math.min(now - lastTime, 64) / 55);
    lastTime = now;
    let moving = false;
    for (const dot of dots) {
      if (dot.scale === dot.target) continue;
      const next = dot.scale + (dot.target - dot.scale) * blend;
      dot.scale = Math.abs(dot.target - next) < 0.001 ? dot.target : next;
      dot.element.setAttribute("r", String(dot.radius * dot.scale));
      dot.changed = dot.scale !== 1;
      moving ||= dot.scale !== dot.target;
    }
    for (const group of groups) {
      if (!group.moving) continue;
      const progress = Math.min(1, (now - group.start) / group.duration);
      const eased = 1 - (1 - progress) ** 3;
      group.scale = group.fromScale + (group.targetScale - group.fromScale) * eased;
      group.dash = group.fromDash + (6 - group.fromDash) * eased;
      group.fill = group.fromFill + (group.targetFill - group.fromFill) * eased;
      const cx = group.bounds.x + group.bounds.width / 2;
      const cy = group.bounds.y + group.bounds.height / 2;
      group.element.setAttribute("transform", `translate(${cx} ${cy}) scale(${group.scale}) translate(${-cx} ${-cy})`);
      group.element.style.strokeDasharray = progress === 1
        ? "none"
        : `${group.dash} ${6 - group.dash}`;
      group.element.style.fill = "currentColor";
      group.element.style.fillOpacity = String(group.fill);
      group.moving = progress < 1;
      moving ||= group.moving;
      if (!group.moving && group.targetScale === 1) restoreGroup(group);
    }
    if (moving) frame = requestAnimationFrame(render);
  }

  function move(event: PointerEvent) {
    if (event.pointerType !== "mouse" || !pointerMedia.matches) return;
    pointer = { x: event.clientX, y: event.clientY };
    pointerDirty = true;
    schedule();
  }

  function leave() {
    pointer = null;
    pointerDirty = true;
    schedule();
  }

  svg.addEventListener("pointermove", move);
  svg.addEventListener("pointerleave", leave);
  svg.addEventListener("pointercancel", leave);
  window.addEventListener("scroll", reset, { passive: true, capture: true });
  window.addEventListener("resize", reset);
  pointerMedia.addEventListener("change", reset);

  return {
    setEnabled(value: boolean) {
      if (enabled === value) return;
      enabled = value;
      if (enabled) schedule();
      else reset();
    },
    destroy() {
      reset();
      svg.removeEventListener("pointermove", move);
      svg.removeEventListener("pointerleave", leave);
      svg.removeEventListener("pointercancel", leave);
      window.removeEventListener("scroll", reset, true);
      window.removeEventListener("resize", reset);
      pointerMedia.removeEventListener("change", reset);
    },
  };
}
