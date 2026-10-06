import type { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "antiestaticos-esd",
    name: { es: "Artículos Antiestáticos (ESD)", en: "Antistatic (ESD) Products" },
    icon: "Zap",
    tagline: "Control de descargas electrostáticas en líneas de ensamble.",
    subcategories: ["Batas ESD", "Pulseras y cordones", "Bolsas de blindaje", "Cajas y charolas", "Señalización ESD"],
    seo: [
      "Una descarga electrostática que la persona ni siquiera percibe puede dañar un componente electrónico de forma latente y provocar fallas en campo meses después. Por eso las áreas de protección ESD (EPA) necesitan un sistema completo: personal aterrizado, superficies disipativas, empaque de blindaje y señalización clara.",
      "En El Sauz suministramos batas, pulseras, cordones a tierra, bolsas de blindaje metalizadas, charolas conductivas y señalización para plantas de electrónica, automotriz y dispositivos médicos. Cada artículo indica su rango de resistencia superficial para que su equipo de calidad pueda validarlo contra su programa de control ESD.",
      "Si su planta trabaja bajo ANSI/ESD S20.20 o IEC 61340-5-1, un asesor puede ayudarle a armar un paquete por estación de trabajo y a estandarizar códigos entre varias plantas.",
    ],
  },
  {
    slug: "cuarto-limpio",
    name: { es: "Cuarto Limpio", en: "Cleanroom" },
    icon: "Sparkles",
    tagline: "Indumentaria y consumibles para ambientes controlados ISO 5 a ISO 8.",
    subcategories: ["Overoles y batas", "Cofias y capuchas", "Cubrebocas", "Cubrecalzado y botas", "Libretas y papel para cuarto limpio"],
    seo: [
      "En un cuarto limpio, la principal fuente de partículas es la persona. La indumentaria correcta, del material y la clase adecuada, es la primera barrera para proteger el producto y cumplir con los límites de partículas de su clasificación ISO 14644-1.",
      "Manejamos overoles, batas, cofias, capuchas, cubrebocas, cubrecalzado y botas en versiones desechables y reutilizables, con indicación de la clase ISO compatible de cada artículo. También surtimos papel y libretas de bajo desprendimiento para documentar dentro del área.",
      "Para plantas de dispositivos médicos, electrónica y aeroespacial, podemos coordinar entregas programadas por consumo mensual para que el almacén nunca se quede sin indumentaria.",
    ],
  },
  {
    slug: "desechables-higienicos",
    name: { es: "Desechables Higiénicos", en: "Disposable Hygiene Products" },
    icon: "Shirt",
    tagline: "Batas, cofias, cubrebocas y cubrecalzado de uso general.",
    subcategories: ["Batas desechables", "Cofias", "Cubrebocas", "Cubrecalzado", "Mangas protectoras"],
    seo: [
      "Los desechables higiénicos protegen al producto y al trabajador en áreas de proceso que no requieren un cuarto limpio clasificado: ensamble general, empaque, alimentos, almacén y visitas a planta.",
      "Ofrecemos batas de polipropileno, cofias plisadas, cubrebocas de tres capas, cubrecalzado antiderrapante y mangas protectoras, empacados en presentaciones de alto consumo para reducir el costo por pieza.",
      "Indíquenos el consumo mensual estimado por área y le proponemos la presentación más conveniente por caja.",
    ],
  },
  {
    slug: "equipo-de-seguridad",
    name: { es: "Equipo de Seguridad", en: "Safety Equipment" },
    icon: "HardHat",
    tagline: "Equipo de protección personal para planta y almacén.",
    subcategories: ["Protección visual", "Protección auditiva", "Fajas y soporte lumbar", "Chalecos", "Respiradores"],
    seo: [
      "El equipo de protección personal (EPP) es obligatorio conforme a la NOM-017-STPS vigente y es parte de cualquier auditoría de seguridad. Elegir bien reduce incidentes y también rotación de equipo por incomodidad.",
      "Suministramos lentes de seguridad con tratamiento antiempañante, tapones auditivos, fajas de soporte lumbar, chalecos de alta visibilidad y respiradores para partículas, con la norma aplicable indicada en cada ficha.",
      "Si necesita estandarizar el EPP por puesto de trabajo, un asesor puede ayudarle a armar una matriz por área y unificar códigos.",
    ],
  },
  {
    slug: "ferreteria-y-construccion",
    name: { es: "Ferretería y Construcción", en: "Hardware & Construction" },
    icon: "Hammer",
    tagline: "Mantenimiento de planta: selladores, cintas y consumibles.",
    subcategories: ["Selladores e impermeabilizantes", "Cintas industriales", "Aislantes térmicos", "Adhesivos"],
    seo: [
      "El área de mantenimiento necesita consumibles confiables y disponibles: selladores para juntas y techumbres, cintas de marcaje, aislantes térmicos para tuberías y adhesivos para reparaciones rápidas.",
      "En El Sauz consolidamos estos artículos en la misma cotización que su material de proceso, lo que simplifica las órdenes de compra y reduce el número de proveedores que su equipo administra.",
    ],
  },
  {
    slug: "guantes-y-dedales",
    name: { es: "Guantes y Dedales", en: "Gloves & Finger Cots" },
    icon: "Hand",
    tagline: "Nitrilo, látex, vinil, ESD y protección mecánica.",
    subcategories: ["Guantes de nitrilo", "Guantes de látex", "Guantes de vinil", "Guantes ESD", "Dedales"],
    seo: [
      "El guante correcto depende del proceso: el nitrilo ofrece resistencia química y no genera alergias al látex, el látex da mayor sensibilidad táctil y el vinil es la opción económica para tareas ligeras de corta duración. En cuarto limpio y ESD además importan la limpieza iónica y la resistencia superficial.",
      "Manejamos guantes de nitrilo, látex y vinil en varias tallas, guantes de palma recubierta para manejo de piezas y dedales antiestáticos de látex y nitrilo para ensamble fino.",
      "Consulte nuestra guía de diferencias entre nitrilo, látex y vinil en la sección de Recursos, o pida muestras a un asesor antes de cambiar de especificación.",
    ],
  },
  {
    slug: "herramientas",
    name: { es: "Herramientas", en: "Tools" },
    icon: "Wrench",
    tagline: "Herramienta manual y cepillos industriales.",
    subcategories: ["Cepillos industriales", "Pinzas", "Despachadores", "Herramienta ESD"],
    seo: [
      "Herramienta manual para ensamble, limpieza de piezas y mantenimiento: cepillos de nylon, latón y fibra antiestática, pinzas de precisión y despachadores de líquidos para estación de trabajo.",
      "Cada herramienta indica si es apta para áreas ESD, de modo que pueda usarla dentro de su EPA sin comprometer el programa de control.",
    ],
  },
  {
    slug: "hisopos-y-aplicadores",
    name: { es: "Hisopos y Aplicadores", en: "Swabs & Applicators" },
    icon: "Brush",
    tagline: "Hisopos de espuma, poliéster y algodón para limpieza de precisión.",
    subcategories: ["Hisopos de espuma", "Hisopos de poliéster", "Aplicadores de algodón", "Hisopos de superficie"],
    seo: [
      "Los hisopos de precisión permiten limpiar ranuras, conectores, cabezales y superficies de difícil acceso sin dejar residuos. La elección del material de punta, espuma, poliéster tejido o algodón, define la absorción, el desprendimiento de partículas y la compatibilidad con solventes.",
      "Ofrecemos hisopos para cuarto limpio, aplicadores de algodón con mango de madera o plástico y hisopos de superficie para muestreo y validación de limpieza en laboratorio.",
      "Para validar limpieza con alcohol isopropílico u otros solventes, consulte la compatibilidad química en la ficha técnica de cada producto.",
    ],
  },
  {
    slug: "division-salud",
    name: { es: "División Salud", en: "Healthcare Division" },
    icon: "HeartPulse",
    tagline: "Consumibles para clínicas, hospitales y laboratorios.",
    subcategories: ["Batas clínicas", "Campos y sábanas", "Cubrebocas clínicos", "Material de curación"],
    seo: [
      "La División Salud atiende a hospitales, clínicas, laboratorios clínicos y consultorios con desechables de uso médico: batas, campos, sábanas, cubrebocas y material de curación.",
      "Trabajamos con presentaciones para almacén hospitalario y podemos coordinar entregas programadas. Las especificaciones y registros sanitarios de cada producto se confirman con el asesor al cotizar.",
    ],
  },
  {
    slug: "tapetes-adhesivos",
    name: { es: "Tapetes Adhesivos", en: "Tacky Mats" },
    icon: "Footprints",
    tagline: "Control de contaminación en accesos a áreas limpias.",
    subcategories: ["Tapetes de hojas desprendibles", "Marcos para tapete"],
    seo: [
      "Un tapete adhesivo en el acceso retiene la mayor parte de las partículas que llegan en el calzado y las ruedas de carritos, antes de que entren al área controlada. Es una de las medidas de control de contaminación de mejor costo-beneficio.",
      "Manejamos tapetes de 30 y 60 hojas desprendibles en varias medidas y colores, con hojas numeradas para facilitar el control del cambio por turno, además de marcos reutilizables.",
    ],
  },
  {
    slug: "telas-especiales",
    name: { es: "Telas Especiales", en: "Specialty Fabrics" },
    icon: "Layers",
    tagline: "Fieltro, franela, poliéster y aislantes por metro o rollo.",
    subcategories: ["Fieltro", "Franela", "Poliéster", "Aislantes térmicos"],
    seo: [
      "Telas técnicas para procesos de pulido, protección de piezas, separadores de empaque y aislamiento térmico. Las vendemos por metro o por rollo completo, según su consumo.",
      "Manejamos fieltro de lana y sintético en varios espesores, franela de algodón, telas de poliéster para limpieza y textiles aislantes. Si su proceso requiere una medida especial, consulte disponibilidad de corte con un asesor.",
    ],
  },
  {
    slug: "wipes-y-trapos",
    name: { es: "Wipes y Trapos", en: "Wipes & Rags" },
    icon: "SprayCan",
    tagline: "Wipes para cuarto limpio, prehumedecidos y trapo industrial.",
    subcategories: ["Wipes de poliéster tejido", "Wipes de celulosa y poliéster", "Wipes prehumedecidos IPA", "Trapo industrial"],
    seo: [
      "El wipe correcto depende de la clase de su cuarto limpio y del nivel de limpieza requerido: un poliéster tejido con orillas selladas libera muy pocas partículas y es adecuado para ISO 5, mientras que una mezcla de celulosa y poliéster ofrece gran absorción a menor costo para ISO 7 y ISO 8.",
      "Ofrecemos wipes secos, prehumedecidos con alcohol isopropílico, rollos y trapo industrial para mantenimiento. Cada ficha indica la clase ISO compatible, el tipo de orilla y la capacidad de absorción.",
      "Consulte la guía \"Cómo elegir wipes para cuarto limpio según su clase ISO\" en Recursos, o pida muestras a un asesor.",
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
