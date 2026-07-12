"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/tableOfContents";

type BlogTableOfContentsProps = {
  items: TocItem[];
};

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="!mb-4 !text-[0.7rem] !font-semibold !uppercase !tracking-[0.18em] !text-[#ff6726]">
        On this page
      </p>
      <ul className="space-y-1 border-l border-black/10">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={[
                  "block border-l-2 -ml-px py-1.5 text-sm leading-snug transition-colors",
                  item.level === 3 ? "pl-5" : "pl-3",
                  isActive
                    ? "border-[#ff6726] font-medium text-[#121926]"
                    : "border-transparent text-[#4c5564] hover:text-[#01628a]",
                ].join(" ")}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
