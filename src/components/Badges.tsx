import React from 'react';
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import { TextReveal } from "@/components/ui/text-reveal";
import ImageMasking1 from "@/components/ui/image-masking-1";
import { section } from "@/lib/sectionSpacing";

function Badges() {
  return (
    <div className='bg-white -mb-[20vh]'>
    <div className={`bottom-section ${section.container} py-16 md:py-20`}>

              {/* Top section */}
            <div className='flex flex-row items-center justify-center bg-cover bg-center py-24'>

                {/* Hero Title Text*/}
                <div className='w-1/2 -translate-y-[200px]'>
                    <TextReveal className='color-black!important'>We are an engineering partner focused on developing products that can actually be built.</TextReveal>
                    {/* <TextReveal className='color-black!important'>Every project is approached with a focus on performance, manufacturability, and long-term reliability.</TextReveal> */}
                    <ImageMasking1 imageSrc="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/07/3dproduct-opt.jpg" alt="3D printed product" />
                
                </div>
                

                {/* Hero Scroll Video */}
                <div className='w-1/2 h-[130vh]  -translate-y-[150px] '>
                    <ScrollyVideo 
                    videoPercentage={0}
                    transitionSpeed={16}
                    frameThreshold={0.05}
                    useWebCodecs
                    full
                    src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/hero-animation.mov" />
                </div>
            </div>

            
        </div>
        </div>
  )
}

export default Badges