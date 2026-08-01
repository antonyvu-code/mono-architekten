"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "@/components/TransitionProvider";

interface Props extends ComponentProps<typeof Link> {
  /** Label shown on the ink overlay while the next page loads. */
  transitionLabel?: string;
}

/** next/link (keeps prefetching) that routes through the ink page transition. */
export default function TransitionLink({
  transitionLabel = "",
  onClick,
  href,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // let browser handle new-tab / download modifiers
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(typeof href === "string" ? href : href.toString(), transitionLabel);
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
