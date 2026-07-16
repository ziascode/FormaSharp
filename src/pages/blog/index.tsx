import type { GetStaticProps } from "next";
import Link from "next/link";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI, GET_POSTS_LIST } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";
import { type YoastSeo } from "@/lib/seo";
import { section } from "@/lib/sectionSpacing";

type FeaturedImage = {
  node?: {
    sourceUrl?: string | null;
    altText?: string | null;
  } | null;
};

type PostNode = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  date?: string | null;
  featuredImage?: FeaturedImage | null;
  seo?: YoastSeo | null;
};

type BlogIndexProps = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    seo?: YoastSeo | null;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
  pageType: string | null;
  posts: PostNode[];
  hasNextPage: boolean;
  endCursor: string | null;
};

export default function BlogIndex({ page, pageType, posts }: BlogIndexProps) {
  const title = page?.title || "Blog";

  return (
    <>
      <Seo
        title={title}
        description={
          page?.seo?.metaDesc ||
          (pageType ? `${pageType} page` : "FormaSharp engineering blog")
        }
        canonical="/blog"
        seo={page?.seo}
      />

      {/* HERO — matches About page treatment */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-[#0a0f1e] md:min-h-[55vh]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 75% at 88% 0%, rgba(37,99,235,0.40), transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center md:py-28">
          <h1 className="!mb-4 !text-5xl !font-semibold !leading-none !tracking-tight !text-white md:!text-6xl lg:!text-7xl">
            {page?.title ?? "Blog"}
          </h1>
          {page?.content ? (
            <div className="max-w-2xl [&_.blog-content]:!text-base [&_.blog-content]:!text-white/75 [&_.blog-content_p]:!mb-0 [&_.blog-content_p]:!text-white/75">
              <RichText html={page.content} variant="blog" />
            </div>
          ) : (
            <p className="!mb-0 max-w-2xl !text-base !leading-relaxed !text-white/75 md:!text-lg">
              Engineering insights, design process, and product development
              notes from the FormaSharp team.
            </p>
          )}
        </div>
      </section>

      <section className={`w-full bg-white ${section.padding}`}>
        <div className={section.container}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => {
              const image = post.featuredImage?.node;

              return (
                <article key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="overflow-hidden bg-neutral-100">
                      {image?.sourceUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image.sourceUrl}
                          alt={image.altText || post.title}
                          className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#121926] to-[#01628a]" />
                      )}
                    </div>
                    <h2
                      className="!mb-3 !mt-5 !text-2xl !font-bold !leading-tight !text-[#121926] transition-colors group-hover:!text-[#01628a]"
                      style={{ fontFamily: "'Clash Grotesk', sans-serif" }}
                    >
                      {post.title}
                    </h2>
                    <span className="text-base !text-[#121926] transition-colors group-hover:!text-[#ff6726]">
                      Learn More →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>

          {posts.length === 0 && (
            <p className="text-[#4c5564]">No posts published yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  let page: BlogIndexProps["page"] = null;

  try {
    const pageData = await wpFetch<{ page: BlogIndexProps["page"] }>(
      GET_PAGE_BY_URI,
      { uri: "/blog/" },
    );
    page = pageData.page ?? null;
  } catch {
    page = null;
  }

  const postsData = await wpFetch<{
    posts: {
      nodes: PostNode[];
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
    };
  }>(GET_POSTS_LIST, { first: 20 });

  const pageType = normalizePageType(page?.pageSettings?.pageType);

  return {
    props: {
      page,
      pageType,
      posts: postsData.posts?.nodes ?? [],
      hasNextPage: postsData.posts?.pageInfo?.hasNextPage ?? false,
      endCursor: postsData.posts?.pageInfo?.endCursor ?? null,
    },
    revalidate: 60,
  };
};
