import type { FaustTemplateProps } from "@faustwp/core";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";
import { type YoastSeo } from "@/lib/seo";

type SingleData = {
  post: {
    title: string;
    content?: string | null;
    uri: string;
    slug?: string;
    excerpt?: string | null;
    seo?: YoastSeo | null;
    featuredImage?: {
      node?: {
        sourceUrl?: string | null;
        altText?: string | null;
      } | null;
    } | null;
  } | null;
};

type SingleTemplateProps = FaustTemplateProps<SingleData>;

export default function SingleTemplate({ data }: SingleTemplateProps) {
  const post = data?.post;
  const title = post?.title ?? "";
  const content = post?.content ?? "";
  const slug = post?.slug;
  const frontendPath = slug ? `/blog/${slug}` : post?.uri;

  return (
    <>
      <Seo
        title={title}
        description={post?.excerpt ?? undefined}
        canonical={frontendPath ?? undefined}
        seo={post?.seo}
        ogImage={post?.featuredImage?.node?.sourceUrl}
        ogType="article"
        slug={slug}
      />
      <article className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <h1 className="mb-8 max-w-2xl text-4xl font-semibold tracking-tight text-[#121926] md:text-5xl">
          {title}
        </h1>
        <RichText html={content} variant="blog" />
      </article>
    </>
  );
}
