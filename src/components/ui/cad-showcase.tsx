import {
  IconClock,
  IconDimensions,
  IconFolder,
  IconPlugConnected,
} from "@tabler/icons-react";
import { ServiceHelpShowcase } from "@/components/ui/service-help-showcase";
import { quotePageUrl } from "@/lib/quoteForm";

export function CadShowcase() {
  return (
    <ServiceHelpShowcase
      heading={
        <>
          CAD deliverables built for{" "}
          <span className="text-[#ff6726]">practical use</span>
        </>
      }
      paragraphs={[
        "Well-developed CAD files should do more than look accurate. They should help your team move forward efficiently.",
        "FormaSharp combines engineering knowledge with disciplined documentation practices to create design files that are organized, dependable, and easy to use.",
      ]}
      ctaLabel="Start your CAD project ↗"
      ctaHref={quotePageUrl("cad")}
      cards={[
        {
          title: "Drawings your manufacturer can build from",
          question: "Need documentation your supplier can actually use?",
          description:
            "Our engineering background supports careful attention to dimensions, tolerances, and assembly relationships. Every deliverable is checked against how the part will actually be made, not just how it looks on screen.",
          icon: <IconDimensions className="size-14" stroke={1.25} />,
        },
        {
          title: "Files your team can find and revise quickly",
          question: "Tired of disorganized CAD packages and unclear revisions?",
          description:
            "Clear file structures and consistent naming conventions improve collaboration and revision control. You receive organized CAD packages that are easy to hand off, review, and update as the project evolves.",
          icon: <IconFolder className="size-14" stroke={1.25} />,
        },
        {
          title: "Fast turnarounds when specs change",
          question: "Need updates without slowing the project down?",
          description:
            "We adapt to your preferred formats, standards, and project timelines. When requirements shift mid-project, we respond quickly so documentation stays aligned with the latest design.",
          icon: <IconClock className="size-14" stroke={1.25} />,
        },
        {
          title: "CAD that connects to prototyping and DFM",
          question: "Want files that stay useful beyond the CAD stage?",
          description:
            "CAD services connect naturally with our design, simulation, prototyping, and manufacturing preparation capabilities. Your files stay useful across the full development path, from first concept through production preparation.",
          icon: <IconPlugConnected className="size-14" stroke={1.25} />,
        },
      ]}
    />
  );
}
