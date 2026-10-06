import type { Advisor } from "./types";

// PENDIENTE: reemplazar por el equipo comercial real (nombre, foto, zona, WhatsApp y correo).
// Mientras tanto, todos los contactos apuntan a la oficina en Chihuahua.
const OFFICE_WA = "526144246200";
const OFFICE_TEL = "+526144246200";

export const advisors: Advisor[] = [
  {
    id: "chihuahua",
    name: "Asesor Zona Chihuahua (PENDIENTE)",
    role: "Ejecutivo de cuenta",
    specialty: "Zona Chihuahua y Delicias",
    states: ["Chihuahua", "Durango"],
    phone: OFFICE_TEL,
    whatsapp: OFFICE_WA,
    email: "informacion@elsauz.com",
    placeholder: true,
  },
  {
    id: "juarez",
    name: "Asesor Zona Juárez (PENDIENTE)",
    role: "Ejecutivo de cuenta",
    specialty: "Zona Juárez",
    states: ["Sonora", "Baja California", "Baja California Sur", "Sinaloa"],
    phone: OFFICE_TEL,
    whatsapp: OFFICE_WA,
    email: "informacion@elsauz.com",
    placeholder: true,
  },
  {
    id: "noreste",
    name: "Asesor Zona Noreste (PENDIENTE)",
    role: "Ejecutivo de cuenta",
    specialty: "Zona Noreste: Monterrey, Saltillo, Reynosa",
    states: ["Nuevo León", "Coahuila", "Tamaulipas", "San Luis Potosí", "Zacatecas"],
    phone: OFFICE_TEL,
    whatsapp: OFFICE_WA,
    email: "informacion@elsauz.com",
    placeholder: true,
  },
  {
    id: "bajio",
    name: "Asesor Zona Bajío y Centro (PENDIENTE)",
    role: "Ejecutivo de cuenta",
    specialty: "Zona Bajío y Centro",
    states: [
      "Aguascalientes", "Guanajuato", "Querétaro", "Jalisco", "Michoacán", "Colima", "Nayarit",
      "Ciudad de México", "Estado de México", "Hidalgo", "Morelos", "Puebla", "Tlaxcala", "Guerrero",
      "Veracruz", "Oaxaca", "Chiapas", "Tabasco", "Campeche", "Yucatán", "Quintana Roo",
    ],
    phone: OFFICE_TEL,
    whatsapp: OFFICE_WA,
    email: "informacion@elsauz.com",
    placeholder: true,
  },
  {
    id: "especialista",
    name: "Especialista Técnico (PENDIENTE)",
    role: "Especialista de producto",
    specialty: "Cuarto Limpio y ESD",
    states: [],
    phone: OFFICE_TEL,
    whatsapp: OFFICE_WA,
    email: "informacion@elsauz.com",
    placeholder: true,
  },
];

// Juárez es una ciudad, no un estado: si el comprador está en Chihuahua y escribe "Juárez" en ciudad,
// se sugiere el asesor de Juárez.
export function suggestAdvisor(state?: string, city?: string): Advisor | undefined {
  if (!state) return undefined;
  if (state === "Chihuahua" && city && /ju[aá]rez/i.test(city)) return advisors.find((a) => a.id === "juarez");
  return advisors.find((a) => a.states.includes(state));
}
