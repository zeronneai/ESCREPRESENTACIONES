import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { company, fullAddress } from "@/data/company";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "El Sauz | Consumibles para cuarto limpio, ESD y protección industrial",
    template: "%s | El Sauz",
  },
  description:
    "Distribuidor de consumibles para cuarto limpio, control ESD, guantes, wipes, hisopos y equipo de protección para la industria. Desde 1999 en Chihuahua, con cobertura en los 32 estados de México.",
  applicationName: "El Sauz",
  openGraph: { type: "website", locale: "es_MX", siteName: "El Sauz", images: ["/brand/logo-esc.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#004DA2", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.brand,
  legalName: company.legalName,
  url: company.siteUrl,
  logo: `${company.siteUrl}/brand/logo-esc.png`,
  foundingDate: String(company.since),
  email: company.email,
  telephone: "+52 614 424 6200",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: "Chihuahua",
    postalCode: company.address.zip,
    addressCountry: "MX",
  },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+52 800 890 3276", contactType: "sales", areaServed: "MX", availableLanguage: ["es", "en"] },
  ],
  description: fullAddress,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${manrope.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
