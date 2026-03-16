type RichTextProps = {
  html?: string | null;
};

export default function RichText({ html }: RichTextProps) {
  if (!html) return null;

  return (
    <div
      className="prose prose-invert prose-neutral max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

