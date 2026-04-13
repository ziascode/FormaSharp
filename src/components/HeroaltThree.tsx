

import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import { TextReveal } from "@/components/ui/text-reveal";


export default function Hero() {
    return (
        <div className='m-0 max-w-7xl mx-auto'>
            

            {/* Top section */}
            <div className='flex flex-row items-center justify-center  bg-cover bg-center '>

                {/* Hero Title Text*/}
                <div className='w-1/2 -translate-y-[200px]'>
                    <h1>Engineering Ideas into Real-World Products</h1>
                    <p>FromaSharp is a leading provider of engineering services, specializing in the development of innovative products and solutions. We are dedicated to helping our clients bring their ideas to life and turn them into reality.</p>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Get Started</button>
                </div>
                

                {/* Hero Scroll Video */}
                <div className='w-1/2 h-[130vh] -1/2 -translate-y-[70px] '>
                    <ScrollyVideo 
                    videoPercentage={0.1}
                    transitionSpeed={16}
                    frameThreshold={0.05}
                    useWebCodecs
                    full
                    src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/hero-animation.mp4" />
                </div>
            </div>

            {/* Bottom section of Hero */}

            <div className="mb-8 md:mb-12">
          <TextReveal className='color-black!important'>Magic UI will change the way you design.</TextReveal>
        </div>

            
        </div>

    );
}