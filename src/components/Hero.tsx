import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import { TextReveal } from "@/components/ui/text-reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";


export default function Hero() {
    return (
        <div className='flex flex-col m-0 relative isolate overflow-hidden bg-[#111] h-[100vh] items-start justify-center
        bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/hero-vid1.mp4")] bg-cover bg-center'>
            {/* <div className="absolute inset-0 -z-10 pointer-events-none w-full gradient-bg-blue">
             
             
            </div> */}
            
            <div className='max-w-5xl  px-6 sm:px-6 md:px-[30vw] lg:px-[5vw]'>

            
            
            <div className="absolute inset-0 bg-black opacity-35"></div>

            <div className='relative z-1000 max-w-xl text-left'>
               <h1 className='text-4xl font-bold max-w-2xl'>
                Engineering Ideas into Products
               </h1>
               <p className='text-lg max-w-4xl mx-auto'>
               From early-stage concepts to production-ready designs, FormaSharp helps startups, manufacturers, and engineering teams develop products that are functional, optimized, and ready for real-world manufacturing. </p>
               <InteractiveHoverButton className='button-primary'>Explore Services</InteractiveHoverButton>
            </div>
            
           
            </div>


            

        </div>

    );
}
