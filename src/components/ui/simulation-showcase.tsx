import {
  IconChartBar,
  IconRefresh,
  IconReportAnalytics,
  IconUsers,
} from "@tabler/icons-react";
import { ServiceHelpShowcase } from "@/components/ui/service-help-showcase";

export function SimulationShowcase() {
  return (
    <ServiceHelpShowcase
      heading={
        <>
          Simulation that supports{" "}
          <span className="text-[#ff6726]">engineering decisions</span>
        </>
      }
      paragraphs={[
        "Engineering analysis is most valuable when results are interpreted in the context of design intent and project goals. FormaSharp combines simulation expertise with product development experience to deliver findings that are technically rigorous and directly actionable.",
        "Whether you need to verify structural strength, improve cooling, or investigate a design concern, FormaSharp can provide the analysis needed to support better decisions.",
      ]}
      ctaLabel="Start your analysis project ↗"
      cards={[
        {
          title: "Decision-Focused Reporting",
          question: "Need results you can act on, not just data?",
          description:
            "We present results in a clear format that highlights key risks, performance insights, and recommended next steps.",
          icon: <IconReportAnalytics className="size-14" stroke={1.25} />,
        },
        {
          title: "Engineering Context",
          question: "Want analysis tied to real design decisions?",
          description:
            "Our understanding of design and manufacturing helps translate analysis results into meaningful improvements.",
          icon: <IconChartBar className="size-14" stroke={1.25} />,
        },
        {
          title: "Efficient Iteration",
          question: "Evaluating alternatives as the design evolves?",
          description:
            "Simulation can be repeated as designs evolve, allowing teams to compare alternatives and refine performance.",
          icon: <IconRefresh className="size-14" stroke={1.25} />,
        },
        {
          title: "Flexible Engagement",
          question: "Need a single study or ongoing support?",
          description:
            "We can support a single analysis task or integrate with broader product development projects.",
          icon: <IconUsers className="size-14" stroke={1.25} />,
        },
      ]}
    />
  );
}
