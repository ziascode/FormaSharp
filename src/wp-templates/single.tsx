import { WordPressTemplateProps } from "@faustwp/core";
import Layout from "@/components/Layout";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";

type SingleTemplateProps = WordPressTemplateProps & {
  data: {
    post: {
      title: string;
      content?: string | null;
      uri: string;
      excerpt?: string | null;
    } | null;
  };
};

export default function SingleTemplate({ data }: SingleTemplateProps) {
  const post = data?.post;
  const title = post?.title ?? "";
  const content = post?.content ?? "";

  return (
    <Layout>
      <Seo
        title={title}
        description={post?.excerpt ?? undefined}
        canonical={post?.uri ?? undefined}
      />
      <article className="mx-auto max-w-3xl py-16">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight">{title}</h1>
        <RichText html={content} />
      </article>
    </Layout>
  );
}

