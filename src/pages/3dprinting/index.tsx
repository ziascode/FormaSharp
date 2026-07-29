import Link from "next/link";
import React from "react";
import AutoplayVideo from "@/components/AutoplayVideo";
import { DotPattern } from "@/components/ui/DotPatternProps";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import { quotePageUrl } from "@/lib/quoteForm";
import ExtraBadges from "@/components/ExtraBadges";

function ThreeDPrinting() {
  return (
    <div>
      {/* HERO — dual trees: mobile-only vs exact desktop */}
      <div className="relative overflow-hidden bg-[#121926]">
        {/* Mobile hero — gradient bg; image in box under CTA */}
        <div className="relative z-10 flex min-h-[100svh] flex-col bg-[linear-gradient(to_bottom_right,#121926,#01628a)] md:hidden">
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start gap-5 px-6 pb-4 pt-36 text-left">
            <div>
              <h4 className="!mb-0 !text-[0.6875rem] !font-medium !uppercase !tracking-[0.14em] !text-white/90">
                PROTOTYPING &{" "}
                <span className="text-[#ff6726]">3D PRINTING</span>
              </h4>
              <h1 className="max-w-[85vw] !text-[2rem] !leading-[1.1] font-bold text-white pt-4">
                Rapid Prototyping &{" "}
                <span className="text-[#ff6726]">3D Printing</span>
              </h1>
              <h3 className="max-w-2xl !text-[1.125rem] text-white/80">
                Test, Validate, and Refine Your Product Before Manufacturing. We turn digital designs into tangible prototypes that reveal what drawings alone can’t.
              </h3>
              <div className="mt-6 flex w-full flex-col items-stretch gap-3">
                <Link
                  href={quotePageUrl("prototyping")}
                  className="button-primary inline-block w-full text-center"
                >
                  Request a Quote
                </Link>
              </div>
              <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#121926] shadow-lg">
                <AutoplayVideo
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
                  src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing.mp4"
                  loop
                  preload="metadata"
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-auto shrink-0 p-0">
            <ExtraBadges className="[&>div]:!mt-0" />
          </div>
        </div>

        {/* Desktop hero — exact current markup */}
        <DotPattern className="hidden min-h-[100vh] bg-black/95 md:block">
          <div className=" mx-auto flex flex-row items-center justify-center max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
            <div>
                <h1 className="max-w-3xl !text-6xl !leading-none font-bold text-white pt-5">
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
      </div>

      {/* intro section */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4 md:py-32">
       <div className="text-black/90 flex flex-col justify-center text-center">
        <h2 className=" max-w-2xl mx-auto max-md:!text-[1.875rem] max-md:!leading-[1.15]">CAD files to physical<span className="text-[#ff6726]"> prototypes</span></h2>
        <h3 className="!text-4xl !font-bold max-md:!text-[1.5rem] max-md:!leading-[1.2]">Bring Your Design Off the Screen and Into Your Hands</h3>
        <p className=" max-w-6xl mx-auto max-md:!text-[1.125rem]">FormaSharp provides prototyping and 3D printing services that help startups, manufacturers,
and engineering teams evaluate designs before investing in tooling or full-scale production.
From simple concept models to working prototypes, we create physical parts that reveal what
drawings alone cannot.
By turning digital designs into tangible models, you can confirm usability, check component fit,
assess assembly, and make informed decisions with greater certainty.</p>
        <Link href={quotePageUrl("prototyping")} className="button-tertiary mx-auto inline-block">Request a Quote →</Link>
       </div>
      </div>

      {/* Feature image — mobile only (hero image moved down); desktop video exact */}
      <div className="relative z-20 mx-auto mt-[10%] mb-20 max-w-7xl px-6 md:hidden">
        <img
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/vectzy1-1.png"
          alt=""
          className="mx-auto block h-auto w-full object-contain"
        />
      </div>
      <div className="relative z-20 hidden h-[70vh] items-center justify-center max-w-7xl mx-auto md:flex">
        <div className="w-[80vw] h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
        <AutoplayVideo
          className="h-full w-full rounded-2xl object-cover"
          src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing.mp4"
          loop
          controls
          preload="metadata"
        />
        </div>
      </div>

      {/* How it works — mobile stacked; desktop exact */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-primary px-6 py-24 md:hidden">
        <h3 className="!text-[0.6875rem] !font-semibold !uppercase !tracking-[0.2em] !text-[#ff6726]">
          How it works
        </h3>
        <hr className="mb-8 mt-3 w-1/2 border-white/50" />
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 text-center">
          <div>
            <h3 className="!text-[1.875rem] !font-extrabold !leading-[1.15] text-white">
              1. Upload your CAD files
            </h3>
            <p className="!text-[1.125rem] !font-light !text-white">
              Send your STL, STEP, or CAD file. We accept all major formats and
              provide a free DFP (Design for Printability) review with every
              order.
            </p>
          </div>
          <div>
            <h3 className="!text-[1.875rem] !font-extrabold !leading-[1.15] text-white">
              2. Get Your Quote
            </h3>
            <p className="!text-[1.125rem] !font-light !text-white">
              Receive a transparent quote within 48 hour with material options,
              lead times, and finish levels clearly outlined.
            </p>
          </div>
          <div>
            <h3 className="!text-[1.875rem] !font-extrabold !leading-[1.15] text-white">
              3. Print Your Prototype
            </h3>
            <p className="!text-[1.125rem] !font-light !text-white">
              We print your prototype using high-resolution, engineering-grade
              materials, precisely, repeatably, and on your timeline.
            </p>
          </div>
        </div>
        <Link
          href="/contact"
          className="button-secondary mt-10 inline-block w-full max-w-sm text-center"
        >
          Upload a file
        </Link>
      </div>

      <div className="vh-100 relative z-10 -mb-[35vh] px-6 pt-[35vh] pb-24 md:pb-32 bg-primary hidden flex-col items-center justify-center -translate-y-[35vh] md:flex">
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
          <h1 className="!text-6xl !leading-none font-bold text-white max-md:!text-[2rem] max-md:!leading-[1.1]">
            Move from CAD files to{" "}
            <span className="italic text-[#ff6726]">test-ready prototypes</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed !text-white max-md:!text-[1.125rem] md:text-lg">
            Share your STL, STEP, or CAD geometry and tell us what you need to
            prove. FormaSharp can help you print functional parts, refine
            tolerances, and validate designs before you invest in tooling or
            production runs.
          </p>
          <div className="mt-10 flex flex-col flex-wrap items-center justify-center gap-4 max-md:w-full max-md:items-stretch max-md:gap-3 sm:flex-row">
            <Link
              href={quotePageUrl("prototyping")}
              className="button-primary inline-block max-md:w-full max-md:text-center"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="button-secondary inline-block max-md:w-full max-md:text-center"
            >
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
