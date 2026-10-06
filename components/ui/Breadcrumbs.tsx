import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const link = dark ? "text-brand-100 hover:text-white" : "hover:text-brand-700";
  return (
    <nav aria-label="Ruta de navegación" className={`text-sm ${dark ? "text-brand-200" : "text-slate-500"}`}>
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link href="/" className={link}>Inicio</Link></li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {c.href ? <Link href={c.href} className={link}>{c.label}</Link> : <span aria-current="page" className={dark ? "text-white" : "text-slate-700"}>{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
