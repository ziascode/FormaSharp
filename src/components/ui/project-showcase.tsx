import {
  IconLayersIntersect,
  IconPrinter,
  IconRefresh,
  IconRulerMeasure,
} from "@tabler/icons-react";
import { ServiceHelpShowcase } from "@/components/ui/service-help-showcase";

export function ProjectShowcase() {
  return (
    <ServiceHelpShowcase
      heading={
        <>
          Prototyping built for{" "}
          <span className="text-[#ff6726]">real decisions</span>
        </>
      }
      paragraphs={[
        "FormaSharp provides professional prototyping and 3D printing services that help startups, manufacturers, and engineering teams evaluate product designs in real-world conditions before committing to production.",
        "From early-stage concept models to functional prototypes, we enable you to identify design flaws, improve performance, and make informed decisions, reducing costly revisions and delays later in the development process. Whether you need a simple concept model or a functional prototype, our team ensures that each version provides meaningful insight that moves your project forward.",
      ]}
      ctaLabel="Start your prototype project ↗"
      cards={[
        {
          title: "Rapid 3D Printing",
          question: "Need to move from digital model to physical fast?",
          description:
            "We use advanced 3D printing methods to quickly produce physical representations of your design. This allows you to move from digital model to physical prototype in a short timeframe, accelerating development and enabling faster decision-making.",
          icon: <IconPrinter className="size-14" stroke={1.25} />,
        },
        {
          title: "Functional Prototypes",
          question: "Validating performance before production?",
          description:
            "For products that require performance validation, we develop functional prototypes that simulate real-world use. These prototypes allow you to test mechanical systems, moving components, and structural integrity before committing to production tooling or manufacturing.",
          icon: <IconLayersIntersect className="size-14" stroke={1.25} />,
        },
        {
          title: "Form & Fit Evaluation",
          question: "Checking how parts come together?",
          description:
            "Understanding how parts fit together is critical in product development. Prototypes allow you to verify dimensions, tolerances, and assembly processes. This step helps identify alignment issues and ensures that components integrate properly within the overall design.",
          icon: <IconRulerMeasure className="size-14" stroke={1.25} />,
        },
        {
          title: "Design Iteration & Refinement",
          question: "Improving the design with each build?",
          description:
            "Prototyping is most effective when used as part of an iterative process. After evaluating each prototype, we refine the design and produce improved versions. This cycle continues until the product meets performance, usability, and manufacturing requirements.",
          icon: <IconRefresh className="size-14" stroke={1.25} />,
        },
      ]}
    />
  );
}
