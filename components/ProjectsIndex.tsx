"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import TransitionLink from "@/components/TransitionLink";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { projects, projectIndex, type Category } from "@/lib/projects";

type Filter = Category | "all";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function ProjectsIndex({ locale, dict }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const gridRef = useRef<HTMLUListElement>(null);

  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: dict.projects.filterAll, count: projects.length },
    ...(["residential", "cultural", "commercial"] as const).map((c) => ({
      key: c as Filter,
      label: dict.categories[c],
      count: projects.filter((p) => p.category === c).length,
    })),
  ];

  // fade the grid in whenever the visible set changes
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        gridRef.current!.querySelectorAll("[data-card]"),
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          clearProps: "transform",
          onComplete: () => ScrollTrigger.refresh(),
        }
      );
    },
    { dependencies: [filter], scope: gridRef }
  );

  return (
    <>
      <div
        role="group"
        aria-label={dict.projects.filterLabel}
        className="hairline-t hairline-b flex flex-wrap gap-x-8 gap-y-2 py-4"
      >
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`mono-label transition-colors ${
              filter === f.key ? "text-ink underline underline-offset-4" : "text-stone-deep hover:text-ink"
            }`}
          >
            {f.label} <span className="text-stone">({f.count})</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mono-label mt-16 text-stone-deep">{dict.projects.empty}</p>
      ) : (
        <ul ref={gridRef} className="mt-14 grid grid-cols-1 gap-x-7 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {visible.map((p) => {
            const href = localePath(locale, `/projects/${p.slug}`);
            return (
              <li key={p.slug} data-card>
                <TransitionLink
                  href={href}
                  transitionLabel={p.name.toUpperCase()}
                  className="card-frame group block"
                >
                  <figure>
                    <div className="card-media aspect-[4/3] relative">
                      <Image
                        src={p.hero}
                        alt={p.heroAlt[locale]}
                        fill
                        sizes="(min-width: 768px) 46vw, 100vw"
                        className="img-tone object-cover"
                      />
                    </div>
                    <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                      <span className="flex items-baseline gap-4">
                        <span className="mono-label-xs text-stone" aria-hidden="true">
                          {projectIndex(p.slug)}
                        </span>
                        <span className="font-display text-2xl tracking-tight transition-colors group-hover:text-stone-deep md:text-3xl">
                          {p.name}
                        </span>
                      </span>
                      <span className="mono-label-xs shrink-0 text-stone-deep">
                        {dict.categories[p.category]} — {p.year}
                      </span>
                    </figcaption>
                    <p className="mono-label-xs mt-1.5 text-stone">{p.location[locale]}</p>
                  </figure>
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
