type RichTextProps = {
  html?: string | null;
  /** `blog` = light reading typography for WP posts; `default` for dark/marketing pages */
  variant?: "default" | "blog";
  className?: string;
};

export default function RichText({
  html,
  variant = "default",
  className = "",
}: RichTextProps) {
  if (!html) return null;

  const base =
    variant === "blog"
      ? "blog-content"
      : "rich-text-content max-w-none";

  return (
    <div
      className={[base, className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
