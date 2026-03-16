import type { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_PAGE_BY_URI, GET_POSTS_LIST } from "@/lib/queries";
import { normalizePageType } from "@/lib/normalizePageType";

type PostNode = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  date?: string | null;
};

type BlogIndexProps = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
  pageType: string | null;
  posts: PostNode[];
  hasNextPage: boolean;
  endCursor: string | null;
};

export default function BlogIndex({
  page,
  pageType,
  posts,
}: BlogIndexProps) {
  const title = page?.title || "Blog";

  return (
    <Layout>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">
            {page?.title ?? "Blog"}
          </h1>
          <RichText html={page?.content ?? null} />
        </div>
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border-b border-neutral-800 pb-6 last:border-none"
            >
              <h2 className="mb-2 text-2xl font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.date && (
                <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              )}
              {post.excerpt && (
                <div className="text-sm text-neutral-300">
                  <RichText html={post.excerpt} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  const [pageData, postsData] = await Promise.all([
    wpFetch<{ page: BlogIndexProps["page"] }>(GET_PAGE_BY_URI, {
      uri: "/blog/",
    }),
    wpFetch<{
      posts: {
        nodes: PostNode[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    }>(GET_POSTS_LIST),
  ]);

  const page = pageData.page ?? null;
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

