import { NextResponse } from "next/server";
import { quotePayloadSchema, FREQUENCY_LABEL, type QuotePayload } from "@/lib/quote-schema";
import { nextFolio } from "@/lib/folio";
import { suggestAdvisor } from "@/data/advisors";
import { unitLabel } from "@/lib/whatsapp";

export const runtime = "nodejs";

const MAX_FILE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/csv",
];

// Límite simple por IP para el prototipo (en producción usar Upstash/Vercel KV o el firewall de Vercel).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function renderEmail(folio: string, d: QuotePayload) {
  const rows = d.items
    .map((i, n) => `<tr><td>${n + 1}</td><td>${esc(i.productName)}<br><small>${esc(i.variantLabel)}</small></td><td><code>${esc(i.variantSku)}</code></td><td>${i.qty} ${unitLabel(i.unit, i.qty)}</td><td>${esc(i.notes)}</td></tr>`)
    .join("");
  return `<h2>Solicitud de cotización ${folio}</h2>
<p><b>${esc(d.name)}</b>, ${esc(d.position)}<br>${esc(d.company)}, ${esc(d.city)}, ${esc(d.state)}<br>${esc(d.email)} · ${esc(d.phone)}${d.rfc ? `<br>RFC: ${esc(d.rfc)}` : ""}</p>
<p>Frecuencia: ${FREQUENCY_LABEL[d.frequency]}${d.neededBy ? ` · Fecha requerida: ${esc(d.neededBy)}` : ""}</p>
<table border="1" cellpadding="6" cellspacing="0"><thead><tr><th>#</th><th>Producto</th><th>Código</th><th>Cantidad</th><th>Notas</th></tr></thead><tbody>${rows}</tbody></table>
${d.comments ? `<p><b>Comentarios:</b> ${esc(d.comments)}</p>` : ""}`;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return NextResponse.json({ error: "Demasiadas solicitudes. Intente de nuevo en unos minutos." }, { status: 429 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  let raw: unknown;
  try {
    raw = JSON.parse(String(form.get("payload") ?? ""));
  } catch {
    return NextResponse.json({ error: "Solicitud no válida." }, { status: 400 });
  }

  const parsed = quotePayloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revise los datos del formulario.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const data = parsed.data;

  const file = form.get("file");
  let attachment: { filename: string; content: Buffer } | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE) return NextResponse.json({ error: "El archivo excede 5 MB." }, { status: 413 });
    if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Tipo de archivo no permitido." }, { status: 415 });
    attachment = { filename: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120), content: Buffer.from(await file.arrayBuffer()) };
  }

  const folio = nextFolio();
  const advisor = suggestAdvisor(data.state, data.city);

  console.log("[cotizacion] Nueva solicitud", JSON.stringify({ folio, advisor: advisor?.id, ...data, attachment: attachment?.filename }, null, 2));

  // Envío por correo con Resend (opcional). Ver README > "Configurar Resend".
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.QUOTE_FROM_EMAIL || "cotizaciones@elsauz.com";
      const to = (process.env.QUOTE_TO_EMAIL || "informacion@elsauz.com").split(",").map((s) => s.trim());
      await resend.emails.send({
        from: `El Sauz Cotizaciones <${from}>`,
        to: advisor && !advisor.placeholder ? [...to, advisor.email] : to,
        replyTo: data.email,
        subject: `${folio} · ${data.company} · ${data.items.length} partidas`,
        html: renderEmail(folio, data),
        attachments: attachment ? [attachment] : undefined,
      });
      await resend.emails.send({
        from: `El Sauz <${from}>`,
        to: [data.email],
        subject: `Recibimos su solicitud de cotización ${folio}`,
        html: `<p>Hola ${esc(data.name)},</p><p>Recibimos su solicitud <b>${folio}</b> con ${data.items.length} partidas. Un asesor le responderá en un máximo de 24 horas hábiles.</p>${renderEmail(folio, data)}<p>El Sauz · 800 890 3276 · informacion@elsauz.com</p>`,
      });
    } catch (err) {
      console.error("[cotizacion] Error al enviar con Resend", err);
      // No se bloquea al usuario: la solicitud ya quedó registrada en el log.
    }
  }

  return NextResponse.json({ folio, advisorId: advisor?.id ?? null });
}
