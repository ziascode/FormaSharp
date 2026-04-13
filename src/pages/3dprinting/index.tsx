import React from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { DotPattern } from "@/components/ui/DotPatternProps";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { ProjectShowcase } from "@/components/ui/project-showcase";
import CTA from "@/components/ui/cta";

function ThreeDPrinting() {
  return (
    <div>

    <DotPattern className="min-h-[140vh] bg-black/95">
      <div className=" mx-auto flex flex-row items-center justify-center max-w-7xl flex-col gap-6 px-4 py-12 md:py-16 lg:py-24">
        <div>
            <h1 className="max-w-3xl text-4xl font-bold text-white">
            Prototyping & <br /> 3D Printing Services
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
    </DotPattern>

    <div className="h-[50vh] bg-white flex items-center justify-center max-w-7xl mx-auto">
        <div className="w-[80vw] h-[70vh] rounded-2xl rounded-b-2xl overflow-hidden -translate-y-[30vh]">
        <img className="rounded-2xl" src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/3d-printing.mp4" alt="" />
     
        </div>
    </div>

    {/* <hr style={{ border: 'none', borderTop: '1px solid rgb(28, 27, 27)', margin: '20px 0' }} /> */}

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8 py-12 -translate-y-[10vh]">
        <h2 className="w-[40%] text-4xl font-bold text-black">FormaSharp Prototyping</h2>
        <p className="w-[60%] text-lg text-black">FormaSharp provides professional prototyping and 3D printing services that help startups, manufacturers, and engineering teams evaluate product designs in real-world conditions before committing to production. <br/> From early-stage concept models to functional prototypes, we enable you to identify design flaws, improve performance, and make informed decisions; reducing costly revisions and delays later in the development process.
</p>
    </div>

    <div className="max-w-7xl mx-auto px-6 flex flex-row items-start justify-around gap-8">
        <ImageMasking1  imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/clouds.jpg" className="w-[90%]"/>
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


    </div>


  );
}

export default ThreeDPrinting;
