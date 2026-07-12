export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);

  return base || "section";
}

/**
 * Extract h2/h3 headings from WP HTML, ensure each has an id, and return
 * updated HTML + TOC entries for sticky navigation.
 */
export function extractTableOfContents(html?: string | null): {
  html: string;
  toc: TocItem[];
} {
  if (!html) return { html: "", toc: [] };

  const usedIds = new Set<string>();
  const toc: TocItem[] = [];

  const nextHtml = html.replace(
    /<(h[23])(\s[^>]*)?>([\s\S]*?)<\/\1>/gi,
    (full, tag: string, attrs = "", inner: string) => {
      const level = Number(tag.charAt(1)) as 2 | 3;
      const text = stripTags(inner);
      if (!text) return full;

      const existingId = attrs.match(/\sid=["']([^"']+)["']/i)?.[1];
      let id = existingId || slugify(text);

      if (usedIds.has(id)) {
        let n = 2;
        while (usedIds.has(`${id}-${n}`)) n += 1;
        id = `${id}-${n}`;
      }
      usedIds.add(id);

      toc.push({ id, text, level });

      if (existingId) {
        return full;
      }

      const cleanAttrs = attrs.replace(/\s+/g, " ").trim();
      const attrStr = cleanAttrs ? ` ${cleanAttrs}` : "";
      return `<${tag}${attrStr} id="${id}">${inner}</${tag}>`;
    },
  );

  return { html: nextHtml, toc };
}
