import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import { GET_POST_BY_SLUG, GET_POST_SLUGS } from "@/lib/queries";

type Post = {
  id: string;
  title: string;
  content?: string | null;
  uri: string;
  excerpt?: string | null;
  date?: string | null;
};

type PostPageProps = {
  post: Post | null;
};

export default function PostDetail({ post }: PostPageProps) {
  if (!post) return null;

  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.excerpt ?? undefined}
        canonical={post.uri}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="mb-3 text-xs uppercase tracking-wide text-neutral-500">
          {post.date
            ? new Date(post.date).toLocaleDateString()
            : undefined}
        </p>
        <h1 className="mb-6 text-4xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <RichText html={post.content ?? null} />
      </article>
    </Layout>
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

  return {
    props: {
      post: data.post,
    },
    revalidate: 60,
  };
};

