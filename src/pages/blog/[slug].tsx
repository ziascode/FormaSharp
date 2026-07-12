import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import BlogTableOfContents from "@/components/BlogTableOfContents";
import { wpFetch } from "@/lib/wpFetch";
import { GET_POST_BY_SLUG, GET_POST_SLUGS } from "@/lib/queries";
import { type YoastSeo } from "@/lib/seo";
import {
  extractTableOfContents,
  type TocItem,
} from "@/lib/tableOfContents";

type Post = {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  uri: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
      altText?: string | null;
    } | null;
  } | null;
  seo?: YoastSeo | null;
};

type PostPageProps = {
  post: Post | null;
  contentHtml: string;
  toc: TocItem[];
};

export default function PostDetail({ post, contentHtml, toc }: PostPageProps) {
  if (!post) return null;

  const image = post.featuredImage?.node;
  const frontendPath = `/blog/${post.slug}`;
  const hasToc = toc.length > 0;

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt ?? undefined}
        canonical={frontendPath}
        seo={post.seo}
        ogImage={image?.sourceUrl}
        ogType="article"
        slug={post.slug}
      />
      <article>
        <header className="relative flex min-h-[55vh] items-end overflow-hidden bg-[#121926] md:min-h-[60vh]">
          {image?.sourceUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image.sourceUrl}
              alt=""
              className="absolute inset-0 z-0 h-full w-full object-cover object-center"
              aria-hidden
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom_right,#121926_0%,#01628a_100%)] opacity-60"
            aria-hidden
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-12 pt-28 md:px-8 md:pb-16 md:pt-32">
            <p className="mb-4">
              <Link
                href="/blog"
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                ← Blog
              </Link>
            </p>

            {post.date && (
              <p className="!mb-3 !text-xs !font-medium !uppercase !tracking-[0.12em] !text-[#ff6726]">
                {new Date(post.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            <h1 className="!mb-0 max-w-4xl !text-4xl !font-semibold !leading-tight tracking-tight !text-white md:!text-5xl lg:!text-6xl">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16">
          <div
            className={
              hasToc
                ? "lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-14"
                : undefined
            }
          >
            {hasToc && (
              <aside className="mb-10 hidden lg:mb-0 lg:block">
                <BlogTableOfContents items={toc} />
              </aside>
            )}
            <div>
              <RichText html={contentHtml} variant="blog" />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await wpFetch<{ posts: { nodes: { slug: string }[] } }>(
    GET_POST_SLUGS,
  );

  const paths =
    data.posts?.nodes?.map((post) => ({
      params: { slug: post.slug },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  const data = await wpFetch<{ post: Post | null }>(GET_POST_BY_SLUG, {
    slug,
  });

  if (!data.post) {
    return { notFound: true };
  }

  const { html, toc } = extractTableOfContents(data.post.content);

  return {
    props: {
      post: data.post,
      contentHtml: html,
      toc,
    },
    revalidate: 60,
  };
};
