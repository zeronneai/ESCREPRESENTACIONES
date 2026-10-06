import { z } from "zod";
import { MX_STATES } from "@/data/states";

const rfcRegex = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})$/i;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Escriba su nombre completo").max(120),
  company: z.string().trim().min(2, "Escriba el nombre de su empresa").max(160),
  position: z.string().trim().min(2, "Indique su puesto").max(120),
  city: z.string().trim().min(2, "Indique la planta o ciudad").max(120),
  state: z.enum(MX_STATES, { message: "Seleccione un estado" }),
  email: z.string().trim().email("Correo no válido").max(160),
  phone: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{10,20}$/, "Teléfono a 10 dígitos"),
  rfc: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || rfcRegex.test(v), "RFC no válido"),
  frequency: z.enum(["unica", "mensual", "contrato"], { message: "Seleccione una opción" }),
  neededBy: z.string().optional(),
  comments: z.string().max(2000).optional(),
  privacy: z.literal(true, { message: "Debe aceptar el Aviso de Privacidad" }),
  website: z.string().max(0).optional(), // honeypot anti-spam
});

export const quoteItemSchema = z.object({
  productSlug: z.string().max(120),
  productName: z.string().max(200),
  variantSku: z.string().max(60),
  variantLabel: z.string().max(200),
  qty: z.number().int().positive().max(1_000_000),
  unit: z.enum(["pieza", "par", "paquete", "caja", "rollo", "metro"]),
  notes: z.string().max(500),
});

export const quotePayloadSchema = contactSchema.extend({
  items: z.array(quoteItemSchema).min(1, "La lista de cotización está vacía").max(200),
});

export type ContactValues = z.infer<typeof contactSchema>;
export type QuotePayload = z.infer<typeof quotePayloadSchema>;

export const FREQUENCY_LABEL: Record<ContactValues["frequency"], string> = {
  unica: "Compra única",
  mensual: "Compra mensual",
  contrato: "Contrato o acuerdo anual",
};
