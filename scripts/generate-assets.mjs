// Genera imágenes placeholder por producto en /public/products/[slug]/{1,2,3}.svg
// y PDFs de ejemplo en /public/docs. Uso: node scripts/generate-assets.mjs
// Al tener fotos reales, reemplace los SVG por 1.jpg, 2.jpg... y actualice `images` en data/products.ts.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "data/products.ts"), "utf8");

// Extrae slug, categoría y nombre de cada producto del archivo de datos.
const blocks = src.split(/\n\s*p\(\{/).slice(1);
const items = blocks.map((b) => ({
  slug: b.match(/slug: "([^"]+)"/)[1],
  category: b.match(/category: "([^"]+)"/)[1],
  name: b.match(/name: t\("([^"]+)"/)[1],
  sku: b.match(/sku: "([^"]+)"/)[1],
}));

const BLUE = "#004DA2";
const STROKE = `fill="none" stroke="${BLUE}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"`;
const FILL = `fill="#D9E6F6"`;

// Ilustraciones lineales simples, centradas en un lienzo de 800x800.
const shapes = {
  gown: `<path ${FILL} d="M330 190 L400 230 L470 190 L560 230 L620 380 L570 400 L545 330 L545 610 L255 610 L255 330 L230 400 L180 380 L240 230 Z"/><path ${STROKE} d="M330 190 L400 230 L470 190 L560 230 L620 380 L570 400 L545 330 L545 610 L255 610 L255 330 L230 400 L180 380 L240 230 Z M400 230 L400 610"/>`,
  coverall: `<path ${FILL} d="M340 170 Q400 130 460 170 L470 220 L560 250 L610 420 L565 435 L530 340 L530 470 L510 640 L420 640 L400 470 L380 640 L290 640 L270 470 L270 340 L235 435 L190 420 L240 250 L330 220 Z"/><path ${STROKE} d="M340 170 Q400 130 460 170 L470 220 L560 250 L610 420 L565 435 L530 340 L530 470 L510 640 L420 640 L400 470 L380 640 L290 640 L270 470 L270 340 L235 435 L190 420 L240 250 L330 220 Z M400 220 L400 460"/>`,
  glove: `<path ${FILL} d="M300 620 L300 420 Q260 380 250 330 Q245 300 275 300 Q300 305 320 360 L320 220 Q320 195 345 195 Q370 195 370 220 L370 330 L375 190 Q375 165 400 165 Q425 165 425 190 L425 330 L430 210 Q430 185 455 185 Q480 185 480 210 L480 340 L485 250 Q485 228 508 228 Q530 228 530 252 L530 460 Q530 540 490 580 L490 620 Z"/><path ${STROKE} d="M300 620 L300 420 Q260 380 250 330 Q245 300 275 300 Q300 305 320 360 L320 220 Q320 195 345 195 Q370 195 370 220 L370 330 L375 190 Q375 165 400 165 Q425 165 425 190 L425 330 L430 210 Q430 185 455 185 Q480 185 480 210 L480 340 L485 250 Q485 228 508 228 Q530 228 530 252 L530 460 Q530 540 490 580 L490 620 Z M300 580 L490 580"/>`,
  cot: `<path ${FILL} d="M340 620 L340 300 Q340 220 400 220 Q460 220 460 300 L460 620 Z"/><path ${STROKE} d="M340 620 L340 300 Q340 220 400 220 Q460 220 460 300 L460 620 Z M330 600 L470 600 M330 580 L470 580"/>`,
  swab: `<g ${STROKE}><path d="M260 620 L470 260"/><path d="M340 640 L520 300"/><path d="M420 650 L570 340"/></g><g ${FILL} stroke="${BLUE}" stroke-width="10"><rect x="440" y="190" width="60" height="100" rx="18" transform="rotate(30 470 240)"/><rect x="495" y="230" width="56" height="90" rx="28" transform="rotate(28 523 275)"/><rect x="548" y="275" width="50" height="80" rx="10" transform="rotate(26 573 315)"/></g>`,
  wipes: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path fill="#EEF4FB" d="M230 470 L400 560 L570 470 L400 380 Z" transform="translate(0 60)"/><path fill="#E3EDF8" d="M230 470 L400 560 L570 470 L400 380 Z" transform="translate(0 25)"/><path ${FILL} d="M230 470 L400 560 L570 470 L400 380 Z" transform="translate(0 -10)"/><path fill="#fff" d="M300 440 Q380 330 470 400 Q430 300 330 280 Z"/></g>`,
  fabric: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><ellipse cx="300" cy="420" rx="70" ry="150" ${FILL}/><path fill="#EEF4FB" d="M300 270 L560 300 L560 620 L300 570"/><ellipse cx="300" cy="420" rx="30" ry="64" fill="#fff"/></g>`,
  mat: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path fill="#EEF4FB" d="M180 520 L400 610 L620 520 L400 430 Z" transform="translate(0 30)"/><path ${FILL} d="M180 520 L400 610 L620 520 L400 430 Z"/><path fill="#fff" d="M560 495 L620 520 L560 545 Z"/></g><text x="400" y="530" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="${BLUE}">30</text>`,
  brush: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><rect x="200" y="380" width="300" height="60" rx="30" ${FILL}/><rect x="480" y="350" width="140" height="120" rx="14" fill="#fff"/></g><g ${STROKE}><path d="M500 470 L500 560 M530 470 L530 570 M560 470 L560 570 M590 470 L590 560"/></g>`,
  glasses: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M190 360 Q400 330 610 360 L600 450 Q560 500 470 480 L430 430 Q400 415 370 430 L330 480 Q240 500 200 450 Z"/><path fill="none" d="M190 360 L130 330 M610 360 L670 330"/></g>`,
  bucket: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M260 290 L540 290 L515 620 L285 620 Z"/><ellipse cx="400" cy="290" rx="140" ry="30" fill="#fff"/><path fill="none" d="M270 300 Q400 140 530 300"/><rect x="300" y="400" width="200" height="110" rx="8" fill="#fff"/></g>`,
  tape: `<g stroke="${BLUE}" stroke-width="10"><circle cx="400" cy="420" r="190" ${FILL}/><circle cx="400" cy="420" r="90" fill="#fff"/><path fill="none" d="M560 520 L660 600"/></g>`,
  bag: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><rect x="250" y="200" width="300" height="420" rx="10" ${FILL}/><path fill="none" d="M250 250 L550 250 M250 270 L550 270"/><rect x="310" y="380" width="180" height="120" rx="6" fill="#fff"/></g>`,
  tray: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M180 400 L400 480 L620 400 L620 470 L400 560 L180 470 Z"/><path fill="#EEF4FB" d="M180 400 L400 320 L620 400 L400 480 Z"/></g>`,
  band: `<g stroke="${BLUE}" stroke-width="10"><ellipse cx="320" cy="360" rx="110" ry="80" ${FILL}/><ellipse cx="320" cy="360" rx="70" ry="45" fill="#fff"/><path fill="none" d="M410 380 Q440 420 460 400 Q480 380 500 420 Q520 460 540 430 Q560 400 580 450 Q600 500 620 600"/></g>`,
  mask: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M240 320 Q400 280 560 320 L560 480 Q400 560 240 480 Z"/><path fill="none" d="M240 370 L560 370 M240 420 L560 420 M240 340 Q170 330 170 400 Q170 470 240 450 M560 340 Q630 330 630 400 Q630 470 560 450"/></g>`,
  cap: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M200 470 Q200 250 400 230 Q600 250 600 470 Q400 520 200 470 Z"/><path fill="none" d="M260 450 Q300 330 320 300 M340 470 Q360 330 370 260 M430 470 Q440 330 430 260 M520 455 Q500 330 480 300"/></g>`,
  boot: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M300 180 L460 180 L460 500 L600 540 Q630 560 620 610 L300 610 Z"/><path fill="none" d="M300 600 L620 600 M330 220 L330 520"/></g>`,
  notebook: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><rect x="260" y="200" width="300" height="400" rx="10" ${FILL}/><path fill="none" d="M320 300 L510 300 M320 350 L510 350 M320 400 L510 400 M320 450 L470 450"/><path fill="none" d="M240 240 L280 240 M240 300 L280 300 M240 360 L280 360 M240 420 L280 420 M240 480 L280 480 M240 540 L280 540"/></g>`,
  belt: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M180 360 Q400 300 620 360 L620 500 Q400 440 180 500 Z"/><path fill="none" d="M300 330 L300 470 M400 315 L400 455 M500 330 L500 470 M260 340 L200 180 M540 340 L600 180"/></g>`,
  plugs: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><rect x="230" y="300" width="90" height="160" rx="40" ${FILL} transform="rotate(-20 275 380)"/><rect x="480" y="300" width="90" height="160" rx="40" ${FILL} transform="rotate(20 525 380)"/><path fill="none" d="M300 460 Q400 640 500 460"/></g>`,
  bottle: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M300 360 L500 360 L500 620 L300 620 Z"/><rect x="330" y="300" width="140" height="60" fill="#fff"/><path fill="#fff" d="M370 300 L370 230 L430 230 L430 300"/><path fill="none" d="M330 230 L470 230"/></g>`,
  rag: `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path ${FILL} d="M200 560 Q220 400 330 380 Q360 290 460 320 Q590 330 600 460 Q620 560 560 600 L240 600 Q190 590 200 560 Z"/><path fill="none" d="M300 470 Q360 430 420 470 M430 400 Q480 380 520 420"/></g>`,
};

