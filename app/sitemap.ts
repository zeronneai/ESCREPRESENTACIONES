import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = company.siteUrl;
  const now = new Date();
  const statics = ["", "/catalogo", "/contacto", "/nosotros", "/calidad", "/industrias", "/recursos", "/aviso-de-privacidad"];
  return [
    ...statics.map((p) => ({ url: `${base}${p}`, lastModified: now, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${base}/catalogo/${c.slug}`, lastModified: now, priority: 0.8 })),
    ...products.map((p) => ({ url: `${base}/producto/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...industries.map((i) => ({ url: `${base}/industrias/${i.slug}`, lastModified: now, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${base}/recursos/${a.slug}`, lastModified: new Date(a.date), priority: 0.5 })),
  ];
}
