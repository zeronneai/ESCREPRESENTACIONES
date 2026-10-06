# El Sauz · Catálogo virtual B2B (prototipo)

Prototipo funcional del nuevo sitio de **ESC Representaciones, S. de R.L. MI.** (marca **El Sauz**): catálogo de productos con búsqueda y filtros, ficha técnica por producto, lista de cotización (RFQ), directorio de asesores y contenido institucional.

No es una tienda en línea: no hay precios ni pagos. El objetivo es que un comprador de planta encuentre el producto, vea sus especificaciones y presentaciones, arme una lista y la envíe a un asesor.

- **Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Zustand, Fuse.js, React Hook Form + Zod, Resend (opcional).
- **Seguro por diseño:** sitio estático generado en build (80 páginas). La única ruta de servidor es `/api/cotizacion`. Sin WordPress, sin plugins, sin base de datos expuesta, con cabeceras de seguridad.
- **Idioma:** español de México. Los datos ya guardan `{ es, en }` para habilitar inglés en una fase posterior.

---

## 1. Cómo correrlo

Requisitos: Node.js 20.9 o superior.

```bash
npm install
cp .env.example .env.local   # opcional, ver sección 5
npm run dev                  # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Compila para producción y genera las páginas estáticas |
| `npm start` | Sirve la compilación de producción |
| `npm run typecheck` | Revisión de tipos con TypeScript |
| `node scripts/generate-assets.mjs` | Regenera imágenes placeholder y PDFs de ejemplo |

## 2. Estructura

```
app/                      Páginas (App Router)
  page.tsx                Home
  catalogo/               Catálogo y páginas de categoría
  producto/[slug]/        Ficha de producto (+ datos estructurados schema.org)
  cotizacion/             Lista de cotización y formulario
  contacto/               Asesores, mapa y datos de contacto
  nosotros/ calidad/ industrias/ recursos/
  api/cotizacion/         Recibe la solicitud, genera folio, envía correo
components/               Componentes de interfaz
data/                     *** Contenido editable: productos, categorías, asesores, etc. ***
lib/                      Búsqueda, estado de cotización, WhatsApp, validación
public/products/[slug]/   Imágenes de producto
public/docs/              Fichas técnicas, hojas de seguridad, catálogo PDF
scripts/                  Utilidades (generación de placeholders)
```

## 3. Agregar o editar productos

Todos los productos están en `data/products.ts`. Cada producto sigue el tipo `Product` de `data/types.ts`:

```ts
p({
  slug: "guante-nitrilo-sin-polvo",          // URL: /producto/guante-nitrilo-sin-polvo
  sku: "ESC-GD-0601",                        // código base
  name: t("Guante de nitrilo sin polvo 4 mil", "Powder-free nitrile glove 4 mil"),
  category: "guantes-y-dedales",             // slug de data/categories.ts
  subcategory: "Guantes de nitrilo",
  brand: "Marca A",                          // o "PENDIENTE"
  material: "Nitrilo",                       // aparece en el filtro Material
  industries: ["electronica", "automotriz"], // slugs de data/industries.ts
  applications: ["Protección personal"],     // aparecen en el filtro Aplicación
  shortDescription: t("..."),
  description: t("..."),
  specs: [s("Material", "Nitrilo (NBR)"), s("Espesor", "4 mil")],
  esdSafe: false,
  cleanroomClass: "ISO 5",                   // ISO 5 | ISO 6 | ISO 7 | ISO 8
  disposable: true,
  units: ["paquete", "caja"],                // unidades en que se puede cotizar
  variants: [                                // cada combinación con su propio código
    { sku: "ESC-GD-0601-AZ-M", size: "M", color: "Azul", packQty: 100, packsPerCase: 10 },
  ],
  related: ["guante-latex-cuarto-limpio"],   // productos relacionados
  quotedWith: ["wipe-celulosa-poliester"],   // "también se cotizan juntos"
  sdsUrl: "/docs/mi-hoja-de-seguridad.pdf",  // opcional
})
```

Notas:

- `t(es, en?)` crea un texto bilingüe. Si se omite el inglés, se usa el español.
- `s(etiqueta, valor)` crea una fila de la tabla de especificaciones.
- Si no se indica `images`, se usan `/products/[slug]/1.svg`, `2.svg` y `3.svg`.
- Si no se indica `datasheetUrl`, se usa la ficha de ejemplo. Use `datasheetUrl: null` para ocultar el botón.
- Al quitar el campo `placeholder` (lo agrega `p()` automáticamente), deja de mostrarse el aviso "Producto de ejemplo".
- Categorías, industrias, asesores y artículos se editan de la misma forma en `data/`.

El modelo de datos está pensado para migrar después a Supabase o a un CMS headless (Sanity): cada tipo de `data/types.ts` corresponde a una tabla o a un tipo de documento.

## 4. Cambiar imágenes y documentos

**Fotos de producto.** Cada producto tiene su carpeta `public/products/[slug]/`. Para reemplazar los placeholders:

1. Copie las fotos a la carpeta del producto, por ejemplo `1.jpg`, `2.jpg`, `3.jpg` (recomendado: 1200 × 1200 px, fondo blanco o gris claro, producto centrado).
2. En `data/products.ts` agregue al producto: `images: ["/products/[slug]/1.jpg", "/products/[slug]/2.jpg"]`.

Next.js optimiza automáticamente las fotos JPG/PNG/WebP (tamaño y formato). Los SVG placeholder se sirven tal cual.

**Fichas técnicas y hojas de seguridad.** Copie los PDF a `public/docs/` y apunte `datasheetUrl` / `sdsUrl` del producto a esa ruta.

**Logo.** `public/brand/logo-esc.png` (tomado del sitio actual, baja resolución). Reemplazar por la versión vectorial en cuanto esté disponible. Los íconos del navegador están en `app/icon.png` y `app/apple-icon.png`.

## 5. Configurar Resend (correo) y WhatsApp

Variables de entorno (ver `.env.example`):

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública, para SEO y sitemap. Ej. `https://elsauz.com` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp general, formato internacional sin `+`. Por ahora `526144246200` (oficina) |
| `RESEND_API_KEY` | Clave de Resend. Si está vacía, las cotizaciones solo se registran en el log del servidor |
| `QUOTE_FROM_EMAIL` | Remitente, debe pertenecer a un dominio verificado en Resend |
| `QUOTE_TO_EMAIL` | Destinatarios de las cotizaciones, separados por coma |

