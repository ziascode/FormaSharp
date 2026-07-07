import {
  IconMessages,
  IconScale,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";
import { ServiceHelpShowcase } from "@/components/ui/service-help-showcase";
import { quotePageUrl } from "@/lib/quoteForm";

export function IndustrialDesignShowcase() {
  return (
    <ServiceHelpShowcase
      heading={
        <>
          Design decisions backed by{" "}
          <span className="text-[#ff6726]">engineering awareness</span>
        </>
      }
      paragraphs={[
        "Many industrial design firms focus primarily on appearance. FormaSharp approaches industrial design differently by considering how products will be engineered, assembled, and developed from the beginning.",
        "This integrated perspective helps reduce conflicts between aesthetics and technical requirements later in the project.",
      ]}
      ctaLabel="Start your design project ↗"
      ctaHref={quotePageUrl("industrial-design")}
      cards={[
        {
          title: "Balanced design thinking",
          question: "Need form and function to work together?",
          description:
            "We believe successful products require more than visual styling alone. Every design decision should support usability, functionality, manufacturability, and product identity simultaneously. FormaSharp weighs aesthetics against real engineering constraints from the start, not after concepts are already locked in.",
          icon: <IconScale className="size-14" stroke={1.25} />,
        },
        {
          title: "Practical product development",
          question: "Want concepts that survive into production?",
          description:
            "Our team understands the realities of engineering and manufacturing workflows, allowing us to create concepts that remain achievable throughout development. Design directions are shaped with assembly, materials, and production in mind so they survive the move into CAD and prototyping.",
          icon: <IconSettings className="size-14" stroke={1.25} />,
        },
        {
          title: "Collaborative communication",
          question: "Looking for alignment before major commitments?",
          description:
            "We work closely with clients throughout the process, encouraging feedback and maintaining alignment between design goals and project expectations. Regular check-ins and visual updates keep stakeholders aligned before major development commitments are made.",
          icon: <IconMessages className="size-14" stroke={1.25} />,
        },
        {
          title: "Refined product experiences",
          question: "Aiming for polished without overdesign?",
          description:
            "We focus on creating products that feel intentional, polished, and thoughtfully developed, without unnecessary visual complexity. The result is design language that feels professional and market-ready, not overstyled or disconnected from how the product is used.",
          icon: <IconSparkles className="size-14" stroke={1.25} />,
        },
      ]}
    />
  );
}