const byCategory = {
  "antiestaticos-esd": "gown",
  "cuarto-limpio": "coverall",
  "desechables-higienicos": "gown",
  "equipo-de-seguridad": "glasses",
  "ferreteria-y-construccion": "bucket",
  "guantes-y-dedales": "glove",
  herramientas: "brush",
  "hisopos-y-aplicadores": "swab",
  "division-salud": "gown",
  "tapetes-adhesivos": "mat",
  "telas-especiales": "fabric",
  "wipes-y-trapos": "wipes",
};
const bySlug = [
  [/bolsa/, "bag"], [/charola/, "tray"], [/pulsera/, "band"], [/cubrebocas/, "mask"], [/cofia|capucha/, "cap"],
  [/botas|cubrecalzado/, "boot"], [/libreta/, "notebook"], [/faja/, "belt"], [/tapones/, "plugs"], [/cinta/, "tape"],
  [/despachador/, "bottle"], [/sabana|aislante/, "fabric"], [/trapo/, "rag"], [/dedal/, "cot"], [/marco/, "tray"],
];
const shapeFor = (it) => bySlug.find(([re]) => re.test(it.slug))?.[1] ?? byCategory[it.category] ?? "wipes";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max = 34) {
  const words = text.split(" ");
  const lines = [""];
  for (const w of words) {
    if ((lines.at(-1) + " " + w).trim().length > max) lines.push(w);
    else lines[lines.length - 1] = (lines.at(-1) + " " + w).trim();
  }
  return lines.slice(0, 2);
}

