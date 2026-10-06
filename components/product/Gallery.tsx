"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (lightbox && !d.open) d.showModal();
    if (!lightbox && d.open) d.close();
  }, [lightbox]);

  const src = images[idx];
  const unopt = src.endsWith(".svg");
  const step = (n: number) => setIdx((i) => (i + n + images.length) % images.length);

  return (
    <div>
      <button
        type="button"
        className="card relative block aspect-square w-full cursor-zoom-in overflow-hidden bg-mist"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
        }}
        onMouseLeave={() => setZoom(null)}
        onClick={() => setLightbox(true)}
        aria-label="Ampliar imagen"
      >
        <Image
          src={src}
          alt={`${alt}, imagen ${idx + 1} de ${images.length}`}
          fill
          priority
          sizes="(min-width:1024px) 50vw, 100vw"
          unoptimized={unopt}
          className="object-cover transition-transform duration-150"
          style={zoom ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" /> <span className="hidden sm:inline">Pase el cursor o toque para ampliar</span>
        </span>
      </button>
      <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
        {images.map((im, i) => (
          <li key={im}>
            <button
              type="button"
              onClick={() => setIdx(i)}
              className={`relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-mist ${i === idx ? "border-brand-600" : "border-transparent hover:border-brand-200"}`}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === idx}
            >
              <Image src={im} alt="" fill sizes="100px" unoptimized={im.endsWith(".svg")} className="object-cover" />
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dlg} onClose={() => setLightbox(false)} className="m-auto h-[min(92vh,900px)] w-[min(96vw,900px)] max-w-none rounded-2xl bg-white p-0 backdrop:bg-ink/80" aria-label="Galería ampliada">
        <div className="relative h-full w-full">
          <Image src={src} alt={alt} fill sizes="900px" unoptimized={unopt} className="object-contain" />
          <button onClick={() => setLightbox(false)} className="absolute right-3 top-3 rounded-full bg-white p-2 shadow" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          {images.length > 1 && (
            <>
              <button onClick={() => step(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow" aria-label="Anterior"><ChevronLeft className="h-6 w-6" /></button>
              <button onClick={() => step(1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow" aria-label="Siguiente"><ChevronRight className="h-6 w-6" /></button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
