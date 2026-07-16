export type PortfolioImage = {
  sourceUrl: string;
  altText?: string | null;
};

export type PortfolioHighlight = {
  title: string;
  description: string;
};

export type PortfolioPageFields = {
  heroTitle?: string | null;
  heroImage?: PortfolioImage | null;
  overview?: string | null;
  highlights?: PortfolioHighlight[] | null;
  gallery?: PortfolioImage[] | null;
};

export type PortfolioItem = {
  id: string;
  title: string;
  uri: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: {
    node?: PortfolioImage | null;
  } | null;
  portfolioPage?: PortfolioPageFields | null;
};

export type ResolvedPortfolioPage = {
  heroTitle: string;
  heroImage: PortfolioImage | null;
  overview: string;
  highlights: PortfolioHighlight[];
  gallery: PortfolioImage[];
};

/** Convert WP HTML (excerpt etc.) to plain text while keeping paragraph breaks. */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*\/\s*p\s*>/gi, "\n\n")
    .replace(/<\s*\/\s*(div|h[1-6]|li|blockquote|tr)\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function resolveOverview(
  overview: string | null | undefined,
  excerpt: string | null | undefined,
): string {
  const fromPlugin = overview?.trim();
  if (fromPlugin) return overview!.replace(/\r\n/g, "\n");

  if (!excerpt?.trim()) return "";

  const plain = htmlToPlainText(excerpt);
  return plain.replace(/\r\n/g, "\n");
}

export function resolvePortfolioPage(item: PortfolioItem): ResolvedPortfolioPage {
  const page = item.portfolioPage;

  return {
    heroTitle: page?.heroTitle?.trim() || item.title,
    heroImage: page?.heroImage ?? item.featuredImage?.node ?? null,
    overview: resolveOverview(page?.overview, item.excerpt),
    highlights:
      page?.highlights?.filter(
        (highlight) => highlight.title?.trim() || highlight.description?.trim(),
      ) ?? [],
    gallery: page?.gallery?.filter((image) => image.sourceUrl) ?? [],
  };
}
