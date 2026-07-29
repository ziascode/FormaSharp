import { getSiteUrl } from "@/lib/seo";

export type JsonLd = Record<string, unknown>;

/** Org logo — also used as default OG/Twitter image fallback */
export const ORG_LOGO_URL =
  "https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/logo-light2.png";

const LOGO_URL = ORG_LOGO_URL;

const AREA_SERVED = [
  { "@type": "City", name: "Toronto" },
  { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
  { "@type": "AdministrativeArea", name: "Southern Ontario" },
] as const;

function siteOrigin(): string {
  return getSiteUrl() || "https://www.formasharp.com";
}

/** Sitewide ProfessionalService / LocalBusiness entity. */
export function buildOrganizationSchema(): JsonLd {
  const site = siteOrigin();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site}/#organization`,
    name: "FormaSharp Product Design Inc.",
    alternateName: "FormaSharp",
    url: site,
    logo: LOGO_URL,
    image: LOGO_URL,
    email: "admin@formasharp.com",
    telephone: "+1-416-471-9300",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mississauga",
      addressRegion: "ON",
      postalCode: "L5B 4N3",
      addressCountry: "CA",
    },
    areaServed: [...AREA_SERVED],
    sameAs: [
      "https://www.instagram.com/formasharp",
      "https://www.linkedin.com/company/formasharp/",
    ],
    priceRange: "$$",
  };
}

export type ServiceSchemaInput = {
  name: string;
  description: string;
  /** Frontend path, e.g. `/CADServices` */
  path: string;
};

/** Service schema that references the sitewide organization @id. */
export function buildServiceSchema(input: ServiceSchemaInput): JsonLd {
  const site = siteOrigin();
  const path = input.path.startsWith("/") ? input.path : `/${input.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${site}${path}`,
    provider: {
      "@id": `${site}/#organization`,
    },
    areaServed: [...AREA_SERVED],
  };
}

/** Marketing service pages and their schema/meta defaults. */
export const SERVICE_PAGE_SEO = {
  Simulation: {
    title: "Mechanical Engineering & Simulation",
    description:
      "Thermal analysis, structural optimization, and failure investigation for manufacturers and startups in Toronto, the GTA, and Southern Ontario.",
    path: "/Simulation",
    serviceName: "Mechanical Engineering & Simulation",
  },
  ProductDesign: {
    title: "Product Design",
    description:
      "Product design and mechanical engineering from concept to production-ready designs for companies in Toronto, the GTA, and Southern Ontario.",
    path: "/ProductDesign",
    serviceName: "Product Design",
  },
  IndustrialDesign: {
    title: "Industrial Design",
    description:
      "Industrial design focused on form, usability, and manufacturability for product teams across Toronto, the GTA, and Southern Ontario.",
    path: "/IndustrialDesign",
    serviceName: "Industrial Design",
  },
  DesignForManufacturing: {
    title: "Design for Manufacturing (DFM)",
    description:
      "Design for manufacturing services that improve cost, quality, and production readiness for Toronto, GTA, and Southern Ontario manufacturers.",
    path: "/DesignForManufacturing",
    serviceName: "Design for Manufacturing (DFM)",
  },
  CADServices: {
    title: "CAD Services",
    description:
      "Precision CAD modeling, assemblies, and technical drawings for engineering and fabrication teams in Toronto, the GTA, and Southern Ontario.",
    path: "/CADServices",
    serviceName: "CAD Services",
  },
  ReverseEngineering: {
    title: "Reverse Engineering",
    description:
      "Reverse engineering and CAD reconstruction from existing parts for manufacturers across Toronto, the GTA, and Southern Ontario.",
    path: "/ReverseEngineering",
    serviceName: "Reverse Engineering",
  },
  "3dprinting": {
    title: "Prototyping & 3D Printing",
    description:
      "Rapid prototyping and 3D printing in engineering-grade materials for product development teams in Toronto, the GTA, and Southern Ontario.",
    path: "/3dprinting",
    serviceName: "Prototyping & 3D Printing",
  },
} as const;

export type ServicePageKey = keyof typeof SERVICE_PAGE_SEO;

export function serviceJsonLd(key: ServicePageKey): JsonLd {
  const page = SERVICE_PAGE_SEO[key];
  return buildServiceSchema({
    name: page.serviceName,
    description: page.description,
    path: page.path,
  });
}

export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data);
}
