import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import StylizedMap from "@/components/StylizedMap";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "de");
  return { title: dict.contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const t = getDictionary(locale).contact;

  return (
    <div className="page-margin pt-36 md:pt-44">
      <p className="mono-label mb-5 text-stone-deep">{t.eyebrow}</p>
      <h1 className="font-display mb-10 text-[16vw] leading-[0.85] tracking-tight md:text-[9vw]">
        {t.title}
      </h1>

      <div className="grid-12 gap-y-16">
        <div className="col-span-12 md:col-span-5">
          <p className="mb-12 max-w-md text-[0.9375rem] leading-relaxed text-ink/85">{t.intro}</p>
          <ContactForm t={t} />
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <StylizedMap caption={t.mapCaption} />
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <h2 className="mono-label-xs mb-3 text-stone-deep">{t.addressTitle}</h2>
              <address className="text-sm not-italic leading-relaxed">
                {t.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h2 className="mono-label-xs mb-3 text-stone-deep">—</h2>
              <p className="text-sm leading-relaxed">
                <a href="mailto:studio@mono-architekten.de" className="link-quiet block">
                  studio@mono-architekten.de
                </a>
                <a href="tel:+493028599155" className="link-quiet mt-1 block">
                  +49 30 285 991 55
                </a>
                <span className="mt-2 block text-stone-deep">{t.hours}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
