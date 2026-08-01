"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, scrollToTopImmediate } from "@/components/SmoothScroll";
import { usePageTransition } from "@/components/TransitionProvider";
import {
  localePath,
  switchLocalePath,
  locales,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";

interface Props {
  locale: Locale;
  nav: Dictionary["nav"];
}

export default function SiteHeader({ locale, nav }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { navigate } = usePageTransition();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  const items = [
    { label: nav.home, href: localePath(locale) },
    { label: nav.projects, href: localePath(locale, "/projects") },
    { label: nav.studio, href: localePath(locale, "/studio") },
    { label: nav.contact, href: localePath(locale, "/contact") },
  ];

  // open / close choreography
  useGSAP(
    () => {
      const overlay = overlayRef.current!;
      const links = overlay.querySelectorAll("[data-menu-link]");
      const meta = overlay.querySelectorAll("[data-menu-meta]");
      const reduced = prefersReducedMotion() || document.hidden;

      if (open) {
        lockScroll(true);
        if (reduced) {
          gsap.set(overlay, { display: "flex", yPercent: 0 });
          gsap.set([links, meta], { autoAlpha: 1, y: 0 });
        } else {
          gsap
            .timeline({ defaults: { ease: "power2.inOut" } })
            .set(overlay, { display: "flex" })
            .fromTo(overlay, { yPercent: -100 }, { yPercent: 0, duration: 0.7 })
            .fromTo(
              links,
              { y: 64, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: "power2.out" },
              "-=0.25"
            )
            .fromTo(
              meta,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.4, ease: "power2.out" },
              "-=0.35"
            );
        }
        firstLinkRef.current?.focus({ preventScroll: true });
        wasOpen.current = true;
      } else if (wasOpen.current) {
        lockScroll(false);
        if (reduced) {
          gsap.set(overlay, { display: "none" });
        } else {
          gsap
            .timeline({ defaults: { ease: "power2.inOut" } })
            .to(overlay, { yPercent: -100, duration: 0.65 })
            .set(overlay, { display: "none" });
        }
        menuButtonRef.current?.focus({ preventScroll: true });
        wasOpen.current = false;
      }
    },
    { dependencies: [open] }
  );

  // menu acts as the transition cover: route changed → reveal the new page
  useEffect(() => {
    if (open) {
      scrollToTopImmediate();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ink = open ? "text-paper" : "text-ink";

  return (
    <>
      <header className="page-margin fixed inset-x-0 top-0 z-[85] flex items-center justify-between py-5">
        <Link
          href={localePath(locale)}
          onClick={(e) => {
            if (open) return; // menu already covers — plain nav, menu reveals
            e.preventDefault();
            navigate(localePath(locale), "MONO");
          }}
          className={`mono-label ${ink} transition-colors`}
        >
          MONO<span className="text-stone"> — Architekten</span>
        </Link>

        <div className={`flex items-center gap-6 ${ink}`}>
          <nav aria-label={nav.langLabel} className="mono-label-xs flex gap-2.5">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => router.replace(switchLocalePath(pathname, l))}
                aria-current={l === locale ? "true" : undefined}
                className={`uppercase transition-colors ${
                  l === locale
                    ? "underline underline-offset-4"
                    : open
                      ? "text-paper/50 hover:text-paper"
                      : "text-stone hover:text-ink"
                }`}
              >
                {l}
              </button>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            className="mono-label transition-colors hover:text-stone"
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        id="site-menu"
        className="page-margin fixed inset-0 z-[80] hidden flex-col justify-between bg-ink pb-10 pt-28 text-paper"
        style={{ display: "none" }}
      >
        <nav aria-label="Menu">
          <ol className="flex flex-col gap-1">
            {items.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    data-menu-link
                    href={item.href}
                    onClick={(e) => {
                      if (active) {
                        e.preventDefault();
                        setOpen(false);
                      }
                    }}
                    className="group flex items-baseline gap-5 py-2 md:gap-8"
                  >
                    <span className="mono-label-xs text-stone">0{i + 1}</span>
                    <span
                      className={`font-display text-[13vw] leading-[0.95] tracking-tight transition-colors md:text-[7vw] ${
                        active ? "italic text-stone" : "group-hover:text-stone"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          data-menu-meta
          className="mono-label-xs flex flex-wrap justify-between gap-4 text-paper/50"
        >
          <span>Linienstraße 155 — 10115 Berlin</span>
          <span>studio@mono-architekten.de</span>
          <span>52.529°N 13.401°E</span>
        </div>
      </div>
    </>
  );
}
