import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal/Reveal";
import Parallax from "@/components/reveal/Parallax";
import RevealText from "@/components/reveal/RevealText";
import TransitionLink from "@/components/TransitionLink";
import { getDictionary, isLocale, localePath, type Locale } from "@/lib/i18n";
import { getProject, nextProject, projectIndex, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary[locale],
    openGraph: {
      title: `${project.name} — MONO Architekten`,
      description: project.summary[locale],
      images: [{ url: project.hero, width: 1200, height: 800 }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const dict = getDictionary(locale);
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(slug);
  const specs = [
    { label: dict.detail.typology, value: dict.categories[project.category] },
    { label: dict.detail.year, value: project.year },
    { label: dict.detail.location, value: project.location[locale] },
    { label: dict.detail.area, value: project.area },
    { label: dict.detail.status, value: project.status[locale] },
  ];

  return (
    <article>
      {/* full-bleed hero */}
      <Reveal immediate className="h-[68svh] md:h-[78svh]">
        <Parallax className="h-full" amount={5}>
          <Image
            src={project.hero}
            alt={project.heroAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="img-tone object-cover"
          />
        </Parallax>
      </Reveal>

      {/* title block */}
      <header className="page-margin mt-12 md:mt-16">
        <p className="mono-label mb-4 text-stone-deep">
          {projectIndex(project.slug)} / {dict.categories[project.category]} — {project.year}
        </p>
        <RevealText
          immediate
          as="h1"
          lines={[project.name]}
          className="font-display text-[13vw] leading-[0.9] tracking-tight md:text-[8vw]"
        />
      </header>

      {/* specs + two-column body */}
      <div className="page-margin grid-12 mt-14 gap-y-12 md:mt-20">
        <dl className="hairline-t col-span-12 self-start md:col-span-3">
          {specs.map((s) => (
            <div key={s.label} className="hairline-b flex justify-between gap-4 py-3">
              <dt className="mono-label-xs text-stone-deep">{s.label}</dt>
              <dd className="mono-label-xs text-right">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="col-span-12 md:col-span-8 md:col-start-5">
          <p className="font-display mb-10 text-2xl leading-snug tracking-tight md:text-3xl">
            {project.summary[locale]}
          </p>
          <div className="text-[0.9375rem] leading-relaxed text-ink/85 md:columns-2 md:gap-10">
            {project.body[locale].map((para, i) => (
              <p key={i} className="mb-5 break-inside-avoid">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* image stack */}
      <div className="page-margin mt-24 flex flex-col gap-20 md:mt-32 md:gap-28">
        {project.images.map((img, i) => (
          <figure
            key={img.src}
            className={`grid-12 ${i % 2 === 0 ? "" : ""}`}
          >
            <div
              className={`col-span-12 ${
                i % 2 === 0 ? "md:col-span-9" : "md:col-span-8 md:col-start-5"
              }`}
            >
              <Reveal direction={i % 2 === 0 ? "up" : "left"} className="aspect-[3/2] relative">
                <Image
                  src={img.src}
                  alt={img.alt[locale]}
                  fill
                  sizes="(min-width: 768px) 70vw, 100vw"
                  className="img-tone object-cover"
                />
              </Reveal>
              <figcaption className="mono-label-xs mt-3 text-stone-deep">
                {dict.detail.figure} {String(i + 1).padStart(2, "0")} — {img.caption[locale]}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      {/* next project */}
      <nav className="page-margin mt-28 md:mt-40" aria-label={dict.detail.next}>
        <div className="hairline-t pt-6">
          <p className="mono-label-xs mb-6 text-stone-deep">{dict.detail.next}</p>
          <TransitionLink
            href={localePath(locale, `/projects/${next.slug}`)}
            transitionLabel={next.name.toUpperCase()}
            className="group flex flex-wrap items-baseline justify-between gap-4"
          >
            <span className="font-display text-5xl tracking-tight transition-colors group-hover:text-stone md:text-8xl">
              {next.name}
            </span>
            <span className="mono-label text-stone-deep">
              {projectIndex(next.slug)} →
            </span>
          </TransitionLink>
          <TransitionLink
            href={localePath(locale, "/projects")}
            transitionLabel={dict.nav.projects.toUpperCase()}
            className="mono-label-xs link-quiet mt-8 inline-block text-stone-deep"
          >
            ← {dict.detail.backToIndex}
          </TransitionLink>
        </div>
      </nav>
    </article>
  );
}
