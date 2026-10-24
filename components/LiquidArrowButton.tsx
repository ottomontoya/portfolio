import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { button06 } from "../utils/liquidArrowButton";

type SharedProps = {
  label: string;
  tone?: "field" | "page";
};
type Props = SharedProps & (
  | (Omit<ComponentPropsWithoutRef<"a">, "children"> & { href: string })
  | (Omit<ComponentPropsWithoutRef<"button">, "children"> & { href?: never })
);

/** A single native action; React owns the destination, the resource owns motion. */
export function LiquidArrowButton({ label, tone = "page", ...props }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLink = props.href !== undefined;

  useLayoutEffect(() => {
    const element = isLink ? linkRef.current : buttonRef.current;
    if (element) return button06(element);
  }, [isLink]);

  const content = <>
    <span className="surface" data-surface aria-hidden="true" />
    <span className="label">{label}</span>
    <span className="arrow" data-arrow aria-hidden="true">
      <svg viewBox="0 0 16 16" fill="none" focusable="false">
        <path d="M3 13 13 3M3 3h10v10" />
      </svg>
    </span>
  </>;

  if (props.href !== undefined) {
    return <a {...props} ref={linkRef} data-button-06 data-tone={tone}>{content}</a>;
  }
  return <button type="button" {...props} ref={buttonRef} data-button-06 data-tone={tone}>{content}</button>;
}
