import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

function How() {
  return (
    <div className='relative -translate-y-[50vh] flex flex-col mb-[-30vh]'>
        <motion.h2
          className='relative z-0 text-center text-4xl font-bold text-black py-16'
          initial={{ y: 102, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          How we can help you
        </motion.h2>
        <div className='relative z-10 flex flex-col h-full'>

                {/* card 1 */}
                <div className='relative z-10 -mt-14 w-full border-0 border-gray-300 bg-primary hover:bg-slate-500/10 flex flex-row items-center justify-center'>
                    <div className='w-1/2 py-6 pb-20 pl-24 pr-22 '>
                        <div className='pb-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ff6726" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                        </div>
                        <div className='flex flex-col'>
                                <h2 className='!font-thin'>Early-stage product development</h2>
                                <p className='!text-lg'><span className='!font-semibold'>Starting with an idea or early concept?</span><br/>We help transform initial ideas into structured product concepts by defining functionality, evaluating feasibility, and identifying the most effective design approach.</p>
                                <button className='button-primary !w-[20vw]'>Start your project ↗</button>
                        </div>

                    </div>
                    <div className='w-1/2 h-[80vh] bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/cad-early-stage-design.jpg")] bg-cover bg-center py-0'>
                    </div>
                    
                </div>

                {/* card 2 */}
                <div className='w-full  border-0 border-gray-300 bg-primary hover:bg-slate-500/10 flex flex-row items-center justify-center'>
                   
                    <div className='w-1/2 h-[80vh] bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/startup2-1.jpg")] bg-cover bg-center py-0'>
                    </div>
                    <div className='w-1/2 py-6 pb-20 pl-24 pr-22 '>
                        <div className='pb-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ff6726" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-zapier"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h6" /><path d="M21 12h-6" /><path d="M12 3v6" /><path d="M12 15v6" /><path d="M5.636 5.636l4.243 4.243" /><path d="M18.364 18.364l-4.243 -4.243" /><path d="M18.364 5.636l-4.243 4.243" /><path d="M9.879 14.121l-4.243 4.243" /></svg>
                        
                        </div>
                        <div className='flex flex-col'>
                                <h2 className='!font-thin'>Startup & Innovators</h2>
                                <p className='!text-lg'><span className='!font-semibold'>Need to turn your concept into a real design?</span><br/>Our team develops detailed CAD models, mechanical systems, and engineering solutions that bring your product to life while ensuring it performs as intended.</p>
                                <button className='button-primary !w-[20vw]'>Start your project ↗</button>
                        </div>

                    </div>
                    
                </div>

        
                
                 {/* card 3 */}
                <div className='w-full  border-0 border-gray-300 bg-primary hover:bg-slate-500/10 flex flex-row items-center justify-center'>
                    <div className='w-1/2 py-6 pb-20 pl-24 pr-22 '>
                        <div className='pb-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ff6726" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-assembly"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.875 6.27c.7 .398 1.13 1.143 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.27 2.27 0 0 1 -2.184 0l-6.75 -4.27a2.23 2.23 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98l-.033 0" /><path d="M15.5 9.422c.312 .18 .503 .515 .5 .876v3.277c0 .364 -.197 .7 -.515 .877l-3 1.922a1 1 0 0 1 -.97 0l-3 -1.922a1 1 0 0 1 -.515 -.876v-3.278c0 -.364 .197 -.7 .514 -.877l3 -1.79c.311 -.174 .69 -.174 1 0l3 1.79h-.014l0 .001" /></svg>  
                        </div>
                        <div className='flex flex-col'>
                                <h2 className='!font-thin'>Manufacturers</h2>
                                <p className='!text-lg'><span className='!font-semibold'>Preparing your product for real-world production?</span><br/>We optimize designs for manufacturing, ensuring efficiency, cost control, and smooth production with complete technical documentation.</p>
                                <button className='button-primary !w-[20vw]'>Start your project ↗</button>
                        </div>

                    </div>
                    <div className='w-1/2 h-[80vh] bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/dfm2.jpg")] bg-cover bg-center py-0'>
                    </div>
                    
                </div>


                 {/* card 4 */}
                 <div className='w-full  border-0 border-gray-300 bg-primary hover:bg-slate-500/10 flex flex-row items-center justify-center'>
                    <div className='w-1/2 h-[80vh] bg-[url("https://palevioletred-quetzal-629835.hostingersite.com/wp-content/uploads/2026/04/ecommerce-engi.jpg")] bg-cover bg-center py-0'>
                    </div>
                    
                    <div className='w-1/2 py-6 pb-20 pl-24 pr-22 '>
                        <div className='pb-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ff6726" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-ikosaedr"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 8.007v7.986a2 2 0 0 1 -1.006 1.735l-7 4.007a2 2 0 0 1 -1.988 0l-7 -4.007a2 2 0 0 1 -1.006 -1.735v-7.986a2 2 0 0 1 1.006 -1.735l7 -4.007a2 2 0 0 1 1.988 0l7 4.007a2 2 0 0 1 1.006 1.735" /><path d="M3.29 6.97l4.21 2.03" /><path d="M20.71 6.97l-4.21 2.03" /><path d="M20.7 17h-17.4" /><path d="M11.76 2.03l-4.26 6.97l-4.3 7.84" /><path d="M12.24 2.03q 2.797 4.44 4.26 6.97t 4.3 7.84" /><path d="M12 17l-4.5 -8h9l-4.5 8" /><path d="M12 17v5" /></svg>
                        </div>
                        <div className='flex flex-col'>
                                <h2 className='!font-thin'>E-commerce</h2>
                                <p className='!text-lg'><span className='!font-semibold'>Do you need to test your product before full scale production?</span><br/>We create functional prototypes and 3D models to validate designs, refine functionality, and ensure products meet your expectations before moving to mass production.</p>
                                <button className='button-primary !w-[20vw]'>Start your project ↗</button>
                        </div>

                    </div>
                    
                    
                </div>
          
            

        </div>

        
    </div>
  )
}

export default How;