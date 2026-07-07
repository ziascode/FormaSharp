import {
  IconBox,
  IconFileDescription,
  IconPuzzle,
  IconTopologyRing,
} from "@tabler/icons-react";
import { ServiceHelpShowcase } from "@/components/ui/service-help-showcase";
import { quotePageUrl } from "@/lib/quoteForm";

export function ReverseShowcase() {
  return (
    <ServiceHelpShowcase
      heading={
        <>
          Reverse engineering with{" "}
          <span className="text-[#ff6726]">precision</span>
        </>
      }
      paragraphs={[
        "Accurate reconstruction requires more than measuring dimensions. It also requires understanding how the part functions and how it interfaces with surrounding components.",
        "FormaSharp combines measurement, CAD development, and mechanical engineering to deliver design files that are practical and dependable.",
      ]}
      ctaLabel="Start your reverse engineering project ↗"
      ctaHref={quotePageUrl("reverse-engineering")}
      cards={[
        {
          title: "Editable CAD Models",
          question: "Need models you can modify, not just view?",
          description:
            "We create parametric models that can be modified and reused, not just visual representations.",
          icon: <IconBox className="size-14" stroke={1.25} />,
        },
        {
          title: "Functional Understanding",
          question: "Rebuilding with performance in mind?",
          description:
            "Critical interfaces, fits, and performance requirements are considered throughout reconstruction.",
          icon: <IconTopologyRing className="size-14" stroke={1.25} />,
        },
        {
          title: "Organized Deliverables",
          question: "Want files structured for long-term use?",
          description:
            "Models, drawings, and documentation are structured for long-term use.",
          icon: <IconFileDescription className="size-14" stroke={1.25} />,
        },
        {
          title: "Integrated Engineering Support",
          question: "Planning next steps after reconstruction?",
          description:
            "Recovered models can flow directly into analysis, prototyping, and manufacturing preparation.",
          icon: <IconPuzzle className="size-14" stroke={1.25} />,
        },
      ]}
    />
  );
}
