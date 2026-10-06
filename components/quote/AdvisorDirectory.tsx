"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, UserRound } from "lucide-react";
import { advisors, suggestAdvisor } from "@/data/advisors";
import { MX_STATES } from "@/data/states";
import { waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Pending } from "@/components/ui/Pending";

export function AdvisorDirectory() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const suggested = suggestAdvisor(state || undefined, city);

  return (
    <div>
      <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="adv-state" className="field-label">¿En qué estado está su planta?</label>
          <select id="adv-state" value={state} onChange={(e) => setState(e.target.value)} className="field">
            <option value="">Seleccione su estado…</option>
            {MX_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {state === "Chihuahua" && (
          <div className="flex-1">
            <label htmlFor="adv-city" className="field-label">Ciudad</label>
            <select id="adv-city" value={city} onChange={(e) => setCity(e.target.value)} className="field">
              <option value="">Chihuahua, Delicias, Cuauhtémoc…</option>
              <option value="Juárez">Ciudad Juárez</option>
            </select>
          </div>
        )}
        <p className="text-sm text-slate-600 sm:max-w-xs" aria-live="polite">
          {suggested ? <>Le sugerimos a <strong className="text-brand-700">{suggested.specialty}</strong>.</> : "Le mostramos al asesor de su zona."}
        </p>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {advisors.map((a) => {
          const hl = suggested?.id === a.id;
          return (
            <li key={a.id} className={`card relative flex flex-col p-5 transition ${hl ? "border-brand-600 ring-2 ring-brand-600" : ""}`}>
              {hl && <span className="absolute -top-3 left-5 rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">Asesor de su zona</span>}
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-300" aria-hidden="true">
                  <UserRound className="h-9 w-9" strokeWidth={1.4} />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg font-bold leading-tight">{a.specialty}</p>
                  <p className="text-sm text-slate-600">{a.role}</p>
                  {a.placeholder && <p className="mt-1"><Pending label="Nombre y foto pendientes" /></p>}
                </div>
              </div>
              {a.states.length > 0 ? (
                <p className="mt-4 flex gap-2 text-xs text-slate-600"><MapPin className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" /> {a.states.length > 6 ? `${a.states.slice(0, 6).join(", ")} y ${a.states.length - 6} estados más` : a.states.join(", ")}</p>
              ) : (
                <p className="mt-4 text-xs text-slate-600">Apoyo técnico para todo el país: selección de indumentaria, clase ISO y programas ESD.</p>
              )}
              <div className="mt-auto grid grid-cols-3 gap-2 pt-5">
                <a href={waLink(`Hola, busco al asesor de ${a.specialty}.`, a.whatsapp)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp px-2 text-xs" aria-label={`WhatsApp a ${a.specialty}`}><WhatsAppIcon className="h-4 w-4" /> WhatsApp</a>
                <a href={`tel:${a.phone}`} className="btn-outline px-2 text-xs" aria-label={`Llamar a ${a.specialty}`}><Phone className="h-4 w-4" aria-hidden="true" /> Llamar</a>
                <a href={`mailto:${a.email}?subject=${encodeURIComponent(`Contacto web: ${a.specialty}`)}`} className="btn-outline px-2 text-xs" aria-label={`Correo a ${a.specialty}`}><Mail className="h-4 w-4" aria-hidden="true" /> Correo</a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
