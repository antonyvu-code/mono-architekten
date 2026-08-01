import type { Metadata } from "next";
import RevealText from "@/components/reveal/RevealText";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "de");
  return { title: dict.studio.title };
}

export default async function StudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const t = getDictionary(locale).studio;

  return (
    <div className="page-margin pt-36 md:pt-44">
      <p className="mono-label mb-5 text-stone-deep">{t.eyebrow}</p>
      <h1 className="font-display mb-16 text-[16vw] leading-[0.85] tracking-tight md:text-[9vw]">
        {t.title}
      </h1>

      {/* statement */}
      <div className="grid-12">
        <div className="col-span-12 md:col-span-9">
          <RevealText
            as="p"
            lines={[t.statement]}
            className="font-display text-3xl leading-snug tracking-tight md:text-5xl md:leading-tight"
          />
        </div>
      </div>

      {/* attitude, two columns */}
      <section className="grid-12 mt-24 md:mt-32" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="mono-label col-span-12 mb-8 text-stone-deep md:col-span-3">
          {t.philosophyTitle}
        </h2>
        <div className="col-span-12 text-[0.9375rem] leading-relaxed text-ink/85 md:col-span-8 md:col-start-5 md:columns-2 md:gap-10">
          {t.philosophy.map((para, i) => (
            <p key={i} className="mb-5 break-inside-avoid">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* numbered principles — the order is the argument */}
      <section className="mt-24 md:mt-32" aria-labelledby="principles-title">
        <h2 id="principles-title" className="mono-label mb-8 text-stone-deep">
          {t.principlesTitle}
        </h2>
        <ol className="hairline-t">
          {t.principles.map((p, i) => (
            <li key={p.title} className="hairline-b grid-12 items-baseline py-7">
              <span className="mono-label-xs col-span-2 text-stone md:col-span-1" aria-hidden="true">
                0{i + 1}
              </span>
              <h3 className="font-display col-span-10 text-3xl tracking-tight md:col-span-4 md:text-4xl">
                {p.title}
              </h3>
              <p className="col-span-12 col-start-3 mt-3 max-w-lg text-sm leading-relaxed text-stone-deep md:col-span-6 md:col-start-6 md:mt-0">
                {p.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* team */}
      <section className="mt-24 md:mt-32" aria-labelledby="team-title">
        <h2 id="team-title" className="mono-label mb-8 text-stone-deep">
          {t.teamTitle}
        </h2>
        <ul className="hairline-t">
          {t.team.map((member) => (
            <li key={member.name} className="hairline-b grid-12 items-baseline py-4">
              <span className="font-display col-span-12 text-xl tracking-tight md:col-span-5 md:text-2xl">
                {member.name}
              </span>
              <span className="mono-label-xs col-span-8 text-stone-deep md:col-span-5 md:col-start-6">
                {member.role}
              </span>
              <span className="mono-label-xs col-span-4 text-right text-stone md:col-span-2">
                {t.teamSince} {member.since}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* studio in numbers */}
      <section className="mt-24 md:mt-32" aria-labelledby="facts-title">
        <h2 id="facts-title" className="mono-label mb-8 text-stone-deep">
          {t.factsTitle}
        </h2>
        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {t.facts.map((f) => (
            <div key={f.label} className="bg-paper p-6 md:p-8">
              <dd className="font-display text-5xl tracking-tight md:text-6xl">{f.value}</dd>
              <dt className="mono-label-xs mt-3 text-stone-deep">{f.label}</dt>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
