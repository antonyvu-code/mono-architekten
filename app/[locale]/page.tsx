import Image from "next/image";
import Reveal from "@/components/reveal/Reveal";
import Parallax from "@/components/reveal/Parallax";
import RevealText from "@/components/reveal/RevealText";
import TransitionLink from "@/components/TransitionLink";
import SunReadout from "@/components/chrome/SunReadout";
import { getDictionary, isLocale, localePath, type Locale } from "@/lib/i18n";
import { featuredProjects, projectIndex } from "@/lib/projects";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const dict = getDictionary(locale);
  const t = dict.home;

  return (
    <>
      {/* ——— die Fassade ———
          Der Hero ist keine Überschrift auf einer Fläche, sondern eine Fassade im Licht
          dieses Augenblicks: Streiflicht und Schattenwurf kommen aus dem echten Berliner
          Sonnenstand (`lib/sun.ts`), nicht aus einem festen Gradienten. Um 9 Uhr streift
          das Licht aus Osten, um 18 Uhr aus Westen, nachts bleibt die Fassade unbeleuchtet
          — was ehrlicher ist als ein erfundener Schatten. */}
      <section className="rake page-margin relative flex min-h-svh flex-col justify-end pb-14 pt-32">
        <p className="mono-label mb-6 text-stone-deep">{t.eyebrow}</p>
        <RevealText
          immediate
          as="h1"
          lines={[t.heroA, t.heroB]}
          className="font-display facade"
          lineClassNames={[
            "text-[22vw] leading-[0.82] tracking-[0.012em] md:text-[17vw]",
            "display-emph pl-[10vw] text-[13vw] leading-[1.05] tracking-[0.012em] text-stone md:text-[8.5vw]",
          ]}
        />
        <div className="hairline-t mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-5">
          <p className="mono-label-xs max-w-md text-stone-deep">{t.tagline}</p>
          <div className="flex items-baseline gap-6">
            <SunReadout />
            <p className="mono-label-xs text-stone-deep" aria-hidden="true">
              {t.scroll} ↓
            </p>
          </div>
        </div>
      </section>

      {/* ——— selected works, alternating left / right ——— */}
      <section className="page-margin mt-10 md:mt-24" aria-labelledby="selected-title">
        <div className="mb-14 flex items-baseline justify-between">
          <h2 id="selected-title" className="mono-label text-stone-deep">
            {t.selected}
          </h2>
          <p className="mono-label-xs text-stone" aria-hidden="true">
            {t.selectedIndex}
          </p>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {featuredProjects.map((p, i) => {
            const right = i % 2 === 1;
            const href = localePath(locale, `/projects/${p.slug}`);
            return (
              <article key={p.slug} className="grid-12 items-end gap-y-8">
                <div
                  className={`col-span-12 md:col-span-7 ${right ? "md:col-start-6 md:order-2" : ""}`}
                >
                  <TransitionLink
                    href={href}
                    transitionLabel={p.name.toUpperCase()}
                    aria-label={p.name}
                    className="card-frame block"
                    tabIndex={-1}
                  >
                    <Reveal direction={right ? "left" : "up"} className="card-media aspect-[4/3]">
                      <Parallax className="h-full">
                        <Image
                          src={p.hero}
                          alt={p.heroAlt[locale]}
                          fill
                          sizes="(min-width: 768px) 58vw, 100vw"
                          className="img-tone object-cover"
                        />
                      </Parallax>
                    </Reveal>
                  </TransitionLink>
                </div>

                <div
                  className={`col-span-12 md:col-span-4 ${right ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}
                >
                  <p className="mono-label-xs mb-4 text-stone-deep">
                    {projectIndex(p.slug)} / {dict.categories[p.category]} — {p.year}
                  </p>
                  <h3 className="font-display text-4xl leading-none md:text-5xl">
                    <TransitionLink href={href} transitionLabel={p.name.toUpperCase()}>
                      {p.name}
                    </TransitionLink>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-deep">
                    {p.summary[locale]}
                  </p>
                  <TransitionLink
                    href={href}
                    transitionLabel={p.name.toUpperCase()}
                    className="mono-label-xs link-quiet mt-6 inline-block"
                  >
                    {t.viewProject} →
                  </TransitionLink>
                </div>
              </article>
            );
          })}
        </div>

        <div className="hairline-t mt-24 pt-6 md:mt-32">
          <TransitionLink
            href={localePath(locale, "/projects")}
            transitionLabel={dict.nav.projects.toUpperCase()}
            className="group flex items-baseline justify-between"
          >
            <span className="font-display text-5xl transition-colors group-hover:text-stone md:text-7xl">
              {t.allProjects}
            </span>
            <span className="mono-label text-stone-deep">07 →</span>
          </TransitionLink>
        </div>
      </section>

      {/* ——— studio statement ——— */}
      <section className="page-margin mt-32 md:mt-48">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <p className="mono-label mb-6 text-stone-deep">{dict.studio.philosophyTitle}</p>
            <RevealText
              as="p"
              lines={[t.statement]}
              className="font-display text-3xl leading-snug md:text-5xl md:leading-tight"
            />
            <TransitionLink
              href={localePath(locale, "/studio")}
              transitionLabel={dict.nav.studio.toUpperCase()}
              className="mono-label link-quiet mt-10 inline-block"
            >
              {t.statementLink} →
            </TransitionLink>
          </div>
        </div>
      </section>
    </>
  );
}
