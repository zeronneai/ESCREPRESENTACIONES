import { company } from "@/data/company";
import type { QuoteItem } from "./quote-store";

export const waLink = (text: string, number: string = company.whatsapp) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const productWhatsappText = (name: string, sku: string) =>
  `Hola, me interesa el producto ${name} (código ${sku}). ¿Me pueden apoyar con disponibilidad y cotización?`;

export const unitLabel = (unit: string, qty: number) => {
  const map: Record<string, [string, string]> = {
    pieza: ["pieza", "piezas"],
    par: ["par", "pares"],
    paquete: ["paquete", "paquetes"],
    caja: ["caja", "cajas"],
    rollo: ["rollo", "rollos"],
    metro: ["metro", "metros"],
  };
  const [one, many] = map[unit] ?? [unit, unit];
  return qty === 1 ? one : many;
};

export function quoteListWhatsappText(items: QuoteItem[], contact?: { name?: string; company?: string }) {
  const lines = items.map(
    (i, idx) =>
      `${idx + 1}. ${i.productName}\n   Código: ${i.variantSku}${i.variantLabel ? ` (${i.variantLabel})` : ""}\n   Cantidad: ${i.qty} ${unitLabel(i.unit, i.qty)}${i.notes ? `\n   Nota: ${i.notes}` : ""}`,
  );
  const who = contact?.name ? `\nSoy ${contact.name}${contact.company ? ` de ${contact.company}` : ""}.` : "";
  return `Hola El Sauz, quiero cotizar la siguiente lista:${who}\n\n${lines.join("\n\n")}\n\nGracias.`;
}
