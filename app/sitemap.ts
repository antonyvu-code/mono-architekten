import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/lib/projects";

const BASE = "https://mono-architekten.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/projects", "/studio", "/contact"];
  return locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
    })),
    ...projects.map((p) => ({
      url: `${BASE}/${locale}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
  ]);
}
