import type { GetServerSideProps } from "next";
import { getSiteUrl } from "@/lib/seo";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const site = getSiteUrl() || "http://localhost:3000";
  const body = `User-agent: *
Allow: /

Sitemap: ${site.replace(/\/$/, "")}/sitemap.xml
`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  res.write(body);
  res.end();

  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
