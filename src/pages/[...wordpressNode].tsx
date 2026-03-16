import type { GetStaticPaths, GetStaticProps } from "next";
import { getWordPressProps, WordPressTemplate } from "@faustwp/core";

export default function WordPressNode(props: any) {
  return <WordPressTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  return getWordPressProps({ ctx });
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

