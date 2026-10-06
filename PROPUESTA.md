# Propuesta: nuevo sitio web El Sauz

**Para:** ESC Representaciones, S. de R.L. MI.
**Asunto:** Rediseño de elsauz.com como catálogo virtual con cotización en línea

---

## Resumen ejecutivo

El sitio actual de El Sauz no refleja los 27 años de trayectoria de la empresa ni ayuda al comprador a hacer lo que viene a hacer: encontrar un producto y pedir una cotización. Además, presenta señales de estar comprometido por terceros.

Proponemos un sitio nuevo construido como **catálogo virtual B2B**. El comprador de planta encuentra el producto en segundos, revisa especificaciones y presentaciones, arma una lista con cantidades y la envía con un clic o por WhatsApp a un asesor con nombre y cara. El prototipo que acompaña esta propuesta ya funciona de punta a punta.

## Problemas del sitio actual

| Problema | Impacto en el negocio |
| --- | --- |
| Diseño obsoleto, poca jerarquía visual y casi sin imágenes de producto | El visitante no percibe a un proveedor serio de marcas internacionales |
| Sin fichas técnicas, presentaciones (tallas, piezas por caja, colores) ni hojas de seguridad | El comprador no puede validar el producto y busca otro proveedor que sí publique la información |
| No hay forma de cotizar un producto específico ni de contactar directamente a un vendedor | Se pierden solicitudes, o llegan incompletas y requieren varias llamadas |
| No comunica confianza: sin marcas, industrias, calidad ni casos | Calidad y compras corporativas no tienen evidencia para dar de alta al proveedor |
| **Contenido spam inyectado** (enlaces de casinos en otros idiomas) | Riesgo de reputación, penalización en Google y señal de un WordPress vulnerado |

## Qué resuelve el nuevo sitio

1. **Encontrar rápido.** Buscador protagonista con resultados instantáneos por nombre, código o aplicación. Mega menú con las 12 categorías. Filtros por industria, aplicación, material, compatibilidad ESD, clase de cuarto limpio (ISO 5 a ISO 8) y desechable o reutilizable.
2. **Decidir con información.** Ficha por producto con galería ampliable, tabla de especificaciones, todas las presentaciones con su propio código, ficha técnica y hoja de seguridad descargables.
3. **Cotizar sin fricción.** Lista de cotización con cantidad, unidad y notas por partida. Formulario con datos de la planta, frecuencia de compra, fecha requerida y archivo adjunto (requisición). Folio automático (COT-2026-0001) y correo de confirmación. Alternativa de enviar la lista completa por WhatsApp.
4. **Atención humana.** Directorio de asesores por zona. Al elegir su estado, el sitio sugiere al asesor correspondiente. WhatsApp, llamada y correo a un clic, además de barra de acciones fija en móvil.
5. **Generar confianza.** Trayectoria desde 1999, cobertura en 32 estados, industrias atendidas, marcas representadas y compromiso de calidad: **en proceso de certificación ISO 9001**, con evaluación de proveedores, control en recepción y trazabilidad por lote.
6. **Atraer tráfico calificado.** Texto SEO por categoría, páginas por industria, guías técnicas, datos estructurados para Google y sitemap automático.
7. **Seguro por diseño.** Sitio estático sin WordPress ni plugins. No existe un panel expuesto que atacar. Cabeceras de seguridad, validación del formulario en servidor, protección anti spam y límite de envíos.
8. **Pensado para móvil.** Muchos compradores revisan desde planta: todo el sitio está diseñado primero para celular.

## Lo que incluye el prototipo

- Home, catálogo, 12 páginas de categoría, 42 fichas de producto de ejemplo, lista de cotización con folio, asesores y contacto con mapa, nosotros, calidad, 6 páginas de industria, 3 guías técnicas, centro de descargas y aviso de privacidad.
- Estructura de datos lista para conectarse a un administrador de contenido.

Todo el contenido supuesto (marcas, nombres de asesores, cifras, política de calidad, fechas intermedias de la historia) está marcado como **PENDIENTE** para que El Sauz lo confirme.

## Fases sugeridas

### Fase 1 · Catálogo, cotización y asesores (este prototipo)
- Carga del catálogo real: productos, fotos, fichas técnicas y hojas de seguridad.
- Configuración de correo (Resend) con el dominio elsauz.com y números de WhatsApp por asesor.
- Publicación en Vercel con el dominio actual y redirecciones desde las URL antiguas para conservar el posicionamiento.
- Alta en Google Search Console y Google Business Profile.
- Retiro del WordPress comprometido.

### Fase 2 · Panel de administración
- CMS headless (Sanity) o Supabase para que el equipo cargue productos, fotos y documentos sin programar.
- Folios de cotización en base de datos y bandeja de solicitudes con estatus (nueva, en proceso, cotizada, ganada, perdida).
- Asignación automática al asesor por zona y reportes básicos (solicitudes por mes, productos más cotizados).
- Versión en inglés de las páginas principales para compradores que reportan a corporativos en EE. UU.

### Fase 3 · Portal de clientes
- Acceso con usuario por empresa: historial de cotizaciones y pedidos.
- Reorden rápido de listas frecuentes por planta.
- Precios y condiciones por cliente.
- Conexión con el ERP de El Sauz y, cuando el cliente lo requiera, con su sistema de compras (punchout / catálogo electrónico).

## Siguiente paso

Revisar juntos el prototipo, confirmar la información marcada como PENDIENTE (ver `PENDIENTES.md`) y definir el calendario de la Fase 1.
