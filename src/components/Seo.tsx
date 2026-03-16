import Head from "next/head";

type SeoProps = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
};

export default function Seo({
  title,
  description,
  canonical,
  robots,
}: SeoProps) {
  const finalTitle = title ? `${title} | FromaSharp` : "FromaSharp";

  return (
    <Head>
      <title>{finalTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {robots && <meta name="robots" content={robots} />}
      {/* TODO: Map Yoast SEO fields from WP to meta tags here. */}
    </Head>
  );
}

