import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Space_Mono } from "next/font/google";
import "../globals.css";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import SmoothScroll from "@/components/SmoothScroll";
import TransitionProvider from "@/components/TransitionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CornerTicks from "@/components/chrome/CornerTicks";
import Telemetry from "@/components/chrome/Telemetry";
import ProgressLine from "@/components/chrome/ProgressLine";
import GridOverlay from "@/components/chrome/GridOverlay";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "de");
  return {
    title: {
      default: dict.meta.title,
      template: "%s — MONO Architekten",
    },
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      siteName: "MONO Architekten",
      images: [
        {
          url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&h=630&auto=format&fit=crop",
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      languages: { de: "/de", en: "/en" },
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MONO Architekten",
  description: "Architekturbüro in Berlin — Wohnen, Kultur, Gewerbe. (Konzeptprojekt)",
  url: "https://mono-architekten.example",
  email: "studio@mono-architekten.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Linienstraße 155",
    postalCode: "10115",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  foundingDate: "2011",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "de";
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${instrument.variable} ${archivo.variable} ${spaceMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#content" className="skip-link mono-label">
          {dict.nav.skip}
        </a>
        <SmoothScroll />
        <TransitionProvider>
          <SiteHeader locale={locale} nav={dict.nav} />
          <main id="content">{children}</main>
          <SiteFooter locale={locale} dict={dict} />
        </TransitionProvider>
        <ProgressLine />
        <CornerTicks />
        <Telemetry />
        <GridOverlay label={dict.footer.grid} hint={dict.footer.gridHint} />
      </body>
    </html>
  );
}
