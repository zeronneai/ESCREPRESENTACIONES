"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, ClipboardList } from "lucide-react";
import { company } from "@/data/company";
import { waLink } from "@/lib/whatsapp";
import { useQuote } from "@/lib/quote-store";
import { useHydrated } from "@/lib/use-hydrated";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FloatingActions() {
  const hydrated = useHydrated();
  const count = useQuote((s) => s.items.length);
  const pathname = usePathname();
  const n = hydrated ? count : 0;
  const wa = waLink("Hola El Sauz, me gustaría recibir información de sus productos.");
  const onQuote = pathname === "/cotizacion";

  return (
    <>
      {/* Escritorio: botones flotantes */}
      <div className="fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-3 lg:flex">
        {!onQuote && n > 0 && (
          <Link href="/cotizacion" className="flex items-center gap-2 rounded-full bg-brand-700 py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-lg shadow-brand-900/20 hover:bg-brand-800">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            Mi cotización
            <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-brand-700">{n}</span>
          </Link>
        )}
        <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Escríbanos por WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#128C4A] text-white shadow-lg shadow-green-900/20 transition-transform hover:scale-105">
          <WhatsAppIcon className="h-7 w-7" />
        </a>
      </div>

      {/* Móvil: barra de acciones fija */}
      <nav aria-label="Acciones rápidas" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <a href={company.tollFreeHref} className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-slate-700">
          <Phone className="h-5 w-5 text-brand-700" aria-hidden="true" /> Llamar
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-slate-700">
          <WhatsAppIcon className="h-5 w-5 text-[#128C4A]" /> WhatsApp
        </a>
        <Link href="/cotizacion" className="relative flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold text-accent-700">
          <span className="relative">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            {n > 0 && <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-700 px-1 text-[10px] font-bold text-white">{n}</span>}
          </span>
          Cotización
        </Link>
      </nav>
    </>
  );
}
