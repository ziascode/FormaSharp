import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DfmFeature {
  title: string;
  description: string;
}

const features: DfmFeature[] = [
  {
    title: "Balanced Decision-Making",
    description:
      "We look for opportunities to simplify production while preserving performance and usability.",
  },
  {
    title: "Process-Aware Reviews",
    description:
      "Recommendations are tailored to the specific manufacturing method and expected production volumes.",
  },
  {
    title: "Clear Implementation",
    description:
      "Approved changes are incorporated directly into CAD models and drawings.",
  },
  {
    title: "Scalable Support",
    description:
      "We can review individual components or support broader product development programs.",
  },
];

export function DfmShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 bg-slate-300 rounded-xl">
      <div className="space-y-0">
        {features.map((feature, index) => {
          const isOpen = openIndex === index;
          const panelId = `dfm-feature-panel-${index}`;
          return (
            <button
              key={feature.title}
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6726] rounded-md"
            >
              <div className="relative border-t border-border py-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-medium tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden
                  />
                </div>
                <div
                  id={panelId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-black/70 text-sm mt-1 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="border-t border-border" />
      </div>
    </section>
  );
}
