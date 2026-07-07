import Link from "next/link";
import React from "react";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { quotePageUrl } from "@/lib/quoteForm";
import ExtraBadges from "@/components/ExtraBadges";

function ThreeDPrinting() {
  return (
    <div>

    <DotPattern className="min-h-[100vh] bg-black/95">
      <div className=" mx-auto flex flex-row items-center justify-center max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
        <div>
            <h1 className="max-w-3xl text-4xl font-bold text-white uppercase">
            RAPID PROTOTYPING & <span className="text-[#ff6726]">3D PRINTING</span>
            </h1>
            <h3 className="max-w-2xl text-lg text-white/80">
            Test, Validate, and Refine Your Product Before Manufacturing
            </h3>
            <div>
            <Link href={quotePageUrl("prototyping")} className="button-primary inline-block">
                Request a Quote
            </Link>
            </div>
        </div>
        
        <div className="">
            <img src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/vectzy1-1.png" alt="" />
        </div>
      </div>
      <div className="py-8">
        <ExtraBadges />
      </div>
    </DotPattern>

    {/* intro section */}
    <div className="max-w-7xl mx-auto px-6 py-26 ">
       <div className="text-black/90 flex flex-col justify-center text-center">
        <h2 className=" max-w-2xl mx-auto">CAD files to physical<span className="text-[#ff6726]"> prototypes</span></h2>
        <h3 className="!text-4xl !font-bold">Bring Your Design Off the Screen and Into Your Hands</h3>
        <p className=" max-w-6xl mx-auto">FormaSharp provides prototyping and 3D printing services that help startups, manufacturers,
and engineering teams evaluate designs before investing in tooling or full-scale production.
From simple concept models to working prototypes, we create physical parts that reveal what
drawings alone cannot.
By turning digital designs into tangible models, you can confirm usability, check component fit,
assess assembly, and make informed decisions with greater certainty.</p>
        <Link href={quotePageUrl("prototyping")} className="button-tertiary mx-auto inline-block">Request a Quote →</Link>
       </div>
    </div>

    <div className="relative z-20 h-[70vh] flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-[80vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
        <video
          className="h-full w-full rounded-2xl object-cover"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing.mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
        </div>
    </div>

    <div className="vh-100 relative z-10 px-6 pt-[35vh] pb-28 bg-primary flex flex-col items-center justify-center -translate-y-[35vh] ">
      <h3 className="pt-26">How it works</h3>
      <hr className="w-1/2 border-white/50 pb-12 -translate-y-[1vh] border-top-[#ff6726]" /> 
      <div className="max-w-7xl mx-auto flex flex-row items-center text-center justify-center gap-12 ">
        
        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">1. Upload your CAD files</h3>
          <p className="!text-[1em] !text-white !font-light">Send your STL, STEP, or CAD file. We accept all major formats and provide a free DFP (Design for Printability) review with every order.</p>
        </div>

        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">2. Get Your Quote</h3>
          <p className="!text-[1em] !text-white !font-light">Receive a transparent quote within 48 hour withm material options, lead times, and finish levels clearly outlined.</p>
        </div>

        <div className="w-[30%]">
          <h3 className=" !font-extrabold text-white">3. Print Your Prototype</h3>
          <p className="!text-[1em] !text-white !font-light">We print your prototype using high-resolution, engineering-grade materials, precisely, repeatably, and on your timeline.</p>
        </div>

      </div>
      <button className="button-secondary mt-10 mx-auto !px-18 text-center">Upload a file 
      </button>

    </div>

    {/* <hr style={{ border: 'none', borderTop: '1px solid rgb(28, 27, 27)', margin: '20px 0' }} /> */}

    <ProjectShowcase />

    <DotPattern className="bg-black/95">
      <div
        id="cta"
        className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
      >
        <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6726]">
          Get Started
        </div>
        <h1 className="!text-6xl !leading-none font-bold text-white">
          Move from CAD files to{" "}
          <span className="italic text-[#ff6726]">test-ready prototypes</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white md:text-lg">
          Share your STL, STEP, or CAD geometry and tell us what you need to
          prove. FormaSharp can help you print functional parts, refine
          tolerances, and validate designs before you invest in tooling or
          production runs.
        </p>
        <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
          <Link href={quotePageUrl("prototyping")} className="button-primary inline-block">
            Request a Quote
          </Link>
          <Link href="/contact" className="button-secondary inline-block">
            Upload a File
          </Link>
        </div>
        <div className="mt-10 font-mono text-xs tracking-wider text-white/40">
          Prototyping · High-resolution prints · Engineering materials · DFM
          review · Functional validation · Repeatable builds
        </div>
      </div>
    </DotPattern>




    </div>


  );
}

export default ThreeDPrinting;