function svg(it, view) {
  const shape = shapes[shapeFor(it)];
  const label = ["Vista principal", "Detalle", "Presentación"][view - 1];
  let art = shape;
  if (view === 2) art = `<g transform="translate(400 400) scale(1.45) translate(-400 -420)">${shape}</g>`;
  if (view === 3)
    art = `<g stroke="${BLUE}" stroke-width="10" stroke-linejoin="round"><path fill="#EEF4FB" d="M200 330 L400 260 L600 330 L400 400 Z"/><path fill="#D9E6F6" d="M200 330 L400 400 L400 640 L200 570 Z"/><path fill="#C6D9F0" d="M600 330 L400 400 L400 640 L600 570 Z"/></g><g transform="translate(300 470) scale(0.22) translate(-400 -420)">${shape}</g><text x="500" y="500" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="${BLUE}">${esc(it.sku)}</text>`;
  const nameLines = wrap(it.name);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="${esc(it.name)}, imagen ilustrativa">
<defs><radialGradient id="g" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EEF2F7"/></radialGradient></defs>
<rect width="800" height="800" fill="url(#g)"/>
<ellipse cx="400" cy="660" rx="230" ry="18" fill="#0F1B2D" opacity="0.06"/>
${art}
<g font-family="Arial, Helvetica, sans-serif">
<text x="40" y="58" font-size="20" font-weight="700" fill="#64748B" letter-spacing="2">${label.toUpperCase()}</text>
<text x="760" y="58" font-size="18" fill="#94A3B8" text-anchor="end">Imagen ilustrativa · Foto pendiente</text>
${nameLines.map((l, i) => `<text x="400" y="${725 + i * 30}" font-size="24" font-weight="600" fill="#334155" text-anchor="middle">${esc(l)}</text>`).join("\n")}
</g>
</svg>`;
}

let count = 0;
for (const it of items) {
  const dir = join(root, "public/products", it.slug);
  mkdirSync(dir, { recursive: true });
  for (const v of [1, 2, 3]) {
    const f = join(dir, `${v}.svg`);
    // No sobrescribe archivos que ya existan con contenido real (por si alguien reemplazó uno a mano).
    if (existsSync(f) && !readFileSync(f, "utf8").includes("Foto pendiente")) continue;
    writeFileSync(f, svg(it, v));
    count++;
  }
}
console.log(`Imágenes placeholder: ${count} archivos para ${items.length} productos.`);

// ---------------------------------------------------------------------------
// PDFs de ejemplo (PDF 1.4 mínimo, texto plano en Helvetica)
// ---------------------------------------------------------------------------
function pdf(title, lines) {
  const toLatin1 = (s) => s.replace(/[\\()]/g, (c) => "\\" + c);
  const content = [
    "BT /F2 20 Tf 56 770 Td (" + toLatin1(title) + ") Tj ET",
    "0 0.302 0.635 RG 2 w 56 755 m 556 755 l S",
    ...lines.map((l, i) => `BT /F1 11 Tf 56 ${728 - i * 18} Td (${toLatin1(l)}) Tj ET`),
    "BT /F1 9 Tf 56 60 Td (ESC Representaciones, S. de R.L. MI. | El Sauz | 800 890 3276 | informacion@elsauz.com) Tj ET",
  ].join("\n");
  const stream = Buffer.from(content, "latin1");
  const objs = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>",
    null,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  ];
  const parts = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "latin1")];
  const offsets = [];
  let pos = parts[0].length;
  objs.forEach((o, i) => {
    let buf;
    if (o === null) {
      buf = Buffer.concat([
        Buffer.from(`${i + 1} 0 obj\n<< /Length ${stream.length} >>\nstream\n`, "latin1"),
        stream,
        Buffer.from("\nendstream\nendobj\n", "latin1"),
      ]);
    } else buf = Buffer.from(`${i + 1} 0 obj\n${o}\nendobj\n`, "latin1");
    offsets.push(pos);
    pos += buf.length;
    parts.push(buf);
  });
  const xref =
    `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` +
    offsets.map((o) => String(o).padStart(10, "0") + " 00000 n \n").join("") +
    `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF\n`;
  parts.push(Buffer.from(xref, "latin1"));
  return Buffer.concat(parts);
}

const docs = join(root, "public/docs");
mkdirSync(docs, { recursive: true });
writeFileSync(
  join(docs, "ficha-tecnica-ejemplo.pdf"),
  pdf("Ficha técnica (EJEMPLO)", [
    "Documento de ejemplo para el prototipo del sitio web.",
    "PENDIENTE: reemplazar por la ficha técnica real del fabricante.",
    "",
    "Contenido típico de una ficha técnica:",
    "  - Descripción y aplicaciones del producto",
    "  - Material y construcción",
    "  - Dimensiones, peso y presentaciones",
    "  - Clase de cuarto limpio compatible (ISO 14644-1)",
    "  - Resistencia superficial (productos ESD)",
    "  - Normas aplicables y compatibilidad química",
    "  - Condiciones de almacenamiento y vida útil",
  ]),
);
writeFileSync(
  join(docs, "hoja-de-seguridad-ejemplo.pdf"),
  pdf("Hoja de datos de seguridad (EJEMPLO)", [
    "Documento de ejemplo para el prototipo del sitio web.",
    "PENDIENTE: reemplazar por la HDS real del fabricante (formato NOM-018-STPS / SGA).",
    "",
    "Secciones de una hoja de datos de seguridad:",
    "  1. Identificación   2. Identificación de peligros   3. Composición",
    "  4. Primeros auxilios   5. Combate de incendios   6. Derrames",
    "  7. Manejo y almacenamiento   8. Controles de exposición / EPP",
    "  9. Propiedades físicas y químicas   10. Estabilidad y reactividad",
    "  11 a 16. Información toxicológica, ecológica, disposición,",
    "  transporte, regulatoria y otra información",
  ]),
);
writeFileSync(
  join(docs, "catalogo-general-ejemplo.pdf"),
  pdf("Catálogo general El Sauz (EJEMPLO)", [
    "Documento de ejemplo para el prototipo del sitio web.",
    "PENDIENTE: reemplazar por el catálogo general actualizado.",
    "",
    "Categorías:",
    "  Artículos Antiestáticos (ESD) | Cuarto Limpio | Desechables Higiénicos",
    "  Equipo de Seguridad | Ferretería y Construcción | Guantes y Dedales",
    "  Herramientas | Hisopos y Aplicadores | División Salud",
    "  Tapetes Adhesivos | Telas Especiales | Wipes y Trapos",
    "",
    "Heroico Colegio Militar No. 5910-C, Col. Nombre de Dios, C.P. 31105, Chihuahua, Chih.",
  ]),
);
console.log("PDFs de ejemplo generados en public/docs.");
