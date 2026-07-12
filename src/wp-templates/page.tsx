import type { FaustTemplateProps } from "@faustwp/core";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";
import { normalizePageType } from "@/lib/normalizePageType";
import { type YoastSeo } from "@/lib/seo";

type PageData = {
  page: {
    title: string;
    content?: string | null;
    uri: string;
    seo?: YoastSeo | null;
    pageSettings?: {
      pageType?: string | string[] | null;
    } | null;
  } | null;
};

type PageTemplateProps = FaustTemplateProps<PageData>;

export default function PageTemplate({ data }: PageTemplateProps) {
  const page = data?.page;
  const title = page?.title ?? "";
  const content = page?.content ?? "";
  const pageType = normalizePageType(page?.pageSettings?.pageType);

  return (
    <>
      <Seo
        title={title}
        description={
          page?.seo?.metaDesc ||
          (pageType ? `${pageType} page` : undefined)
        }
        canonical={page?.uri ?? undefined}
        seo={page?.seo}
      />
      <article className="mx-auto max-w-3xl px-6 py-24 md:py-28">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight text-[#121926]">
          {title}
        </h1>
        <RichText html={content} variant="blog" />
      </article>
    </>
  );
}
