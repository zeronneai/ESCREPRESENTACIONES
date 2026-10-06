import type { Industry } from "./types";

export const industries: Industry[] = [
  {
    slug: "electronica",
    name: "Electrónica",
    icon: "Cpu",
    summary: "Ensamble SMT, retrabajo y prueba de tarjetas con control ESD y limpieza de precisión.",
    challenges: [
      { title: "Daño latente por ESD", text: "Una descarga imperceptible puede dejar un componente dañado que falla en campo. Se necesita un sistema completo de aterrizaje del operador y empaque de blindaje." },
      { title: "Residuos de fundente", text: "Los residuos en tarjetas afectan la confiabilidad. La limpieza requiere hisopos y wipes de bajo desprendimiento compatibles con IPA." },
      { title: "Estandarización entre plantas", text: "Varias plantas con códigos distintos para el mismo consumible complican las auditorías y el inventario." },
    ],
    recommended: ["bata-esd-poliester-fibra-carbono", "pulsera-antiestatica-ajustable", "dedal-antiestatico-latex", "bolsa-blindaje-esd-metalizada", "hisopo-espuma-cuarto-limpio", "cepillo-esd-fibra-conductiva", "guante-palma-pu-esd", "despachador-solventes-esd"],
  },
  {
    slug: "automotriz",
    name: "Automotriz",
    icon: "Car",
    summary: "Ensamble de arneses, electrónica automotriz, pintura y mantenimiento de planta.",
    challenges: [
      { title: "Alto consumo, costo por pieza", text: "Guantes, trapo y desechables se consumen por miles al mes. La presentación por caja y la entrega programada impactan el costo total." },
      { title: "Protección de superficies", text: "Piezas pintadas y cromadas requieren fieltros y franelas que no rayen durante el manejo y el transporte en racks." },
      { title: "EPP por puesto", text: "Cada estación tiene requisitos distintos de protección visual, auditiva y lumbar conforme a la NOM-017-STPS vigente." },
    ],
    recommended: ["guante-nitrilo-sin-polvo", "fieltro-industrial", "trapo-industrial-algodon", "lentes-seguridad-antiempanantes", "faja-soporte-lumbar", "cinta-marcaje-piso", "guante-palma-pu-esd", "cepillo-industrial-nylon"],
  },
  {
    slug: "dispositivos-medicos",
    name: "Dispositivos Médicos",
    icon: "Stethoscope",
    summary: "Manufactura en cuarto limpio con requisitos estrictos de partículas y trazabilidad.",
    challenges: [
      { title: "Límites de partículas", text: "La indumentaria y los consumibles deben ser compatibles con la clase ISO del cuarto limpio para no comprometer la clasificación." },
      { title: "Trazabilidad por lote", text: "Las auditorías requieren identificar el lote de cada consumible que estuvo en contacto con el producto o el área." },
      { title: "Validación de limpieza", text: "Los procedimientos de limpieza se validan con muestreo de superficies, lo que exige hisopos y wipes con bajo residuo." },
    ],
    recommended: ["overol-cuarto-limpio-reutilizable", "cubrebocas-cuarto-limpio", "guante-latex-cuarto-limpio", "wipe-poliester-sellado-laser", "tapete-adhesivo-30-hojas", "hisopo-superficie-muestreo", "botas-cuarto-limpio", "libreta-cuarto-limpio"],
  },
  {
    slug: "aeroespacial",
    name: "Aeroespacial",
    icon: "Plane",
    summary: "Ensamble de arneses, componentes y electrónica con requisitos de limpieza y FOD.",
    challenges: [
      { title: "Control de FOD", text: "Cualquier objeto o partícula extraña puede generar un rechazo. Los consumibles de bajo desprendimiento ayudan a controlarlo." },
      { title: "Documentación", text: "Los clientes del sector piden certificados y fichas técnicas de cada consumible usado en proceso." },
      { title: "Electrónica sensible", text: "La aviónica requiere el mismo control ESD que la electrónica de consumo, con mayor exigencia de registro." },
    ],
    recommended: ["wipe-poliester-sellado-laser", "hisopo-poliester-tejido", "bata-esd-poliester-fibra-carbono", "dedal-antiestatico-latex", "fieltro-industrial", "lentes-seguridad-antiempanantes", "tela-poliester-limpieza"],
  },
  {
    slug: "laboratorios",
    name: "Laboratorios y Salud",
    icon: "FlaskConical",
    summary: "Laboratorios de calidad, clínicos y de investigación, enfermería de planta y clínicas.",
    challenges: [
      { title: "Contaminación cruzada", text: "Guantes, batas y cubrebocas correctos protegen tanto la muestra como al analista." },
      { title: "Muestreo confiable", text: "Hisopos estériles y wipes de bajo residuo son clave para resultados repetibles." },
      { title: "Abasto continuo", text: "Un faltante de consumibles detiene el laboratorio. Las entregas programadas evitan paros." },
    ],
    recommended: ["guante-nitrilo-sin-polvo", "hisopo-superficie-muestreo", "bata-quirurgica-sms", "sabana-desechable-camilla", "wipe-prehumedecido-ipa", "cubrebocas-tres-capas", "aplicador-algodon-madera"],
  },
  {
    slug: "alimentos",
    name: "Alimentos y Bebidas",
    icon: "UtensilsCrossed",
    summary: "Procesamiento y empaque de alimentos con buenas prácticas de manufactura.",
    challenges: [
      { title: "Inocuidad", text: "Cofias, cubrebocas y guantes evitan que cabello y contaminantes lleguen al producto." },
      { title: "Control de accesos", text: "Tapetes adhesivos y cubrecalzado reducen la contaminación que entra a las áreas de proceso." },
      { title: "Mantenimiento sanitario", text: "Los consumibles de mantenimiento deben convivir con las reglas de inocuidad de la planta." },
    ],
    recommended: ["cofia-plisada", "cubrebocas-tres-capas", "guante-vinil-uso-general", "bata-desechable-polipropileno", "cubrecalzado-antiderrapante", "tapete-adhesivo-30-hojas", "hisopo-superficie-muestreo"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
export const industryName = (slug: string) => getIndustry(slug)?.name ?? slug;
