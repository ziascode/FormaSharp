import Head from "next/head";
import {
  buildRobots,
  rewriteSchemaRaw,
  stripHtml,
  toAbsoluteUrl,
  type YoastSeo,
} from "@/lib/seo";

export type SeoProps = {
  title?: string;
  description?: string;
  /** Frontend path (e.g. `/blog/my-post`) or absolute URL — preferred for canonical/og:url */
  canonical?: string;
  robots?: string;
  /** Yoast SEO object from WPGraphQL */
  seo?: YoastSeo | null;
  /** Fallback OG/Twitter image (e.g. featured image) */
  ogImage?: string | null;
  ogType?: string;
  /** Post slug — used when rewriting Yoast JSON-LD paths to `/blog/[slug]` */
  slug?: string | null;
};

export default function Seo({
  title,
  description,
  canonical,
  robots,
  seo,
  ogImage,
  ogType,
  slug,
}: SeoProps) {
  const yoastTitle = seo?.title?.trim() || undefined;
  const finalTitle =
    yoastTitle || (title ? `${title} | FormaSharp` : "FormaSharp");

  const finalDescription =
    seo?.metaDesc?.trim() ||
    stripHtml(description) ||
    undefined;

  const frontendPath =
    canonical && !canonical.startsWith("http") ? canonical : undefined;

  const finalCanonical =
    toAbsoluteUrl(seo?.canonical || canonical, frontendPath) ||
    toAbsoluteUrl(canonical);

  const finalRobots = robots || buildRobots(seo);

  const ogTitle =
    seo?.opengraphTitle?.trim() || yoastTitle || finalTitle;
  const ogDescription =
    seo?.opengraphDescription?.trim() || finalDescription;
  const ogImageUrl =
    seo?.opengraphImage?.sourceUrl || ogImage || undefined;
  const finalOgType = seo?.opengraphType || ogType || "website";
  // Prefer frontend canonical over Yoast opengraphUrl (points at WordPress)
  const ogUrl =
    finalCanonical || toAbsoluteUrl(seo?.opengraphUrl, frontendPath);

  const twitterTitle =
    seo?.twitterTitle?.trim() || ogTitle;
  const twitterDescription =
    seo?.twitterDescription?.trim() || ogDescription;
  const twitterImage =
    seo?.twitterImage?.sourceUrl || ogImageUrl;

  const schemaRaw = rewriteSchemaRaw(seo?.schema?.raw, {
    slug,
    frontendPath: frontendPath?.replace(/^\//, "") || undefined,
  });

  return (
    <Head>
      <title>{finalTitle}</title>
      {finalDescription && (
        <meta name="description" content={finalDescription} />
      )}
      {finalCanonical && <link rel="canonical" href={finalCanonical} />}
      {finalRobots && <meta name="robots" content={finalRobots} />}

      <meta property="og:title" content={ogTitle} />
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content={finalOgType} />
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      <meta property="og:site_name" content="FormaSharp" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      {twitterDescription && (
        <meta name="twitter:description" content={twitterDescription} />
      )}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {schemaRaw && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaRaw }}
        />
      )}
    </Head>
  );
}
