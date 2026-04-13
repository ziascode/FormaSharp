import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs.jsx';
import { TextReveal } from "@/components/ui/text-reveal";


export default function Hero() {
    return (
        <div className='m-0 flex flex-col items-center justify-center relative  '>
            

            {/* Top section */}
            <div className='relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#171717] bg-center'>
                <div
                    className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                    aria-hidden
                >
                    <svg
                        className="h-full w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <pattern
                                id="heroBlueprint-grid"
                                width="40"
                                height="40"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 0 0 L 0 40"
                                    fill="none"
                                    stroke="rgb(115 115 115)"
                                    strokeOpacity={0.22}
                                    strokeWidth="0.5"
                                    vectorEffect="nonScalingStroke"
                                />
                            </pattern>
                            <pattern
                                id="heroBlueprint-waves"
                                width="200"
                                height="32"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 0 16 C 50 4 100 28 150 16 S 200 16 200 16"
                                    fill="none"
                                    stroke="rgb(115 115 115)"
                                    strokeOpacity={0.18}
                                    strokeWidth="0.45"
                                    vectorEffect="nonScalingStroke"
                                />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="#171717" />
                        <rect width="100%" height="100%" fill="url(#heroBlueprint-grid)" />
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#heroBlueprint-waves)"
                        />
                    </svg>
                </div>

                {/* Hero Title Text*/}
                <div className="relative z-10 w-[80%] py-24">
                    <h1 className='color-white!important'>ENGINEERING IDEAS <br /> INTO REAL-WORLD PRODUCTS</h1>
                    {/* <p className='w-2/3'>FromaSharp is a leading provider of engineering services, specializing in the development of innovative products and solutions. We are dedicated to helping our clients bring their ideas to life and turn them into reality.</p> */}
                    <button className='bg-[#ff5e19] text-white px-16 py-4 rounded-full'>Get Started</button>
                </div>
                
            </div>

            <div className='absolute z-10 top-60 right-0'>
                    <img  src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/hand2.png" alt="Hero Image" width={1000} height={1000} />
                </div>

            {/* Bottom section of Hero */}

            {/* Hero Scroll Video */}
            <div className='flex flex-row items-center justify-start'>
                <div className='w-[70vw] h-[120vh] -1/2 translate-y-[0vh] '>
                    <ScrollyVideo 
                    videoPercentage={0.0}
                    transitionSpeed={16}
                    frameThreshold={0.005}
                    useWebCodecs
                    full
                    src="https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/03/hero-animation.mp4" />
                </div>
                <div className="flex flex-col mb-8 md:mb-12 w-1/2 ">
                    
                   <TextReveal className='color-black!important text-left'>Magic UI will change the way you design.</TextReveal>
                </div>

            </div>
            

            
            
        </div>

    );
}

