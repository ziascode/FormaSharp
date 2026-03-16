import type { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import { wpFetch } from "@/lib/wpFetch";
import {
  GET_SERVICE_BY_SLUG,
  GET_SERVICE_SLUGS,
} from "@/lib/queries";

type Service = {
  id: string;
  title: string;
  content?: string | null;
  uri: string;
  excerpt?: string | null;
};

type ServicePageProps = {
  service: Service | null;
};

export default function ServiceDetail({ service }: ServicePageProps) {
  if (!service) {
    return null;
  }

  return (
    <Layout>
      <Seo
        title={service.title}
        description={service.excerpt ?? undefined}
        canonical={service.uri}
      />
      <article className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-semibold tracking-tight">
          {service.title}
        </h1>
        <RichText html={service.content ?? null} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await wpFetch<{ services: { nodes: { slug: string }[] } }>(
    GET_SERVICE_SLUGS,
  );

  const paths =
    data.services?.nodes?.map((service) => ({
      params: { slug: service.slug },
    })) ?? [];

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;

  const data = await wpFetch<{ service: Service | null }>(
    GET_SERVICE_BY_SLUG,
    { slug },
  );

  if (!data.service) {
    return { notFound: true };
  }

  return {
    props: {
      service: data.service,
    },
    revalidate: 60,
  };
};

