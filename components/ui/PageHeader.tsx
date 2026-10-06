import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHeader({ eyebrow, title, intro, crumbs, children }: { eyebrow?: string; title: string; intro?: string; crumbs?: Crumb[]; children?: React.ReactNode }) {
  return (
    <section className="border-b border-line bg-mist bg-grid">
      <div className="container-x py-8 sm:py-12">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mt-5">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-lg text-slate-600">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
