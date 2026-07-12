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
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.replace(/\/$/, "")}${normalized.replace(/\/$/, "") || ""}`;
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

/** Static marketing routes that are not WP pages */
const STATIC_PATHS = [
  "/",
  "/blog",
  "/about",
  "/contact",
  "/request-a-quote",
  "/patent-ip",
  "/Simulation",
  "/ProductDesign",
  "/IndustrialDesign",
  "/DesignForManufacturing",
  "/CADServices",
  "/ReverseEngineering",
  "/3dprinting",
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const entries: { loc: string; lastmod?: string }[] = STATIC_PATHS.map(
    (path) => ({ loc: absolute(path === "/" ? "/" : path) }),
  );

  // Home absolute: site with no trailing path
  entries[0] = { loc: getSiteUrl() || "http://localhost:3000" };

  try {
    const data = await wpFetch<{
      posts: { nodes: SitemapNode[] };
      pages: { nodes: SitemapNode[] };
    }>(GET_SITEMAP_ENTRIES, { first: 100 });

    for (const post of data.posts?.nodes ?? []) {
      if (!post.slug) continue;
      entries.push({
        loc: absolute(`/blog/${post.slug}`),
        lastmod: formatDate(post.modified),
      });
    }

    // Skip WP pages that duplicate Next marketing routes or the WP home
    const skipUris = new Set([
      "/",
      "/blog/",
      "/blog",
      "/about/",
      "/contact/",
    ]);

    for (const page of data.pages?.nodes ?? []) {
      if (!page.uri || skipUris.has(page.uri)) continue;
      // Prefer Next blog posts over raw WP post URIs already covered
      if (page.uri.startsWith("/hello-world")) continue;
      entries.push({
        loc: absolute(page.uri),
        lastmod: formatDate(page.modified),
      });
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
