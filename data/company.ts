export const company = {
  legalName: "ESC Representaciones, S. de R.L. MI.",
  brand: "El Sauz",
  tagline: "Calidad, Servicio y Marcas Líderes",
  since: 1999,
  address: {
    street: "Heroico Colegio Militar No. 5910-C",
    neighborhood: "Col. Nombre de Dios",
    zip: "31105",
    city: "Chihuahua",
    state: "Chih.",
    country: "México",
  },
  tollFree: "800 890 3276",
  tollFreeHref: "tel:+528008903276",
  phone: "(614) 424 6200",
  phoneHref: "tel:+526144246200",
  email: "informacion@elsauz.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "526144246200",
  hours: "Lunes a viernes de 8:00 a 18:00 h. Sábados de 9:00 a 13:00 h. (PENDIENTE: confirmar horario)",
  mapsQuery: "Heroico Colegio Militar 5910, Nombre de Dios, 31105 Chihuahua, Chih.",
  social: {
    facebook: "#PENDIENTE-facebook",
    linkedin: "#PENDIENTE-linkedin",
    instagram: "#PENDIENTE-instagram",
  },
  // Indicadores del home. Los marcados como PENDIENTE deben confirmarse con el cliente.
  stats: {
    brands: "15+",
    brandsPending: true,
    responseTime: "24 h",
    responseTimePending: true,
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://elsauz.com",
};

export const fullAddress = `${company.address.street}, ${company.address.neighborhood}, C.P. ${company.address.zip}, ${company.address.city}, ${company.address.state}, ${company.address.country}`;

export const yearsInBusiness = () => new Date().getFullYear() - company.since;
