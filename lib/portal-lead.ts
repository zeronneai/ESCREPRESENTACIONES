import { randomUUID } from "node:crypto";
import { FREQUENCY_LABEL, type QuotePayload } from "@/lib/quote-schema";
import { unitLabel } from "@/lib/whatsapp";

/**
 * Envia cada solicitud de cotizacion del sitio al modulo de Leads del portal interno
 * (esccotizaciones.vercel.app). Corre SOLO en el servidor: la clave nunca llega al navegador.
 *
 * Variables (Vercel > Settings > Environment Variables del sitio):
 *   PORTAL_LEADS_URL     https://esccotizaciones.vercel.app/api/leads/entrada
 *   PORTAL_LEADS_SECRET  la misma clave que LEADS_WEBHOOK_SECRET del portal
 * Si falta alguna, no se envia nada y el sitio sigue funcionando igual.
 */

const cut = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

export function buildPortalLead(folio: string, d: QuotePayload, extra: { advisor?: string | null; attachment?: string | null } = {}) {
  const items = d.items.map((i) => `${i.productName}${i.variantLabel ? ` (${i.variantLabel})` : ""}: ${i.qty} ${unitLabel(i.unit, i.qty)}`);
  const lines = [
    `Solicitud de cotización ${folio} desde el sitio web.`,
    items.length ? `Productos:\n${d.items.map((i, n) => `${n + 1}. ${items[n]}${i.variantSku ? ` [${i.variantSku}]` : ""}${i.notes ? `. Nota: ${i.notes}` : ""}`).join("\n")}` : "",
    `Frecuencia: ${FREQUENCY_LABEL[d.frequency]}${d.neededBy ? `. Fecha requerida: ${d.neededBy}` : ""}`,
    d.rfc ? `RFC: ${d.rfc}` : "",
    d.comments ? `Comentarios: ${d.comments}` : "",
    extra.attachment ? `Adjuntó el archivo "${extra.attachment}" (llegó al correo de cotizaciones).` : "",
    extra.advisor ? `Asesor sugerido por zona: ${extra.advisor}` : "",
  ].filter(Boolean);

  return {
    empresa: cut(d.company, 200),
    nombre: cut(d.name, 150),
    puesto: cut(d.position, 120),
    telefono: cut(d.phone, 40),
    correo: cut(d.email, 200),
    ciudad: cut(`${d.city}, ${d.state}`, 120),
    producto: cut(items.join("; ") || "Requisición adjunta / ver comentarios", 500),
    mensaje: cut(lines.join("\n"), 2000),
    pagina: cut(`elsauz.com/cotizacion · ${folio}`, 300),
    // Unico por envio: el folio del prototipo se reinicia con cada despliegue.
    externo_id: `web-${randomUUID()}`,
  };
}

/** Nunca lanza error: si el portal no responde, la cotizacion del cliente se procesa igual. */
export async function sendLeadToPortal(lead: ReturnType<typeof buildPortalLead>): Promise<boolean> {
  const url = process.env.PORTAL_LEADS_URL;
  const secret = process.env.PORTAL_LEADS_SECRET;
  if (!url || !secret) return false;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${secret}` },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[cotizacion] El portal rechazó el lead", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[cotizacion] No se pudo enviar el lead al portal", err);
    return false;
  }
}
