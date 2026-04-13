import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Engineering-First Approach",
      description:
        "We approach every project with a focus on engineering excellence, ensuring designs built on a solid technical foundation.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Designed for Real Manufacturing Conditions",
      description:
        "Our designs are optimized for manufacturing, ensuring they can be produced efficiently and cost-effectively.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Integrated Product Development",
      description:
        "Our services are structured to support the entire product lifecycle; from concept to production.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Collaborative & Transparent Workflow",
      description: "We believe in open communication and collaboration, ensuring every step of the process is transparent and clear.",
      icon: <IconCloud />,
    },
    {
      title: "Focus on Long-Term Product Success",
      description: "Our goal is not just to complete a design but to also deliver a product that performs reliably over time and can be manufactured efficiently at scale.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "Clear Project Roadmap & Milestones",
      description:
        "We provide a clear roadmap and milestones for each project, ensuring everyone is on the same page and the project stays on track.",
      icon: <IconHelp />,
    },
    {
      title: "Transparent Pricing & Budget Management",
      description:
        "We provide transparent pricing and budget management, ensuring you know exactly what you're getting and how much it will cost.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Ongoing Support & Maintenance",
      description: "We offer ongoing support and maintenance to ensure your product continues to perform reliably and efficiently over time.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto ">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature lg:border-[#ff5e19] lg:border-r",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-10 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-10 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#ff5e19] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-400 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
