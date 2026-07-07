export const QUOTE_SERVICE_OPTIONS = [
  { slug: "simulation", label: "Mechanical Engineering & Simulation" },
  { slug: "product-design", label: "Product Design" },
  { slug: "industrial-design", label: "Industrial Design" },
  { slug: "dfm", label: "Design for Manufacturing (DFM)" },
  { slug: "cad", label: "CAD Services" },
  { slug: "reverse-engineering", label: "Reverse Engineering" },
  { slug: "prototyping", label: "Prototyping & 3D Printing" },
  { slug: "not-sure", label: "Not sure yet" },
] as const;

export type QuoteServiceSlug = (typeof QUOTE_SERVICE_OPTIONS)[number]["slug"];

export const PROJECT_STAGE_OPTIONS = [
  { value: "idea", label: "Early idea / concept" },
  { value: "concept", label: "Concept development" },
  { value: "cad", label: "CAD or drawings exist" },
  { value: "prototype", label: "Prototype stage" },
  { value: "production", label: "Preparing for production" },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const BUDGET_OPTIONS = [
  { value: "", label: "Prefer not to say" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
] as const;

export function quotePageUrl(service?: QuoteServiceSlug | string): string {
  if (!service) return "/request-a-quote";
  return `/request-a-quote?service=${encodeURIComponent(service)}`;
}

export function resolveQuoteService(
  value: string | string[] | undefined,
): QuoteServiceSlug {
  const raw = Array.isArray(value) ? value[0] : value;
  if (
    raw &&
    QUOTE_SERVICE_OPTIONS.some((option) => option.slug === raw)
  ) {
    return raw as QuoteServiceSlug;
  }
  return "not-sure";
}

export function quoteServiceLabel(slug: QuoteServiceSlug): string {
  return (
    QUOTE_SERVICE_OPTIONS.find((option) => option.slug === slug)?.label ??
    "Not sure yet"
  );
}
