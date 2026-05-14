import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { ProjectShowcase } from "@/components/ui/project-showcase";
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
            <InteractiveHoverButton className="button-primary">
                Book a Consultation
            </InteractiveHoverButton>
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
        <button className="button-tertiary mx-auto">Book a Consultation →</button>
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

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8 py-12 -translate-y-[10vh]">
        <h2 className="w-[40%] text-4xl font-bold text-black">FormaSharp Prototyping</h2>
        
        <p className="w-[60%] text-lg text-black">FormaSharp provides professional prototyping and 3D printing services that help startups, manufacturers, and engineering teams evaluate product designs in real-world conditions before committing to production. <br/> From early-stage concept models to functional prototypes, we enable you to identify design flaws, improve performance, and make informed decisions; reducing costly revisions and delays later in the development process.
</p>
    </div>

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8">
        <ImageMasking1  imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/05/3d5-1.jpg" className="w-[90%]"/>
        {/* <div className="w-[40%]">
            <h2 className=" text-black">Prototyping is more than just creating a physical model; it is a structured process used to evaluate, improve, and finalize product designs.</h2>
        </div>
         */}
    </div>

    <div className="max-w-7xl mx-auto py-40 px-6 gap-4 flex flex-col items-start justify-start ">
        <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8 py-12">
            <h2 className=" font-bold text-black w-[40%]">What We Deliver</h2>
            <p className="text-lg text-black w-[60%]">Our prototyping and 3D printing services are designed to help you bring your product to life. We offer a wide range of services to help you with your product development process. Whether you need a simple concept model or a functional prototype, our team ensures that each version provides meaningful insight that moves your project forward.</p>
        </div>
        
        <ProjectShowcase />
    </div>


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
          <InteractiveHoverButton className="button-primary">
            Book a Consultation
          </InteractiveHoverButton>
          <button type="button" className="button-secondary">
            Upload a File
          </button>
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
