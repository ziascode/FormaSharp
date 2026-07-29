import type { GetServerSideProps } from "next";
import { wpFetch } from "@/lib/wpFetch";
import { GET_SITEMAP_ENTRIES } from "@/lib/queries";
import { getSiteUrl } from "@/lib/seo";

type SitemapNode = {
  slug?: string;
  uri?: string;
  modified?: string | null;
};

function absolute(path: string): string {
  const site = getSiteUrl() || "http://localhost:3000";
  const origin = site.replace(/\/$/, "");
  if (!path || path === "/") return origin;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized.replace(/\/$/, "")}`;
}

function formatDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  try {
    return new Date(value).toISOString();
  } catch {
    return undefined;
  }
}

function buildSitemap(
  entries: { loc: string; lastmod?: string }[],
): string {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod
        ? `\n    <lastmod>${entry.lastmod}</lastmod>`
        : "";
      return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

function normalizeUri(uri: string): string {
  if (!uri || uri === "/") return "/";
  const withSlash = uri.startsWith("/") ? uri : `/${uri}`;
  return withSlash.replace(/\/$/, "") || "/";
}

/** Static marketing routes that are not WP pages (or should not rely on WP alone) */
const STATIC_PATHS = [
  "/",
  "/blog",
  "/about",
  "/contact",
  "/request-a-quote",
  "/patent-ip",
  "/services",
  "/portfolio",
  "/Simulation",
  "/ProductDesign",
  "/IndustrialDesign",
  "/DesignForManufacturing",
  "/CADServices",
  "/ReverseEngineering",
  "/3dprinting",
];

/** WP page URIs that duplicate Next routes or should not be indexed */
const SKIP_PAGE_URIS = new Set(
  [
    ...STATIC_PATHS,
    "/home",
    "/sampleservice",
  ].map(normalizeUri),
);

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const seen = new Set<string>();
  const entries: { loc: string; lastmod?: string }[] = [];

  const push = (path: string, lastmod?: string) => {
    const loc = absolute(path);
    if (seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, lastmod });
  };

  for (const path of STATIC_PATHS) {
    push(path);
  }

  try {
    const data = await wpFetch<{
      posts: { nodes: SitemapNode[] };
      pages: { nodes: SitemapNode[] };
      portfolioItems: { nodes: SitemapNode[] };
    }>(GET_SITEMAP_ENTRIES, { first: 100 });

    for (const post of data.posts?.nodes ?? []) {
      if (!post.slug) continue;
      push(`/blog/${post.slug}`, formatDate(post.modified));
    }

    for (const item of data.portfolioItems?.nodes ?? []) {
      if (!item.slug) continue;
      push(`/portfolio/${item.slug}`, formatDate(item.modified));
    }

    for (const page of data.pages?.nodes ?? []) {
      if (!page.uri) continue;
      const uri = normalizeUri(page.uri);
      if (SKIP_PAGE_URIS.has(uri)) continue;
      // Prefer Next blog posts over raw WP post URIs already covered
      if (uri.startsWith("/hello-world")) continue;
      // Legacy WP service CPT URLs live under /services/[slug] — skip; marketing pages are canonical
      if (uri.startsWith("/services/")) continue;
      push(uri, formatDate(page.modified));
    }
  } catch {
    // Still emit static routes if WP is unreachable
  }

  const xml = buildSitemap(entries);

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
