"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { scrollToTopImmediate } from "@/components/SmoothScroll";

interface TransitionApi {
  /** Cover the page with the ink overlay (showing `label`), then push `href`. */
  navigate: (href: string, label?: string) => void;
}

const TransitionContext = createContext<TransitionApi>({ navigate: () => {} });

export function usePageTransition() {
  return useContext(TransitionContext);
}

export default function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const covered = useRef(false);

  const navigate = useCallback(
    (href: string, label = "") => {
      if (href === pathname || covered.current) return;
      // rAF is suspended in hidden tabs — GSAP would never reach the push callback
      if (prefersReducedMotion() || document.hidden) {
        router.push(href);
        return;
      }
      covered.current = true;
      const overlay = overlayRef.current!;
      const labelEl = labelRef.current!;
      labelEl.textContent = label;

      gsap
        .timeline({ defaults: { ease: "power2.inOut" } })
        .set(overlay, { display: "flex" })
        .fromTo(overlay, { yPercent: 100 }, { yPercent: 0, duration: 0.65 })
        .fromTo(
          labelEl,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" },
          "-=0.28"
        )
        .add(() => router.push(href));
    },
    [pathname, router]
  );

  // New route has rendered underneath — slide the cover away.
  useEffect(() => {
    if (!covered.current) return;
    scrollToTopImmediate();
    if (document.hidden) {
      gsap.set(overlayRef.current, { display: "none", yPercent: 100 });
      covered.current = false;
      return;
    }
    const overlay = overlayRef.current!;
    const labelEl = labelRef.current!;
    gsap
      .timeline({ delay: 0.2, defaults: { ease: "power2.inOut" } })
      .to(labelEl, { y: -20, autoAlpha: 0, duration: 0.3, ease: "power2.in" })
      .to(overlay, { yPercent: -100, duration: 0.65 }, "-=0.1")
      .set(overlay, { display: "none", yPercent: 100 })
      .add(() => {
        covered.current = false;
        ScrollTrigger.refresh();
      });
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="fixed inset-0 z-[100] hidden items-center justify-center bg-ink"
        style={{ display: "none" }}
      >
        <p
          ref={labelRef}
          className="mono-label text-paper opacity-0"
          style={{ letterSpacing: "0.3em" }}
        />
      </div>
    </TransitionContext.Provider>
  );
}
