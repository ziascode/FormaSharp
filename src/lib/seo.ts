export type YoastSeoImage = {
  sourceUrl?: string | null;
  altText?: string | null;
};

export type YoastSeo = {
  title?: string | null;
  metaDesc?: string | null;
  canonical?: string | null;
  metaRobotsNoindex?: string | null;
  metaRobotsNofollow?: string | null;
  opengraphTitle?: string | null;
  opengraphDescription?: string | null;
  opengraphUrl?: string | null;
  opengraphType?: string | null;
  opengraphImage?: YoastSeoImage | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: YoastSeoImage | null;
  schema?: {
    raw?: string | null;
  } | null;
};

export const SEO_FIELDS = /* GraphQL */ `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphUrl
    opengraphType
    opengraphImage {
      sourceUrl
      altText
    }
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      altText
    }
    schema {
      raw
    }
  }
`;

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
}

export function getWpUrl(): string {
  return (process.env.NEXT_PUBLIC_WORDPRESS_URL || "").replace(/\/$/, "");
}

/** Strip HTML tags and collapse whitespace for meta descriptions. */
export function stripHtml(html?: string | null): string | undefined {
  if (!html) return undefined;
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
  return text || undefined;
}

/**
 * Resolve a path or URL to an absolute frontend URL.
 * Rewrites WordPress origin to NEXT_PUBLIC_SITE_URL when present.
 */
export function toAbsoluteUrl(
  pathOrUrl?: string | null,
  frontendPath?: string | null,
): string | undefined {
  const site = getSiteUrl();
  const preferred =
    frontendPath && frontendPath.length > 0
      ? frontendPath.startsWith("/")
        ? frontendPath
        : `/${frontendPath}`
      : null;

  if (preferred) {
    const normalized = preferred.replace(/\/$/, "") || preferred;
    if (site) return `${site}${normalized}`;
    return normalized;
  }

  if (!pathOrUrl) {
    return undefined;
  }

  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    try {
      const parsed = new URL(pathOrUrl);
      const wp = getWpUrl();
      if (site && wp) {
        const wpOrigin = new URL(wp).origin;
        if (parsed.origin === wpOrigin) {
          const path = preferred || parsed.pathname.replace(/\/$/, "") || "/";
          return `${site}${path === "/" ? "" : path}${parsed.search}${parsed.hash}`;
        }
      }
      return pathOrUrl;
    } catch {
      return pathOrUrl;
    }
  }

  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  const normalized = path.replace(/\/$/, "") || "/";
  if (site) return `${site}${normalized === "/" ? "" : normalized}`;
  return normalized;
}

export function buildRobots(seo?: YoastSeo | null): string | undefined {
  if (!seo) return undefined;
  const index =
    seo.metaRobotsNoindex?.toLowerCase() === "noindex" ? "noindex" : "index";
  const follow =
    seo.metaRobotsNofollow?.toLowerCase() === "nofollow"
      ? "nofollow"
      : "follow";
  return `${index}, ${follow}`;
}

/**
 * Rewrite Yoast JSON-LD so URLs point at the Next frontend, not WordPress.
 */
export function rewriteSchemaRaw(
  raw?: string | null,
  options?: { slug?: string | null; frontendPath?: string | null },
): string | undefined {
  if (!raw) return undefined;

  const site = getSiteUrl();
  const wp = getWpUrl();
  let next = raw;

  if (site && wp) {
    try {
      const wpOrigin = new URL(wp).origin;
      const siteOrigin = new URL(site).origin;
      next = next.split(wpOrigin).join(siteOrigin);
    } catch {
      // leave as-is
    }
  }

  const slug = options?.slug?.replace(/^\/+|\/+$/g, "");
  const frontendPath = options?.frontendPath
    ?.replace(/\/$/, "")
    .replace(/^\//, "");

  if (site && slug && frontendPath && frontendPath !== slug) {
    // Map root WP post URLs to /blog/[slug]
    const patterns = [
      `"${site}/${slug}"`,
      `"${site}/${slug}/"`,
      `"${site}/${slug}#`,
      `"${site}/${slug}/#`,
    ];
    const replacements = [
      `"${site}/${frontendPath}"`,
      `"${site}/${frontendPath}/"`,
      `"${site}/${frontendPath}#`,
      `"${site}/${frontendPath}/#`,
    ];
    patterns.forEach((from, i) => {
      next = next.split(from).join(replacements[i]);
    });
  }

  return next;
}