**Resend, paso a paso:**

1. Cree una cuenta en [resend.com](https://resend.com) y agregue el dominio `elsauz.com` en *Domains*.
2. Agregue en el DNS del dominio los registros SPF y DKIM que indica Resend y espere la verificación.
3. Cree una API key con permiso *Sending access* y colóquela en `RESEND_API_KEY`.
4. Con eso, cada solicitud envía dos correos: uno al equipo (con el archivo adjunto y `reply-to` al cliente) y una confirmación al cliente con su folio.

**WhatsApp:** el número general se toma de `NEXT_PUBLIC_WHATSAPP_NUMBER`. Cada asesor tiene su propio número en `data/advisors.ts` (campo `whatsapp`). Hoy todos apuntan a la oficina (614 424 6200) hasta tener los números reales.

**Folio de cotización:** el prototipo genera folios `COT-AAAA-NNNN` con un contador en memoria que se reinicia con cada despliegue. En producción debe usarse una secuencia en base de datos (Fase 2).

## 6. Desplegar en Vercel

1. Suba el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) elija *Add New > Project* e importe el repositorio. Vercel detecta Next.js automáticamente.
3. En *Settings > Environment Variables* agregue las variables de la sección 5.
4. Despliegue. Cada `push` a la rama principal publica una nueva versión; cada rama genera una URL de vista previa.
5. Para usar el dominio: *Settings > Domains*, agregue `elsauz.com` y `www.elsauz.com`, y actualice el DNS como indique Vercel.

Recomendado en producción: activar el firewall de Vercel con límite de peticiones para `/api/cotizacion`.

## 7. Accesibilidad, SEO y rendimiento

- HTML semántico, navegación por teclado, foco visible, textos alternativos y contraste AA.
- Metadatos por página, `sitemap.xml`, `robots.txt`, datos estructurados `Organization`, `Product` (sin precio) y `Article`.
- Páginas estáticas, fuentes autoalojadas con `next/font`, imágenes optimizadas y carga diferida del mapa.
