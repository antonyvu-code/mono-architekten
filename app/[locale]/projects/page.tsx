import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "de");
  return { title: dict.projects.title };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const dict = getDictionary(locale);

  return (
    <div className="page-margin pt-36 md:pt-44">
      <p className="mono-label mb-5 text-stone-deep">{dict.projects.eyebrow}</p>
      <h1 className="font-display mb-12 text-[16vw] leading-[0.85] tracking-tight md:text-[9vw]">
        {dict.projects.title}
        <span className="align-top text-[4vw] text-stone md:text-[2vw]"> (07)</span>
      </h1>
      <ProjectsIndex locale={locale} dict={dict} />
    </div>
  );
}
