import { WordPressTemplateProps } from "@faustwp/core";
import Layout from "@/components/Layout";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";
import { normalizePageType } from "@/lib/normalizePageType";

type PageTemplateProps = WordPressTemplateProps & {
  data: {
    page: {
      title: string;
      content?: string | null;
      uri: string;
      pageSettings?: {
        pageType?: string | string[] | null;
      } | null;
    } | null;
  };
};

export default function PageTemplate({ data }: PageTemplateProps) {
  const page = data?.page;
  const title = page?.title ?? "";
  const content = page?.content ?? "";
  const pageType = normalizePageType(page?.pageSettings?.pageType);

  return (
    <Layout>
      <Seo
        title={title}
        description={pageType ? `${pageType} page` : undefined}
        canonical={page?.uri ?? undefined}
      />
      <article className="mx-auto max-w-3xl py-16">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight">{title}</h1>
        <RichText html={content} />
      </article>
    </Layout>
  );
}
