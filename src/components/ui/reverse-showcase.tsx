import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReverseFeature {
  title: string;
  description: string;
}

const features: ReverseFeature[] = [
  {
    title: "Editable CAD Models",
    description:
      "We create parametric models that can be modified and reused, not just visual representations.",
  },
  {
    title: "Functional Understanding",
    description:
      "Critical interfaces, fits, and performance requirements are considered throughout reconstruction.",
  },
  {
    title: "Organized Deliverables",
    description:
      "Models, drawings, and documentation are structured for long-term use.",
  },
  {
    title: "Integrated Engineering Support",
    description:
      "Recovered models can flow directly into analysis, prototyping, and manufacturing preparation.",
  },
];

export function ReverseShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-16 bg-slate-300 rounded-xl">
      <div className="space-y-0">
        {features.map((feature, index) => {
          const isOpen = openIndex === index;
          const panelId = `reverse-feature-panel-${index}`;
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
