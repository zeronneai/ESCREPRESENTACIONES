// Modelo de datos del catálogo. Pensado para migrar 1:1 a Supabase o a un CMS headless (Sanity).
// Los textos guardan { es, en } para habilitar la versión en inglés en una fase posterior.

export type Localized = { es: string; en: string };

export type CleanroomClass = "ISO 5" | "ISO 6" | "ISO 7" | "ISO 8";

export type Unit = "pieza" | "par" | "paquete" | "caja" | "rollo" | "metro";

export type Variant = {
  sku: string;
  size?: string;
  color?: string;
  packQty?: number; // piezas por paquete
  packsPerCase?: number; // paquetes por caja
};

export type Product = {
  slug: string;
  sku: string;
  name: Localized;
  category: string; // slug de Category
  subcategory?: string;
  brand?: string; // "Marca A", "Marca B" o "PENDIENTE"
  material?: string; // usado en filtros
  industries: string[]; // slugs de Industry
  applications: string[];
  shortDescription: Localized;
  description: Localized;
  specs: { label: Localized; value: string }[];
  esdSafe?: boolean;
  cleanroomClass?: CleanroomClass;
  disposable?: boolean;
  units: Unit[]; // unidades en que se puede cotizar
  variants: Variant[];
  images: string[];
  datasheetUrl?: string;
  sdsUrl?: string;
  related?: string[];
  quotedWith?: string[]; // "también se cotizan juntos"
  placeholder?: boolean;
};

export type Category = {
  slug: string;
  name: Localized;
  icon: string; // nombre de ícono lucide
  tagline: string;
  seo: string[]; // 2 a 3 párrafos
  subcategories: string[];
};

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  challenges: { title: string; text: string }[];
  recommended: string[]; // slugs de producto
};

export type Advisor = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  states: string[]; // estados que atiende
  phone: string; // para llamada, formato tel:
  whatsapp: string; // formato internacional sin +
  email: string;
  photo?: string;
  placeholder?: boolean;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  date: string;
  body: { type: "p" | "h2" | "ul"; text?: string; items?: string[] }[];
  relatedProducts: string[];
};
