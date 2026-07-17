import Link from "next/link";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { section } from "@/lib/sectionSpacing";

function FinalCta() {
  return (
    <DotPattern className="bg-black/95">
      <div
        id="cta"
        className={`${section.container} flex max-w-4xl flex-col items-center justify-center py-24 text-center md:py-32`}
      >
        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726] md:mb-6">
          Get Started
        </div>
        <h1 className="!mb-6 !text-4xl !leading-[1.05] font-bold text-white md:!mb-8 md:!text-6xl md:!leading-none">
          Turn your ideas into products that can actually be{" "}
          <span className="italic text-[#ff6726]">built</span>
        </h1>
        <p className="mb-0 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Whether you are starting with a concept, refining a prototype, or
          preparing for production, FormaSharp can help move your project
          forward. Share a few details about your product and our team will be
          in touch shortly.
        </p>
        <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="button-primary inline-block">
            Start Your Project
          </Link>
          <Link href="/contact" className="button-secondary inline-block">
            Request a Consultation
          </Link>
        </div>
        <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
          Product Design · CAD · Prototyping · Simulation · Reverse Engineering
          · DFM
        </div>
      </div>
    </DotPattern>
  );
}

export default FinalCta;
