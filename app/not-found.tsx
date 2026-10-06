import Link from "next/link";
import { SearchBox } from "@/components/catalog/SearchBox";

export default function NotFound() {
  return (
    <section className="container-x max-w-2xl py-20 text-center">
      <p className="font-display text-6xl font-extrabold text-brand-100">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">No encontramos esta página</h1>
      <p className="mt-3 text-slate-600">Es posible que el producto haya cambiado de nombre. Búsquelo por código o palabra clave.</p>
      <div className="mt-8 text-left"><SearchBox /></div>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn-outline">Ir al inicio</Link>
        <Link href="/catalogo" className="btn-primary">Ver catálogo</Link>
      </div>
    </section>
  );
}
