import TransitionLink from "@/components/TransitionLink";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export default function SiteFooter({ locale, dict }: Props) {
  const { footer, nav, contact } = dict;
  const links = [
    { label: nav.projects, href: localePath(locale, "/projects") },
    { label: nav.studio, href: localePath(locale, "/studio") },
    { label: nav.contact, href: localePath(locale, "/contact") },
  ];

  return (
    <footer className="hairline-t page-margin mt-28 pb-24 pt-14 md:mt-40 md:pb-16">
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 md:col-span-6">
          <p className="font-display text-[14vw] leading-[0.9] md:text-[6.5vw]">
            MONO
          </p>
          <p className="mono-label mt-4 text-stone-deep">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.navTitle} className="col-span-6 md:col-span-2">
          <h2 className="mono-label-xs mb-4 text-stone-deep">{footer.navTitle}</h2>
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <TransitionLink
                  href={l.href}
                  transitionLabel={l.label.toUpperCase()}
                  className="link-quiet text-sm"
                >
                  {l.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 md:col-span-2">
          <h2 className="mono-label-xs mb-4 text-stone-deep">{footer.officeTitle}</h2>
          <address className="text-sm not-italic leading-relaxed">
            {contact.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <a href="mailto:studio@mono-architekten.de" className="link-quiet mt-2 block">
              studio@mono-architekten.de
            </a>
          </address>
        </div>

        <div className="col-span-12 md:col-span-2">
          <h2 className="mono-label-xs mb-4 text-stone-deep">{footer.legalTitle}</h2>
          <ul className="flex flex-col gap-2 text-sm text-stone-deep">
            <li>{footer.imprint}</li>
            <li>{footer.privacy}</li>
          </ul>
        </div>
      </div>

      <div className="hairline-t mono-label-xs mt-14 flex flex-wrap items-center justify-between gap-3 pt-5 text-stone-deep">
        <span>© 2026 MONO Architekten</span>
        <span>{footer.concept}</span>
        <span aria-hidden="true">{footer.gridHint}</span>
      </div>
    </footer>
  );
}
