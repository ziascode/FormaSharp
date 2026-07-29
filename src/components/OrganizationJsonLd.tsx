import Head from "next/head";
import {
  buildOrganizationSchema,
  serializeJsonLd,
} from "@/lib/schema";

/** Invisible sitewide ProfessionalService / LocalBusiness JSON-LD. */
export default function OrganizationJsonLd() {
  const schema = buildOrganizationSchema();

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
    </Head>
  );
}
