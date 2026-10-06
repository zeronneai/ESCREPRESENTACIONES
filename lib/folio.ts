// Folio de cotización COT-AAAA-NNNN.
// PROTOTIPO: el contador vive en memoria del servidor y se reinicia con cada despliegue.
// En producción usar una secuencia en base de datos (p. ej. Supabase) para garantizar folios únicos.
let counter = 0;

export function nextFolio(date = new Date()) {
  counter += 1;
  return `COT-${date.getFullYear()}-${String(counter).padStart(4, "0")}`;
}
